document.addEventListener("DOMContentLoaded", () => {

// ==============================
// ELEMENTS
// ==============================
const intro = document.getElementById("intro");
const gift = document.getElementById("gift");
const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");
const funText = document.getElementById("funText");
const bigTimer = document.getElementById("bigTimer");

// ==============================
// INTRO
// ==============================
setTimeout(() => {
  intro.style.display = "none";
}, 3000);

// ==============================
// GIFT MOVE
// ==============================
let unlocked = false;

function moveGift() {
  if (unlocked) return;

  let x = Math.random() * (window.innerWidth - 150);
  let y = Math.random() * (window.innerHeight - 150);

  gift.style.left = x + "px";
  gift.style.top = y + "px";
}

gift.addEventListener("mouseover", moveGift);

setTimeout(() => {
  unlocked = true;
  funText.innerText = "Click me 🎁";
}, 8000);

// ==============================
// OPEN GIFT
// ==============================
gift.addEventListener("click", () => {

  if (!unlocked) return;

  gift.style.display = "none";
  menu.style.display = "block";

});

// ==============================
// LOCK SYSTEM
// ==============================
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked() {
  return Date.now() >= unlockDate;
}

// ==============================
// NAVIGATION
// ==============================
window.openPage = function(type){

  menu.style.display = "none";
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";

  if(type === "video" && !isUnlocked()){
    funText.innerText = "🔒 Unlocks on May 12 🎂";
    menu.style.display = "block";
    return;
  }

  if(type === "timer") timerPage.style.display = "block";
  if(type === "video") videoPage.style.display = "block";

  if(type === "book"){
    book.style.display = "block";
    currentPage = 0;
    showPage(currentPage);
  }
}

// ==============================
// BACK BUTTON
// ==============================
window.goBack = function(){
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";
  menu.style.display = "block";
}

// ==============================
// TIMER
// ==============================
setInterval(() => {

  let gap = unlockDate - Date.now();

  let d = Math.floor(gap/(1000*60*60*24));
  let h = Math.floor((gap/(1000*60*60))%24);
  let m = Math.floor((gap/(1000*60))%60);
  let s = Math.floor((gap/1000)%60);

  if(bigTimer){
    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

},1000);

// ==============================
// 📖 SCRAPBOOK SYSTEM
// ==============================
let currentPage = 0;

function getPages(){
  return document.querySelectorAll("#pagesContainer .page");
}

function showPage(index){
  const pages = getPages();

  pages.forEach(p => p.classList.remove("active"));

  if(pages[index]){
    pages[index].classList.add("active");
  }
}

window.nextPage = function(){
  const pages = getPages();
  if(currentPage < pages.length - 1){
    currentPage++;
    showPage(currentPage);
  }
}

window.prevPage = function(){
  if(currentPage > 0){
    currentPage--;
    showPage(currentPage);
  }
}

// ==============================
// ➕ ADD PAGE FUNCTION
// ==============================
window.addPage = function(type, src, text){

  const container = document.getElementById("pagesContainer");

  const page = document.createElement("div");
  page.className = "page";

  let media = "";

  if(type === "image"){
    media = `<img src="${src}">`;
  }

  if(type === "video"){
    media = `<video src="${src}" autoplay loop muted></video>`;
  }

  page.innerHTML = `
    <div class="left">${media}</div>
    <div class="right">${text}</div>
  `;

  container.appendChild(page);
}

});
