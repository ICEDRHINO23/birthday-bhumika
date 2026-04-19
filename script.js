document.addEventListener("DOMContentLoaded", () => {

const intro = document.getElementById("intro");
const gift = document.getElementById("giftImage");

const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");

const bigTimer = document.getElementById("bigTimer");

// intro
setTimeout(() => intro.style.display="none",2000);

// unlock delay
let unlocked = false;
setTimeout(()=> unlocked = true, 3000);

// 🎁 CLICK GIFT
gift.addEventListener("click", () => {

  if(!unlocked) return;

  // change image → open box
  gift.src = "./images/gift-open.png";

  // glow effect
  gift.style.filter = "drop-shadow(0 0 40px gold)";
  gift.style.transform = "scale(1.2)";

  // show menu after animation
  setTimeout(()=>{
    document.getElementById("giftContainer").style.display="none";
    menu.classList.remove("hidden");
  },1200);

});

// DATE LOCK
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked(){
  return Date.now() >= unlockDate;
}

// NAVIGATION
window.openPage = function(type){

  menu.classList.add("hidden");
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");

  if(type==="timer"){
    timerPage.classList.remove("hidden");
  }

  if(type==="video"){
    if(!isUnlocked()){
      alert("🔒 Unlocks on May 12 🎂");
      menu.classList.remove("hidden");
      return;
    }
    videoPage.classList.remove("hidden");
  }

  if(type==="book"){
    book.classList.remove("hidden");
    showPage(currentPage);
  }
}

// BACK
window.goBack = function(){
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");
  menu.classList.remove("hidden");
}

// TIMER
setInterval(()=>{
  let gap = unlockDate - Date.now();

  let d=Math.floor(gap/(1000*60*60*24));
  let h=Math.floor((gap/(1000*60*60))%24);
  let m=Math.floor((gap/(1000*60))%60);
  let s=Math.floor((gap/1000)%60);

  bigTimer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
},1000);

// SCRAPBOOK
let currentPage = 0;

function getPages(){
  return document.querySelectorAll("#pagesContainer .page");
}

function showPage(i){
  const pages = getPages();
  pages.forEach(p=>p.classList.remove("active"));
  if(pages[i]) pages[i].classList.add("active");
}

window.nextPage = function(){
  const pages = getPages();
  if(currentPage < pages.length-1){
    currentPage++;
    showPage(currentPage);
  }
}

window.prevPage = function(){
  if(currentPage>0){
    currentPage--;
    showPage(currentPage);
  }
}

});
