const c=document.querySelector("#matrix"),x=c.getContext("2d");let cols,drops;
function resize(){c.width=innerWidth;c.height=innerHeight;cols=Math.floor(c.width/18);drops=Array(cols).fill(1)}
resize();addEventListener("resize",resize);
setInterval(()=>{x.fillStyle="rgba(1,6,4,.075)";x.fillRect(0,0,c.width,c.height);x.fillStyle="#00ff78";x.font="13px monospace";
drops.forEach((y,i)=>{let t=Math.random()>.5?"1":"0";x.fillText(t,i*18,y*18);if(y*18>c.height&&Math.random()>.975)drops[i]=0;drops[i]++})},70);