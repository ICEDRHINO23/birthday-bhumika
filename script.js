document.addEventListener("mousemove", (e) => {

  let x = (window.innerWidth / 2 - e.clientX) / 25;
  let y = (window.innerHeight / 2 - e.clientY) / 25;

  document.querySelectorAll("#menu, #timerPage, #videoPage").forEach(el => {
    el.style.transform =
      `translate(-50%, -50%) perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  });// ELEMENTS
const gift = document.getElementById("gift");
const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");
const funText = document.getElementById("funText");

const countdown = document.getElementById("countdown");
const bigTimer = document.getElementById("bigTimer");

const bgMusic = document.getElementById("bgMusic");
const openSound = document.getElementById("openSound");

// 🎬 INTRO
setTimeout(()=>{
  document.getElementById("intro").style.display="none";
},3000);

// 🎮 GIFT MOVE
let unlocked=false;

function moveGift(){
  if(unlocked) return;

  let x=Math.random()*(window.innerWidth-150);
  let y=Math.random()*(window.innerHeight-150);

  gift.style.left=x+"px";
  gift.style.top=y+"px";
}

gift.addEventListener("mouseover",moveGift);
gift.addEventListener("touchstart",moveGift);

setTimeout(()=>{
  unlocked=true;
  funText.innerText="Click me 🎁";
},10000);

// 🎵 AUDIO
document.body.addEventListener("click",()=>{
  bgMusic.play().catch(()=>{});
},{once:true});

// 🎁 OPEN
gift.addEventListener("click",()=>{
  if(!unlocked) return;

  openSound.play();

  gift.style.left="50%";
  gift.style.top="50%";

  setTimeout(()=>{
    gift.style.display="none";
    menu.style.display="block";
  },800);
});

// 🔒 LOCK
const unlockDate=new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked(){
  return Date.now()>=unlockDate;
}

// 🎛 NAV
function openPage(type){

  menu.style.display="none";
  timerPage.style.display="none";
  videoPage.style.display="none";
  book.style.display="none";

  if(type==="video" && !isUnlocked()){
    funText.innerText="🔒 Unlocks on May 12 🎂";
    menu.style.display="block";
    return;
  }

  if(type==="timer") timerPage.style.display="block";
  if(type==="video") videoPage.style.display="block";
  if(type==="book") book.style.display="block";
}

// 🔙 BACK
function goBack(){
  timerPage.style.display="none";
  videoPage.style.display="none";
  book.style.display="none";
  menu.style.display="block";
}

window.openPage=openPage;
window.goBack=goBack;

// ⏳ TIMER
setInterval(()=>{
  let now=Date.now();
  let gap=unlockDate-now;

  let d=Math.floor(gap/(1000*60*60*24));
  let h=Math.floor((gap/(1000*60*60))%24);
  let m=Math.floor((gap/(1000*60))%60);
  let s=Math.floor((gap/1000)%60);

  countdown.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
  if(bigTimer) bigTimer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;

},1000);

// ✨ STAR PARTICLES
const starCanvas=document.getElementById("stars");
const ctx=starCanvas.getContext("2d");

starCanvas.width=innerWidth;
starCanvas.height=innerHeight;

let stars=[];
for(let i=0;i<120;i++){
  stars.push({
    x:Math.random()*starCanvas.width,
    y:Math.random()*starCanvas.height,
    size:Math.random()*2,
    speed:Math.random()*0.5
  });
}

function animateStars(){
  ctx.clearRect(0,0,starCanvas.width,starCanvas.height);

  stars.forEach(s=>{
    s.y+=s.speed;
    if(s.y>starCanvas.height) s.y=0;

    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}
animateStars();

// 🖱 CURSOR GLOW
const cursor=document.getElementById("cursorGlow");

document.addEventListener("mousemove",(e)=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

// 🧠 PARALLAX
document.addEventListener("mousemove",(e)=>{
  let x=(window.innerWidth/2 - e.clientX)/25;
  let y=(window.innerHeight/2 - e.clientY)/25;

  document.querySelectorAll("#menu,#timerPage,#videoPage").forEach(el=>{
    el.style.transform=
      `translate(-50%, -50%) perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
});

});
