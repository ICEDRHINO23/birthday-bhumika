document.addEventListener("DOMContentLoaded", () => {

// ======================
// SAFE GET FUNCTION
// ======================
function get(id){
  return document.getElementById(id);
}

const intro = get("intro");
const gift = get("gift");
const menu = get("menu");
const timerPage = get("timerPage");
const videoPage = get("videoPage");
const funText = get("funText");
const bigTimer = get("bigTimer");
const stars = get("stars");
const cursor = get("cursorGlow");

// ======================
// INTRO FIX
// ======================
setTimeout(() => {
  if(intro) intro.style.display = "none";
}, 3000);

// ======================
// GIFT MOVE
// ======================
let unlocked = false;

function moveGift(){
  if(!gift || unlocked) return;

  let x = Math.random() * (window.innerWidth - 150);
  let y = Math.random() * (window.innerHeight - 150);

  gift.style.left = x + "px";
  gift.style.top = y + "px";
}

gift?.addEventListener("mouseover", moveGift);

setTimeout(()=>{
  unlocked = true;
  if(funText) funText.innerText = "Click me 🎁";
}, 8000);

// ======================
// GIFT CLICK
// ======================
gift?.addEventListener("click", () => {

  if(!unlocked) return;

  gift.style.display = "none";
  if(menu) menu.style.display = "block";

});

// ======================
// LOCK SYSTEM
// ======================
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked(){
  return Date.now() >= unlockDate;
}

// ======================
// NAVIGATION
// ======================
window.openPage = function(type){

  if(menu) menu.style.display = "none";
  if(timerPage) timerPage.style.display = "none";
  if(videoPage) videoPage.style.display = "none";

  if(type === "video" && !isUnlocked()){
    if(funText) funText.innerText = "🔒 Locked until May 12 🎂";
    if(menu) menu.style.display = "block";
    return;
  }

  if(type === "timer" && timerPage) timerPage.style.display = "block";
  if(type === "video" && videoPage) videoPage.style.display = "block";
}

// ======================
// BACK BUTTON
// ======================
window.goBack = function(){
  if(timerPage) timerPage.style.display = "none";
  if(videoPage) videoPage.style.display = "none";
  if(menu) menu.style.display = "block";
}

// ======================
// TIMER
// ======================
setInterval(()=>{
  if(!bigTimer) return;

  let gap = unlockDate - Date.now();

  let d = Math.floor(gap/(1000*60*60*24));
  let h = Math.floor((gap/(1000*60*60))%24);
  let m = Math.floor((gap/(1000*60))%60);
  let s = Math.floor((gap/1000)%60);

  bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

},1000);

// ======================
// STARS (SAFE)
// ======================
if(stars){
  const ctx = stars.getContext("2d");
  stars.width = window.innerWidth;
  stars.height = window.innerHeight;

  let arr = Array.from({length:80},()=>({
    x:Math.random()*stars.width,
    y:Math.random()*stars.height,
    s:Math.random()*2
  }));

  function draw(){
    ctx.clearRect(0,0,stars.width,stars.height);
    arr.forEach(p=>{
      ctx.fillStyle="white";
      ctx.fillRect(p.x,p.y,p.s,p.s);
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ======================
// CURSOR GLOW (SAFE)
// ======================
document.addEventListener("mousemove",(e)=>{
  if(cursor){
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

});
