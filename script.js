// 🎬 INTRO
gsap.from("#intro",{opacity:0,scale:0.8,duration:1.5});

setTimeout(()=>{
  gsap.to("#intro",{opacity:0,onComplete:()=>{
    intro.style.display="none";
    document.body.classList.add("gift-mode");
  }});
},3000);

// 🎁 GIFT ENTRY
gsap.from("#gift",{y:-200,opacity:0,duration:1.5,ease:"bounce.out"});

const gift=document.getElementById("gift");
const funText=document.getElementById("funText");

let unlocked=false;

// 🎮 MOVE
function moveGift(){
  if(unlocked) return;

  let x=Math.random()*(window.innerWidth-160);
  let y=Math.random()*(window.innerHeight-160);

  gsap.to(gift,{left:x+"px",top:y+"px",duration:0.5});
}

gift.addEventListener("mouseover",moveGift);
gift.addEventListener("touchstart",moveGift);

setTimeout(()=>{
  unlocked=true;
  funText.innerText="Okay fine… click me 🎁";
},15000);

// 🎵 AUDIO
document.body.addEventListener("click",()=>{
  bgMusic.play().catch(()=>{});
},{once:true});

// 🎁 OPEN (3D + CENTER)
gift.addEventListener("click",()=>{

  if(!unlocked) return;

  openSound.play();

  gsap.to(gift,{
    left:"50%",
    top:"50%",
    xPercent:-50,
    yPercent:-50,
    duration:0.6
  });

  gsap.to(".lid",{rotationX:140,duration:1});

  releaseButterflies();

  gsap.to(gift,{
    scale:0.5,
    opacity:0,
    duration:1,
    delay:0.5,
    onComplete:()=>{
      gift.style.display="none";
      menu.style.display="block";
    }
  });

});

// 🔒 LOCK
const unlockDate=new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked(){
  return new Date().getTime()>=unlockDate;
}

// 🎛 NAV
function openPage(type){

  menu.style.display="none";
  book.style.display="none";
  timerPage.style.display="none";
  videoPage.style.display="none";

  if(type==="video" && !isUnlocked()){
    funText.innerText="🔒 Unlocks on May 12 🎂";
    menu.style.display="block";
    return;
  }

  if(type==="timer") timerPage.style.display="block";
  if(type==="video") videoPage.style.display="block";
  if(type==="book") book.style.display="block";
}

// 🔙 BACK FIX
function goBack(){

  timerPage.style.display="none";
  videoPage.style.display="none";
  book.style.display="none";

  menu.style.display="block";

  gsap.from("#menu",{scale:0.8,opacity:0,duration:0.5});
}

window.openPage=openPage;
window.goBack=goBack;

// 📖 FLIP
document.querySelectorAll(".page").forEach((p,i)=>{
  p.addEventListener("click",()=>{
    gsap.to(p,{rotationY:-160,duration:1});
    flipSound.play();

    if(i===2){
      setTimeout(()=>{
        book.style.display="none";
        final.style.display="block";
      },1000);
    }
  });
});

// 🦋 BUTTERFLY
function releaseButterflies(){
  let c=butterflyCanvas;
  let ctx=c.getContext("2d");

  c.width=innerWidth;
  c.height=innerHeight;

  let p=[];
  for(let i=0;i<60;i++){
    p.push({
      x:c.width/2,y:c.height/2,
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
  let now=Date.now();
  let gap=unlockDate-now;

  let d=Math.floor(gap/(1000*60*60*24));
  let h=Math.floor((gap/(1000*60*60))%24);
  let m=Math.floor((gap/(1000*60))%60);
  let s=Math.floor((gap/1000)%60);

  countdown.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
  if(bigTimer) bigTimer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;

},1000);
