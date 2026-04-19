document.addEventListener("DOMContentLoaded", () => {

/* =========================
   ELEMENTS
========================= */
const intro = document.getElementById("intro");
const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

const gift = document.getElementById("giftImage");
const menu = document.getElementById("menu");
const timerPage = document.getElementById("timerPage");
const videoPage = document.getElementById("videoPage");
const book = document.getElementById("book");

const bigTimer = document.getElementById("bigTimer");
const pagesContainer = document.getElementById("pagesContainer");

const music = document.getElementById("bgMusic");
const heartsContainer = document.getElementById("hearts");

const surprise = document.getElementById("surpriseText");
const typed = document.getElementById("typedText");
const bigMessage = document.getElementById("bigMessage");

/* =========================
   INTRO
========================= */
setTimeout(() => intro.style.display = "none", 2000);

/* =========================
   ADMIN PANEL
========================= */
adminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("open");
});

/* =========================
   LOGIN (FINAL WORKING)
========================= */
loginBtn.addEventListener("click", () => {

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  console.log(user, pass);

  if (user === "abin" && pass === "1234") {

    alert("Login Success ✅");

    document.body.innerHTML = "<h1>Welcome Admin 🎉</h1>";

  } else {
    alert("Wrong credentials ❌");
  }

});

/* =========================
   MUSIC START
========================= */
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

/* =========================
   HEARTS
========================= */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 900);

/* =========================
   GIFT FLOW
========================= */
let unlocked = false;
setTimeout(() => unlocked = true, 3000);

gift.addEventListener("click", () => {

  if (!unlocked) return;

  gift.src = "./image/gift-open.PNG";

  setTimeout(() => {

    document.getElementById("giftContainer").style.display = "none";
    menu.classList.remove("hidden");

    bigMessage.classList.add("show");

    setTimeout(() => {
      bigMessage.classList.remove("show");
      bigMessage.classList.add("hide");
    }, 2500);

    setTimeout(() => {
      surprise.classList.remove("hidden");
      typeText("You didn’t just become a friend… you became a part of my life ❤️", typed);
    }, 3500);

  }, 1000);

});

/* =========================
   TYPING
========================= */
function typeText(text, element) {
  let i = 0;
  element.innerHTML = "";
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 40);
    }
  }
  typing();
}

/* =========================
   TIMER
========================= */
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

setInterval(() => {
  let gap = unlockDate - Date.now();
  let d = Math.floor(gap/(1000*60*60*24));
  let h = Math.floor((gap/(1000*60*60))%24);
  let m = Math.floor((gap/(1000*60))%60);
  let s = Math.floor((gap/1000)%60);
  bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}, 1000);

/* =========================
   NAVIGATION
========================= */
window.openPage = function(type){
  menu.classList.add("hidden");
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");

  if(type==="timer") timerPage.classList.remove("hidden");
  if(type==="video") videoPage.classList.remove("hidden");
  if(type==="book") book.classList.remove("hidden");
};

window.goBack = function(){
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");
  menu.classList.remove("hidden");
};

});
