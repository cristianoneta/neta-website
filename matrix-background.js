(() => {
  const canvas = document.querySelector("#matrix");
  if (!canvas || canvas.dataset.matrixReady === "true") return;

  const context = canvas.getContext("2d");
  if (!context) return;

  canvas.dataset.matrixReady = "true";
  const cellSize = 18;
  let drops = [];
  let timer;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array(Math.floor(canvas.width / cellSize)).fill(1);
  }

  function draw() {
    context.fillStyle = "rgba(1, 6, 4, .075)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#00ff78";
    context.font = "13px monospace";
    drops.forEach((row, column) => {
      context.fillText(Math.random() > 0.5 ? "1" : "0", column * cellSize, row * cellSize);
      if (row * cellSize > canvas.height && Math.random() > 0.975) drops[column] = 0;
      drops[column] += 1;
    });
  }

  function start() {
    if (!timer) timer = window.setInterval(draw, 70);
  }

  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
})();

