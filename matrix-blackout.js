(()=>{"use strict";
const START_INTERVAL=60000,RAIN_DURATION=4000,BLACKOUT_DURATION=2000,RETRY_DELAY=5000;
const ENABLED_KEY="neta-matrix-effect-enabled",LAST_RUN_KEY="neta-matrix-effect-last-run";
const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduced)return;
let enabled=true,paused=false,running=false,timer=0,frame=0,rainTimer=0,blackoutTimer=0;
try{enabled=localStorage.getItem(ENABLED_KEY)!=="false"}catch(_){}
const canvas=document.createElement("canvas");canvas.id="neta-matrix-rain";canvas.setAttribute("aria-hidden","true");
const blackout=document.createElement("div");blackout.id="neta-signal-blackout";blackout.setAttribute("aria-hidden","true");
const toggle=document.createElement("button");toggle.id="neta-effect-toggle";toggle.type="button";toggle.setAttribute("aria-pressed",String(enabled));
const label=()=>{toggle.textContent=enabled?"MATRIX EFFECT: ON":"MATRIX EFFECT: OFF"};label();
document.body.append(canvas,blackout,toggle);
const ctx=canvas.getContext("2d",{alpha:true});
function resize(){const d=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.floor(innerWidth*d));canvas.height=Math.max(1,Math.floor(innerHeight*d));canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(d,0,0,d,0,0)}
function blocked(){return paused||document.hidden||Boolean(document.querySelector("dialog[open],[aria-modal='true']"))||document.body.classList.contains("modal-open")}
function lastRun(){try{return Number(localStorage.getItem(LAST_RUN_KEY)||0)}catch(_){return 0}}
function stamp(){try{localStorage.setItem(LAST_RUN_KEY,String(Date.now()))}catch(_){}}
function schedule(delay){clearTimeout(timer);if(!enabled)return;const remaining=Math.max(0,START_INTERVAL-(Date.now()-lastRun()));timer=setTimeout(run,Math.max(delay||0,remaining))}
function cleanup(){cancelAnimationFrame(frame);clearTimeout(rainTimer);clearTimeout(blackoutTimer);document.body.classList.remove("neta-matrix-active","neta-blackout-active");ctx.clearRect(0,0,innerWidth,innerHeight);running=false;if(!paused)schedule()}
function run(){
 if(!enabled||running)return;
 if(blocked()){schedule(RETRY_DELAY);return}
 running=true;stamp();resize();document.body.classList.add("neta-matrix-active");
 const font=11,cols=Math.ceil(innerWidth/font),drops=Array.from({length:cols},()=>Math.random()*-55),speeds=Array.from({length:cols},()=>.55+Math.random()*1.25),glyphs="01011010NETAREBORNJUNOATOMOSMOWYND",start=performance.now();
 function draw(now){ctx.fillStyle="rgba(0,5,1,.105)";ctx.fillRect(0,0,innerWidth,innerHeight);ctx.font=font+'px "Courier New"';for(let i=0;i<cols;i++){const x=i*font,y=drops[i]*font;ctx.fillStyle=Math.random()>.91?"#c8ffda":"#79ffad";ctx.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],x,y);ctx.globalAlpha=.58;ctx.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],x,y-font);ctx.globalAlpha=1;if(y>innerHeight&&Math.random()>.94)drops[i]=Math.random()*-35;drops[i]+=speeds[i]}if(now-start<RAIN_DURATION)frame=requestAnimationFrame(draw)}
 frame=requestAnimationFrame(draw);
 rainTimer=setTimeout(()=>{cancelAnimationFrame(frame);document.body.classList.remove("neta-matrix-active");if(blocked()){cleanup();return}document.body.classList.add("neta-blackout-active");blackoutTimer=setTimeout(cleanup,BLACKOUT_DURATION)},RAIN_DURATION)
}
toggle.addEventListener("click",()=>{enabled=!enabled;toggle.setAttribute("aria-pressed",String(enabled));label();try{localStorage.setItem(ENABLED_KEY,String(enabled))}catch(_){}if(!enabled){clearTimeout(timer);if(running)cleanup()}else schedule(1000)});
addEventListener("resize",resize,{passive:true});document.addEventListener("visibilitychange",()=>{if(!document.hidden)schedule(RETRY_DELAY)});
addEventListener("neta:blackout-pause",()=>{paused=true;if(running)cleanup();else clearTimeout(timer)});
addEventListener("neta:blackout-resume",()=>{paused=false;schedule(RETRY_DELAY)});
resize();schedule(START_INTERVAL);
})();