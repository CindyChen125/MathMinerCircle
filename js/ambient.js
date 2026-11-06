// Compositor-only ambient motion. Pointer interpolation runs only while settling.
export function initAmbient() {
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer: fine)');
  const layer=document.querySelector('.page-grid');
  const spotlight=document.createElement('div');
  spotlight.className='pointer-spotlight';
  spotlight.setAttribute('aria-hidden','true');
  layer?.append(spotlight);
  const button=document.createElement('button');
  button.className='motion-toggle'; button.type='button';
  let paused=false;
  try { paused=sessionStorage.getItem('pi-finder.motion-paused')==='true'; } catch { /* Defaults still work without storage. */ }
  let frame=0,x=innerWidth/2,y=innerHeight/2,targetX=x,targetY=y;
  function sync() {
    const off=paused||reduced.matches;
    root.dataset.motion=off?'paused':'active';
    button.textContent=off?'Resume motion':'Pause motion';
    button.setAttribute('aria-pressed',String(!off));
    button.disabled=reduced.matches;
    button.title=reduced.matches?'Motion disabled by your device preference':'Toggle background and scanning effects';
    if(off){layer?.querySelectorAll('.pointer-ripple').forEach(r=>r.remove());cancelAnimationFrame(frame);frame=0;root.style.setProperty('--pointer-x','0px');root.style.setProperty('--pointer-y','0px');}
  }
  function tick() {
    x+=(targetX-x)*.065;y+=(targetY-y)*.065;
    spotlight.style.transform=`translate3d(${x-260}px,${y-260}px,0)`;
    root.style.setProperty('--pointer-x',`${((x/innerWidth-.5)*140).toFixed(2)}px`);
    root.style.setProperty('--pointer-y',`${((y/innerHeight-.5)*100).toFixed(2)}px`);
    if(Math.abs(targetX-x)+Math.abs(targetY-y)>.15)frame=requestAnimationFrame(tick);else frame=0;
  }
  function aim(tx,ty,touch=false){if(paused||reduced.matches||(!fine.matches&&!touch))return;targetX=tx;targetY=ty;if(!frame)frame=requestAnimationFrame(tick);}
  window.addEventListener('pointermove',event=>aim(event.clientX,event.clientY),{passive:true});
  document.addEventListener('pointerleave',()=>aim(innerWidth/2,innerHeight/2));
  window.addEventListener('pointerdown',event=>{
    if(paused||reduced.matches||!layer||event.target.closest('.motion-toggle'))return;
    aim(event.clientX,event.clientY,true);
  },{passive:true});
  window.addEventListener('resize',()=>aim(innerWidth/2,innerHeight/2,true),{passive:true});
  button.onclick=()=>{paused=!paused;try { sessionStorage.setItem('pi-finder.motion-paused',String(paused)); } catch { /* Motion controls still work. */ } sync();};
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',()=>{root.classList.toggle('motion-suspended',document.hidden);if(document.hidden){cancelAnimationFrame(frame);frame=0;}});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});
  document.body.append(button);sync();
  if(!paused&&!reduced.matches)tick();
}
