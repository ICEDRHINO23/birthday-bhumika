document.addEventListener("DOMContentLoaded", () => {

/* =========================
   ELEMENTS
========================= */
const intro = document.getElementById("intro");
const gift = document.getElementById("giftImage");

const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");

const bigTimer = document.getElementById("bigTimer");
const pagesContainer = document.getElementById("pagesContainer");

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");

const music = document.getElementById("bgMusic");
const heartsContainer = document.getElementById("hearts");

const surprise = document.getElementById("surpriseText");
const typed = document.getElementById("typedText");

const bigMessage = document.getElementById("bigMessage");

/* =========================
   INTRO
========================= */
setTimeout(() => {
  intro.style.display = "none";
}, 2000);

/* =========================
   ADMIN PANEL
========================= */
adminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("open");
});

/* LOGIN */
window.login = function () {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "abin" && pass === "1234") {
    window.location.href = "admin.html";
  } else {
    alert("Wrong credentials ❌");
  }
};

/* =========================
   MUSIC START
========================= */
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

/* =========================
   HEARTS (CONTROLLED)
========================= */
setInterval(() => {

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";

  heart.style.left = Math.random() * 100 + "vw";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);

}, 800);

/* =========================
   GIFT FLOW (MAIN LOGIC)
========================= */
let unlocked = false;

setTimeout(() => {
  unlocked = true;
}, 3000);

gift.addEventListener("click", () => {

  if (!unlocked) return;

  gift.src = "./image/gift-open.PNG";
  gift.classList.add("opened");

  setTimeout(() => {

    document.getElementById("giftContainer").style.display = "none";

    /* SHOW MENU */
    menu.classList.remove("hidden");

    /* BIG MESSAGE DELAY */
    setTimeout(() => {

      bigMessage.classList.remove("hidden");
      bigMessage.classList.add("show");

      /* AUTO HIDE */
      setTimeout(() => {

        bigMessage.classList.add("hide");

        setTimeout(() => {
          bigMessage.classList.add("hidden");
        }, 1000);

      }, 4000);

    }, 800);

    /* SURPRISE TEXT */
    setTimeout(() => {

      surprise.classList.remove("hidden");

      typeText(
        "You didn’t just become a friend… you became a part of my life that I never want to lose ❤️",
        typed
      );

    }, 1500);

  }, 1000);

});

/* =========================
   TYPING EFFECT
========================= */
function typeText(text, element, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

/* =========================
   DATE LOCK
========================= */
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

function isUnlocked() {
  return Date.now() >= unlockDate;
}

/* =========================
   NAVIGATION
========================= */
window.openPage = function(type){

  menu.classList.add("hidden");
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");

  if(type === "timer"){
    timerPage.classList.remove("hidden");
  }

  if(type === "video"){
    if(!isUnlocked()){
      alert("🔒 Unlocks on May 12 🎂");
      menu.classList.remove("hidden");
      return;
    }
    videoPage.classList.remove("hidden");
  }

  if(type === "book"){
    book.classList.remove("hidden");
    currentPage = 0;
    showPage(currentPage);
  }
};

/* =========================
   BACK BUTTON
========================= */
window.goBack = function(){
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");
  menu.classList.remove("hidden");
};

/* =========================
   TIMER
========================= */
setInterval(() => {

  let gap = unlockDate - Date.now();

  if(gap <= 0){
    bigTimer.innerHTML = "🎉 It's Time! 🎂";
    return;
  }

  let d = Math.floor(gap/(1000*60*60*24));
  let h = Math.floor((gap/(1000*60*60))%24);
  let m = Math.floor((gap/(1000*60))%60);
  let s = Math.floor((gap/1000)%60);

  bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

},1000);

/* =========================
   LOAD DATA
========================= */
const scrapbookData = JSON.parse(localStorage.getItem("scrapbook")) || [];
const videoData = localStorage.getItem("video");

/* =========================
   LOAD VIDEO
========================= */
if (videoData) {
  videoPage.innerHTML = `
    <h2>Effort Video 🎥</h2>
    <video src="${videoData}" controls autoplay></video>
    <br><button onclick="goBack()">⬅ Back</button>
  `;
}

/* =========================
   LOAD SCRAPBOOK
========================= */
function loadScrapbook(){

  pagesContainer.innerHTML = "";

  scrapbookData.forEach((item) => {

    const spread = document.createElement("div");
    spread.className = "spread";

    spread.innerHTML = `
      <div class="left">
        ${
          item.type === "image"
          ? `<img src="${item.src}">`
          : `<video src="${item.src}" controls></video>`
        }
      </div>

      <div class="right">
        <h2>${item.title}</h2>
        <p>${item.text}</p>
      </div>
    `;

    pagesContainer.appendChild(spread);
  });

  showPage(0);
}

/* =========================
   SCRAPBOOK NAV
========================= */
let currentPage = 0;

function getPages(){
  return document.querySelectorAll(".spread");
}

function showPage(index){
  const pages = getPages();

  pages.forEach((page, i) => {
    page.classList.remove("active");

    if(i === index){
      page.classList.add("active");
    }
  });
}

window.nextPage = function(){
  const pages = getPages();

  if(currentPage < pages.length - 1){
    currentPage++;
    showPage(currentPage);
  }
};

window.prevPage = function(){
  if(currentPage > 0){
    currentPage--;
    showPage(currentPage);
  }
};

/* INIT */
loadScrapbook();

});
