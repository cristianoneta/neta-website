/* Read a single validated server generation; retain the dated static fallback. */
(() => {
  const origin = 'https://data.cosmoot.com/data/neta-website/';
  const paths = new Set([
    'metadata.json', 'address_index.json', 'data/map/state.json', 'data/map/map-of-neta.json',
    'data/recovery/recovery-stats.json', 'data/recovery/recovery-events.json',
    'data/recovery/wynd-market.json', 'data/recovery/wynd-leaderboard.json'
  ]);
  let manifestPromise, rankingPromise;
  function savedNotice() {
    if (typeof document === 'undefined' || document.getElementById('neta-data-notice')) return;
    const notice = document.createElement('p');
    notice.id = 'neta-data-notice'; notice.className = 'data-notice'; notice.setAttribute('role', 'status');
    notice.textContent = 'Live data is unavailable. Showing the last saved update and its original date.';
    document.querySelector('header')?.after(notice);
  }
  function rememberServer() { try { sessionStorage.setItem('neta.public-data.active', '1'); } catch {} }
  function previouslyActive() { try { return sessionStorage.getItem('neta.public-data.active') === '1'; } catch { return false; } }
  async function request(url, timeout = 12000) {
    return fetch(url, {cache: 'no-store', credentials: 'omit', redirect: 'error',
      headers: {Accept: 'application/json'}, signal: AbortSignal.timeout(timeout)});
  }
  async function manifest() {
    if (!manifestPromise) manifestPromise = (async () => {
      try {
        const response = await request(origin + 'current/manifest.json', 3500);
        if (!response.ok) { if (response.status !== 404 || previouslyActive()) savedNotice(); return null; }
        const raw = await response.text();
        if (raw.length > 16000) { savedNotice(); return null; }
        const value = JSON.parse(raw);
        if (value.schema_version !== 1 || !/^generation-[a-f0-9]{64}$/.test(value.generation) ||
            !/^[a-f0-9]{40}$/.test(value.source_revision) || !Number.isFinite(Date.parse(value.published_at)) ||
            Date.parse(value.published_at) > Date.now() + 60000 ||
            !value.files || Object.keys(value.files).length !== paths.size ||
            [...paths].some(path => !/^[a-f0-9]{64}$/.test(value.files[path]))) { savedNotice(); return null; }
        rememberServer();
        return value;
      } catch { if (previouslyActive()) savedNotice(); return null; }
    })();
    return manifestPromise;
  }
  async function serverResponse(path, value) {
    const response = await request(origin + value.generation + '/' + path);
    if (!response.ok) throw new Error('Published observation unavailable');
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > 25 * 1024 * 1024) throw new Error('Oversized observation');
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)),
      byte => byte.toString(16).padStart(2, '0')).join('');
    if (digest !== value.files[path]) throw new Error('Published observation changed');
    return new Response(bytes, {headers: {'Content-Type': 'application/json'}});
  }
  async function fetchGroup(names) {
    if (!Array.isArray(names) || names.some(path => !paths.has(path))) throw new Error('Unknown observation');
    const value = await manifest();
    if (value) {
      try { return await Promise.all(names.map(path => serverResponse(path, value))); }
      catch { savedNotice(); /* Keep related files together on the saved generation. */ }
    }
    return Promise.all(names.map(path => request(path)));
  }
  async function rankingReady() {
    if (!rankingPromise) rankingPromise = (async () => {
      const value = await manifest();
      if (!value && window.NETA_METADATA && window.NETA_ADDRESS_INDEX) return window.NETA_ADDRESS_INDEX;
      try {
        const responses = await fetchGroup(['metadata.json', 'address_index.json']);
        if (responses.some(response => !response.ok)) throw new Error('Ranking unavailable');
        const [metadata, compact] = await Promise.all(responses.map(response => response.json()));
        if (metadata.validation?.passed !== true || compact.schema_version !== 4 ||
            !Array.isArray(compact.fields) || !Array.isArray(compact.rows) ||
            !compact.fields.includes('juno_address') || !compact.fields.includes('rank') ||
            new Set(compact.fields).size !== compact.fields.length ||
            compact.rows.some(row => !Array.isArray(row) || row.length !== compact.fields.length)) {
          throw new Error('Invalid ranking observation');
        }
        const rows = compact.rows.map(values => Object.fromEntries(compact.fields.map((key, index) => [key, values[index]])));
        const index = Object.create(null);
        for (const row of rows) for (const address of [row.juno_address, row.osmosis_address]) {
          if (typeof address === 'string' && address) index[address] = row;
        }
        window.NETA_METADATA = metadata;
        window.NETA_ADDRESS_ROWS = rows;
        window.NETA_TOP_HOLDERS = rows.slice(0, 100);
        window.NETA_ADDRESS_INDEX = index;
        return index;
      } catch (error) {
        if (window.NETA_METADATA && window.NETA_ADDRESS_INDEX) return window.NETA_ADDRESS_INDEX;
        throw error;
      }
    })();
    return rankingPromise;
  }
  window.NETAPublicData = Object.freeze({fetchGroup, rankingReady,
    fetch: async path => (await fetchGroup([path]))[0]});
})();
