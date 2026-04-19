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
   ADMIN PANEL TOGGLE
========================= */
adminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("open");
});

/* =========================
   LOGIN (FIXED)
========================= */
window.login = function () {

  const user = document.getElementById("user")?.value.trim();
  const pass = document.getElementById("pass")?.value.trim();

  if (!user || !pass) {
    alert("Enter username & password");
    return;
  }

  if (user === "abin" && pass === "1234") {

    alert("Login Success ✅");

    // redirect (ensure file exists)
    window.location.href = "./admin.html";

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
   FLOATING HEARTS
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
   CONFETTI
========================= */
function launchConfetti() {

  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2"];

  for (let i = 0; i < 70; i++) {

    const c = document.createElement("div");
    c.className = "confetti";

    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (Math.random()*2+2)+"s";

    document.body.appendChild(c);

    setTimeout(()=>c.remove(),4000);
  }
}

/* =========================
   ZOOM EFFECT
========================= */
function triggerZoom() {
  const main = document.getElementById("main");
  main.classList.add("zoom");

  setTimeout(()=> main.classList.remove("zoom"),2000);
}

/* =========================
   CURSOR GLOW
========================= */
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e)=>{
  glow.style.left = e.clientX+"px";
  glow.style.top = e.clientY+"px";
});

/* =========================
   GIFT FLOW (FINAL PERFECT)
========================= */
let unlocked = false;

setTimeout(()=> unlocked = true,3000);

gift.addEventListener("click", () => {

  if (!unlocked) return;

  gift.src = "./image/gift-open.PNG";
  gift.classList.add("opened");

  setTimeout(()=>{

    document.getElementById("giftContainer").style.display="none";
    menu.classList.remove("hidden");

    launchConfetti();
    triggerZoom();

    /* BIG MESSAGE */
    setTimeout(()=>{
      bigMessage.classList.add("show");
    },300);

    /* HIDE BIG MESSAGE */
    setTimeout(()=>{
      bigMessage.classList.remove("show");
      bigMessage.classList.add("hide");
    },2800);

    /* TYPING */
    setTimeout(()=>{

      surprise.classList.remove("hidden");

      typeText(
        "You didn’t just become a friend… you became a part of my life that I never want to lose ❤️",
        typed
      );

    },3800);

  },1000);

});

/* =========================
   TYPING
========================= */
function typeText(text, element, speed = 40) {
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
   TIMER
========================= */
const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

setInterval(()=>{

  let gap = unlockDate - Date.now();

  if(gap <= 0){
    bigTimer.innerHTML = "🎉 It's Time!";
    return;
  }

  let d=Math.floor(gap/(1000*60*60*24));
  let h=Math.floor((gap/(1000*60*60))%24);
  let m=Math.floor((gap/(1000*60))%60);
  let s=Math.floor((gap/1000)%60);

  bigTimer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;

},1000);

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

  if(type==="book"){
    book.classList.remove("hidden");
    currentPage = 0;
    loadScrapbook();
  }
};

/* BACK */
window.goBack = function(){
  timerPage.classList.add("hidden");
  videoPage.classList.add("hidden");
  book.classList.add("hidden");
  menu.classList.remove("hidden");
};

/* =========================
   SCRAPBOOK
========================= */
let currentPage = 0;

function getData(){
  return JSON.parse(localStorage.getItem("scrapbook")) || [];
}

function loadScrapbook(){

  const data = getData();
  pagesContainer.innerHTML = "";

  if(data.length === 0){
    pagesContainer.innerHTML = "<p>No memories added yet 💔</p>";
    return;
  }

  data.forEach(item => {

    const div = document.createElement("div");
    div.className = "spread";

    div.innerHTML = `
      <div class="left">
        ${
          item.type==="image"
          ? `<img src="${item.src}">`
          : `<video src="${item.src}" controls></video>`
        }
      </div>
      <div class="right">
        <h2>${item.title}</h2>
        <p>${item.text}</p>
      </div>
    `;

    pagesContainer.appendChild(div);
  });

  showPage(0);
}

function showPage(index){
  const pages = document.querySelectorAll(".spread");

  pages.forEach((p,i)=>{
    p.classList.remove("active");
    if(i===index) p.classList.add("active");
  });
}

window.nextPage = function(){
  const pages = document.querySelectorAll(".spread");
  if(currentPage < pages.length-1){
    currentPage++;
    showPage(currentPage);
  }
};

window.prevPage = function(){
  if(currentPage>0){
    currentPage--;
    showPage(currentPage);
  }
};

});
