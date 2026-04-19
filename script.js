document.addEventListener("DOMContentLoaded", () => {

const intro = document.getElementById("intro");
const gift = document.getElementById("gift");
const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");
const bigTimer = document.getElementById("bigTimer");
const bgMusic = document.getElementById("bgMusic");

// INTRO
setTimeout(() => intro.style.display = "none", 3000);

// GIFT OPEN
let unlocked = false;

setTimeout(() => unlocked = true, 5000);

gift.addEventListener("click", () => {
  if (!unlocked) return;

  document.querySelector(".gift-box").classList.add("gift-open");

  setTimeout(() => {
    gift.style.display = "none";
    menu.style.display = "block";
    bgMusic.play().catch(()=>{});
  }, 800);
});

// NAVIGATION
window.openPage = function(type){
  menu.style.display = "none";
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";

  if(type === "timer") timerPage.style.display = "block";
  if(type === "video") videoPage.style.display = "block";

  if(type === "book"){
    book.style.display = "block";
    currentPage = 0;
    showPage(currentPage);
  }
}

// BACK
window.goBack = function(){
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";
  menu.style.display = "block";
}

// TIMER
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

setInterval(() => {
  let gap = unlockDate - Date.now();

  let d = Math.floor(gap/(1000*60*60*24));
  let h = Math.floor((gap/(1000*60*60))%24);
  let m = Math.floor((gap/(1000*60))%60);
  let s = Math.floor((gap/1000)%60);

  if(bigTimer) bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

},1000);

// SCRAPBOOK
let currentPage = 0;

function getPages(){
  return document.querySelectorAll("#pagesContainer .page");
}

function showPage(index){
  const pages = getPages();
  pages.forEach(p => p.classList.remove("active"));
  if(pages[index]) pages[index].classList.add("active");
}

window.nextPage = function(){
  const pages = getPages();
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
}

window.prevPage = function(){
  const pages = getPages();
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  showPage(currentPage);
}

});
