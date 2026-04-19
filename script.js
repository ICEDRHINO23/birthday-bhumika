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
const bgMusic = document.getElementById("bgMusic");

// ==============================
// INTRO
// ==============================
setTimeout(() => {
  if (intro) intro.style.display = "none";
}, 3000);

// ==============================
// 🎁 GIFT INTERACTION
// ==============================
let unlocked = false;

// Move gift randomly before unlock
function moveGift() {
  if (!gift || unlocked) return;

  let x = Math.random() * (window.innerWidth - 150);
  let y = Math.random() * (window.innerHeight - 150);

  gift.style.left = x + "px";
  gift.style.top = y + "px";
}

if (gift) {
  gift.addEventListener("mouseover", moveGift);
}

// Unlock after few seconds
setTimeout(() => {
  unlocked = true;
  if (funText) funText.innerText = "Okay fine… click me 🎁";
}, 6000);

// Click gift → open menu
if (gift) {
  gift.addEventListener("click", () => {
    if (!unlocked) return;

    gift.style.display = "none";
    menu.style.display = "block";

    // 🎵 Start music
    if (bgMusic) {
      bgMusic.volume = 0.5;
      bgMusic.play().catch(() => {});
    }
  });
}

// ==============================
// 🔒 LOCK SYSTEM (VIDEO ONLY)
// ==============================
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked() {
  return Date.now() >= unlockDate;
}

// ==============================
// 📂 NAVIGATION
// ==============================
window.openPage = function(type){

  // Hide all pages
  menu.style.display = "none";
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";

  // Timer always allowed
  if (type === "timer") {
    timerPage.style.display = "block";
  }

  // Video locked before date
  else if (type === "video") {
    if (!isUnlocked()) {
      alert("🎂 Unlocks on May 12!");
      menu.style.display = "block";
      return;
    }
    videoPage.style.display = "block";
  }

  // Scrapbook always allowed
  else if (type === "book") {
    book.style.display = "block";

    currentPage = 0;

    setTimeout(() => {
      showPage(currentPage);
    }, 50);
  }
}

// ==============================
// 🔙 BACK BUTTON
// ==============================
window.goBack = function(){
  timerPage.style.display = "none";
  videoPage.style.display = "none";
  book.style.display = "none";
  menu.style.display = "block";
}

// ==============================
// ⏳ TIMER
// ==============================
setInterval(() => {

  let gap = unlockDate - Date.now();

  let d = Math.floor(gap / (1000 * 60 * 60 * 24));
  let h = Math.floor((gap / (1000 * 60 * 60)) % 24);
  let m = Math.floor((gap / (1000 * 60)) % 60);
  let s = Math.floor((gap / 1000) % 60);

  if (bigTimer) {
    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

}, 1000);

// ==============================
// 📖 SCRAPBOOK SYSTEM
// ==============================
let currentPage = 0;

function getPages(){
  return document.querySelectorAll("#pagesContainer .page");
}

function showPage(index){
  const pages = getPages();

  if (!pages.length) return;

  pages.forEach(p => p.classList.remove("active"));

  if (pages[index]) {
    pages[index].classList.add("active");
  }
}

// NEXT PAGE
window.nextPage = function(){
  const pages = getPages();

  if (!pages.length) return;

  currentPage++;

  if (currentPage >= pages.length) {
    currentPage = 0; // loop
  }

  showPage(currentPage);
}

// PREVIOUS PAGE
window.prevPage = function(){
  const pages = getPages();

  if (!pages.length) return;

  currentPage--;

  if (currentPage < 0) {
    currentPage = pages.length - 1;
  }

  showPage(currentPage);
}

});
