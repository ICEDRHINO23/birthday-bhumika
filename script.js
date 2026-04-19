document.addEventListener("DOMContentLoaded", () => {

// ==============================
// 🔧 SAFE ELEMENT GETTER
// ==============================
function get(id){
  return document.getElementById(id);
}

const intro = get("intro");
const gift = get("gift");
const menu = get("menu");
const timerPage = get("timerPage");
const videoPage = get("videoPage");
const book = get("book");
const funText = get("funText");
const bigTimer = get("bigTimer");

// ==============================
// 🎬 INTRO
// ==============================
setTimeout(() => {
  if(intro) intro.style.display = "none";
}, 3000);

// ==============================
// 🎮 GIFT MOVE
// ==============================
let unlocked = false;

function moveGift() {
  if (!gift || unlocked) return;

  let x = Math.random() * (window.innerWidth - 150);
  let y = Math.random() * (window.innerHeight - 150);

  gift.style.left = x + "px";
  gift.style.top = y + "px";
}

gift?.addEventListener("mouseover", moveGift);

setTimeout(() => {
  unlocked = true;
  if(funText) funText.innerText = "Click me 🎁";
}, 8000);

// ==============================
// 🎁 OPEN GIFT
// ==============================
gift?.addEventListener("click", () => {

  if (!unlocked) return;

  gift.style.display = "none";
  if(menu) menu.style.display = "block";

});

// ==============================
// 🔒 LOCK SYSTEM
// ==============================
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked() {
  return Date.now() >= unlockDate;
}

// ==============================
// 🎛 NAVIGATION
// ==============================
window.openPage = function(type){

  if(menu) menu.style.display = "none";
  if(timerPage) timerPage.style.display = "none";
  if(videoPage) videoPage.style.display = "none";
  if(book) book.style.display = "none";

  // 🔒 LOCK VIDEO ONLY
  if(type === "video" && !isUnlocked()){
    if(funText) funText.innerText = "🔒 Unlocks on May 12 🎂";
    if(menu) menu.style.display = "block";
    return;
  }

  if(type === "timer" && timerPage){
    timerPage.style.display = "block";
  }

  if(type === "video" && videoPage){
    videoPage.style.display = "block";
  }

  if(type === "book" && book){
    book.style.display = "block";
    initBook(); // 🔥 important fix
  }
}

// ==============================
// 🔙 BACK BUTTON
// ==============================
window.goBack = function(){
  if(timerPage) timerPage.style.display = "none";
  if(videoPage) videoPage.style.display = "none";
  if(book) book.style.display = "none";
  if(menu) menu.style.display = "block";
}

// ==============================
// ⏳ TIMER
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
// 📖 SCRAPBOOK SYSTEM (FIXED)
// ==============================
let currentPage = 0;

function getPages(){
  return document.querySelectorAll("#pagesContainer .page");
}

// 🔥 IMPORTANT INIT FUNCTION
function initBook(){
  currentPage = 0;
  showPage(currentPage);
}

function showPage(index){
  const pages = getPages();

  if(!pages.length) return;

  pages.forEach(p => p.classList.remove("active"));

  if(pages[index]){
    pages[index].classList.add("active");
  }
}

// NEXT
window.nextPage = function(){
  const pages = getPages();

  if(currentPage < pages.length - 1){
    currentPage++;
    showPage(currentPage);
  }
}

// PREV
window.prevPage = function(){
  if(currentPage > 0){
    currentPage--;
    showPage(currentPage);
  }
}

// ==============================
// ➕ ADD PAGE FUNCTION (SAFE)
// ==============================
window.addPage = function(type, src, text){

  const container = get("pagesContainer");
  if(!container) return;

  const page = document.createElement("div");
  page.className = "page";

  let media = "";

  if(type === "image"){
    media = `<img src="${src}" style="width:100%">`;
  }

  if(type === "video"){
    media = `<video src="${src}" autoplay loop muted style="width:100%"></video>`;
  }

  page.innerHTML = `
    <div class="left">${media}</div>
    <div class="right">${text}</div>
  `;

  container.appendChild(page);
}

});
