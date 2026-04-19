// ==============================
// 🎬 INTRO CINEMATIC
// ==============================
gsap.from("#intro", {
  opacity: 0,
  scale: 0.8,
  duration: 1.5,
  ease: "power3.out"
});

setTimeout(() => {// 🎬 INTRO
gsap.from("#intro", { opacity:0, scale:0.8, duration:1.5 });

setTimeout(()=>{
  gsap.to("#intro",{
    opacity:0,
    onComplete:()=>{
      document.getElementById("intro").style.display="none";
      document.body.classList.add("gift-mode");
    }
  });
},3000);

// 🎁 GIFT ENTRY
gsap.from("#gift",{ y:-200, opacity:0, duration:1.5, ease:"bounce.out" });

const gift = document.getElementById("gift");
const funText = document.getElementById("funText");

let unlocked=false;

function moveGift(){
  if(unlocked) return;

  const x=Math.random()*(window.innerWidth-160);
  const y=Math.random()*(window.innerHeight-160);

  gsap.to(gift,{ left:x+"px", top:y+"px", duration:0.5 });
}

gift.addEventListener("mouseover",moveGift);
gift.addEventListener("touchstart",moveGift);

setTimeout(()=>{
  unlocked=true;
  funText.innerText="Okay fine… click me 🎁";
},15000);

// 🎵 AUDIO
const bgMusic=document.getElementById("bgMusic");
const openSound=document.getElementById("openSound");
const flipSound=document.getElementById("flipSound");

document.body.addEventListener("click",()=>{
  bgMusic?.play().catch(()=>{});
},{once:true});

// 🎁 OPEN
gift.addEventListener("click",()=>{
  if(!unlocked) return;

  openSound?.play();

  gsap.to(".lid",{ rotationX:130, duration:1 });
  releaseButterflies();

  gsap.to("#gift",{
    opacity:0,
    scale:0.5,
    duration:1,
    onComplete:()=>{
      gift.style.display="none";
      document.getElementById("menu").style.display="block";
    }
  });
});

// 🔒 LOCK DATE
const unlockDate=new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked(){
  return new Date().getTime()>=unlockDate;
}

// 🎛 PAGE NAV
function openPage(type){

  document.getElementById("menu").style.display="none";
  document.getElementById("book").style.display="none";
  document.getElementById("timerPage").style.display="none";
  document.getElementById("videoPage").style.display="none";

  // 🔒 ONLY VIDEO LOCKED
  if(type==="video" && !isUnlocked()){
    funText.innerText="🔒 Video unlocks on May 12 🎂";
    document.getElementById("menu").style.display="block";
    return;
  }

  if(type==="timer"){
    document.getElementById("timerPage").style.display="block";
  }

  if(type==="video"){
    document.getElementById("videoPage").style.display="block";
  }

  if(type==="book"){
    document.getElementById("book").style.display="block";
  }
}

// 🔙 BACK
function goBack(){
  document.getElementById("menu").style.display="block";
  document.getElementById("timerPage").style.display="none";
  document.getElementById("videoPage").style.display="none";
  document.getElementById("book").style.display="none";
}

// 🌍 GLOBAL FIX
window.openPage=openPage;
window.goBack=goBack;

// 📖 PAGE FLIP
document.querySelectorAll(".page").forEach((page,i)=>{
  page.addEventListener("click",()=>{
    gsap.to(page,{ rotationY:-160, duration:1 });
    flipSound?.play();

    if(i===2){
      setTimeout(()=>{
        document.getElementById("book").style.display="none";
        document.getElementById("final").style.display="block";
      },1000);
    }
  });
});

// 🦋 BUTTERFLIES
function releaseButterflies(){
  const c=document.getElementById("butterflyCanvas");
  const ctx=c.getContext("2d");

  c.width=window.innerWidth;
  c.height=window.innerHeight;

  let p=[];
  for(let i=0;i<60;i++){
    p.push({
      x:c.width/2,
      y:c.height/2,
      vx:(Math.random()-0.5)*6,
      vy:Math.random()*-6,
      life:1
    });
  }

  function anim(){
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach(b=>{
      b.x+=b.vx;
      b.y+=b.vy;
      b.life-=0.02;

      ctx.fillStyle=`rgba(255,182,193,${b.life})`;
      ctx.beginPath();
      ctx.arc(b.x,b.y,5,0,Math.PI*2);
      ctx.fill();
    });

    p=p.filter(b=>b.life>0);
    if(p.length>0) requestAnimationFrame(anim);
  }
  anim();
}

// ⏳ TIMER
setInterval(()=>{
  const now=new Date().getTime();
  const gap=unlockDate-now;

  const d=Math.floor(gap/(1000*60*60*24));
  const h=Math.floor((gap/(1000*60*60))%24);
  const m=Math.floor((gap/(1000*60))%60);
  const s=Math.floor((gap/1000)%60);

  document.getElementById("countdown").innerHTML=`${d}d ${h}h ${m}m ${s}s`;

  const big=document.getElementById("bigTimer");
  if(big){
    big.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
  }

},1000);
  gsap.to("#intro", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.getElementById("intro").style.display = "none";
      document.body.classList.add("gift-mode");
    }
  });
}, 3000);


// ==============================
// 🎁 GIFT ENTRY ANIMATION
// ==============================
gsap.from("#gift", {
  y: -200,
  opacity: 0,
  duration: 1.5,
  ease: "bounce.out"
});


// ==============================
// 🎮 GIFT CHASE SYSTEM
// ==============================
const gift = document.getElementById("gift");
const funText = document.getElementById("funText");

let unlocked = false;

const messages = [
  "Catch me 😜",
  "Too slow 😂",
  "Almost there!",
  "Hehe try again!",
  "You can do it 💪"
];

function moveGift() {
  if (unlocked) return;

  const x = Math.random() * (window.innerWidth - 160);
  const y = Math.random() * (window.innerHeight - 160);

  gsap.to(gift, {
    left: x + "px",
    top: y + "px",
    duration: 0.5,
    ease: "power2.out"
  });

  if (funText) {
    funText.innerText = messages[Math.floor(Math.random() * messages.length)];
  }
}

gift.addEventListener("mouseover", moveGift);
gift.addEventListener("touchstart", moveGift);

// unlock after 15 sec
setTimeout(() => {
  unlocked = true;
  if (funText) funText.innerText = "Okay fine… click me 🎁";
}, 15000);


// ==============================
// 🎵 AUDIO SYSTEM
// ==============================
const bgMusic = document.getElementById("bgMusic");
const openSound = document.getElementById("openSound");
const flipSound = document.getElementById("flipSound");

document.body.addEventListener("click", () => {
  bgMusic?.play().catch(()=>{});
}, { once: true });


// ==============================
// 🎁 GIFT OPEN → MENU
// ==============================
gift.addEventListener("click", () => {

  if (!unlocked) return;

  openSound?.play();

  // lid animation
  gsap.to(".lid", {
    rotationX: 130,
    transformOrigin: "top",
    duration: 1
  });

  // glow effect
  gsap.to("#gift", {
    boxShadow: "0 0 80px gold",
    duration: 0.5
  });

  // butterflies
  releaseButterflies();

  // hide gift → show menu
  gsap.to("#gift", {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      gift.style.display = "none";
      document.getElementById("menu").style.display = "block";
    }
  });

});


// ==============================
// 🔒 LOCK SYSTEM
// ==============================
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked() {
  return new Date().getTime() >= unlockDate;
}


// ==============================
// 🎛 PAGE NAVIGATION
// ==============================
function openPage(type) {

  document.getElementById("menu").style.display = "none";
  document.getElementById("book").style.display = "none";
  document.getElementById("timerPage").style.display = "none";
  document.getElementById("videoPage").style.display = "none";

  // LOCK CHECK
  if ((type === "timer" || type === "video") && !isUnlocked()) {
    alert("🔒 Unlocks on May 12, 12:00 AM 🎂");
    document.getElementById("menu").style.display = "block";
    return;
  }

  if (type === "book") {
    document.getElementById("book").style.display = "block";

    gsap.from("#book", {
      scale: 0.7,
      opacity: 0,
      duration: 1
    });
  }

  if (type === "timer") {
    document.getElementById("timerPage").style.display = "block";
  }

  if (type === "video") {
    document.getElementById("videoPage").style.display = "block";
  }
}


// ==============================
// 🔙 BACK BUTTON
// ==============================
function goBack() {
  document.getElementById("timerPage").style.display = "none";
  document.getElementById("videoPage").style.display = "none";
  document.getElementById("book").style.display = "none";
  document.getElementById("menu").style.display = "block";
}


// ==============================
// 📖 PAGE FLIP SYSTEM
// ==============================
const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
  page.addEventListener("click", () => {

    gsap.to(page, {
      rotationY: -160,
      duration: 1
    });

    flipSound?.play();

    if (index === pages.length - 1) {
      setTimeout(() => {
        document.getElementById("book").style.display = "none";
        document.getElementById("final").style.display = "block";

        gsap.from("#final", {
          scale: 0.7,
          opacity: 0,
          duration: 1
        });
      }, 1200);
    }

  });
});


// ==============================
// 🦋 BUTTERFLY EFFECT
// ==============================
function releaseButterflies() {
  const canvas = document.getElementById("butterflyCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 6 + 4,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 2,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.01;

      ctx.fillStyle = `rgba(255,182,193,${p.life})`;

      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size, p.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}


// ==============================
// ⏳ SMALL TIMER (TOP)
// ==============================
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const gap = unlockDate - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const m = Math.floor((gap / (1000 * 60)) % 60);
  const s = Math.floor((gap / 1000) % 60);

  if (countdown) {
    countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }
}, 1000);


// ==============================
// ⏳ BIG TIMER (TIMER PAGE)
// ==============================
setInterval(() => {

  const now = new Date().getTime();
  const gap = unlockDate - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const m = Math.floor((gap / (1000 * 60)) % 60);
  const s = Math.floor((gap / 1000) % 60);

  const bigTimer = document.getElementById("bigTimer");

  if (bigTimer) {
    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

}, 1000);
