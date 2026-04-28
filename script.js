/* =========================
   GLOBAL STATE
========================= */
let taps = 0;
let unlocked = false;
let giftOpen = false;

/* =========================
   ON LOAD
========================= */
window.addEventListener("DOMContentLoaded", () => {

  /* LOADER */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    const main = document.getElementById("main");
    if (intro) intro.style.display = "none";
    if (main) main.classList.remove("hidden");
  }, 2000);

  /* MUSIC (user interaction required) */
  const music = document.getElementById("bgMusic");
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.volume = 0.4;
      music.play().catch(()=>{});
    }
  }, { once: true });

});

/* =========================
   GIFT SYSTEM
========================= */
function openGift() {
  const gift = document.getElementById("giftBox");
  const content = document.getElementById("content");

  if (!gift || !content) return;

  gift.src = "image/gift-open.PNG";

  setTimeout(() => {
    content.classList.remove("hidden");
  }, 800);
}

/* =========================
   NAVIGATION
========================= */
function goMemory() {
  window.location.href = "memories.html";
}

function goAlbum() {
  window.location.href = "scrapbook.html";
}

function goCard() {
  window.location.href = "card.html";
}

function goVideo() {
  window.location.href = "video.html";
}

/* =========================
   CARD INTERACTION
========================= */
function openCard(card) {
  card.classList.toggle("open");
}
/* ⏳ COUNTDOWN TIMER */
window.addEventListener("DOMContentLoaded", () => {

  const unlockDate = new Date("2026-05-12T00:00:00").getTime();
  const countdownEl = document.getElementById("countdown");
  const btn = document.getElementById("videoBtn");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = unlockDate - now;

    if (distance <= 0) {
      countdownEl.innerHTML = "🎉 Unlocked!";
      if (btn) btn.innerText = "Special Video 🎬";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.innerHTML =
      `⏳ Unlocks in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
