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

  /* LOADING */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 2000);

  /* MUSIC */
  const music = document.getElementById("bgMusic");

  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.volume = 0.4;
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* TAP GAME */
  const tapBtn = document.getElementById("tapBtn");
  const tapCount = document.getElementById("tapCount");
  const giftContainer = document.getElementById("giftContainer");

  if (tapBtn && tapCount && giftContainer) {
    tapBtn.onclick = () => {

      if (unlocked) return;

      taps++;

      if (taps >= 5) {
        unlocked = true;
        tapCount.innerText = "Unlocked 🎉";
        giftContainer.classList.remove("hidden");
      } else {
        tapCount.innerText = `Taps: ${taps}`;
      }
    };
  }

  /* GIFT SYSTEM */
  const giftImage = document.getElementById("giftImage");

  if (giftImage) {
    giftImage.onclick = () => {

      if (!giftOpen) {
        giftImage.src = "image/gift-open.PNG";
        document.getElementById("menu")?.classList.remove("hidden");
        giftOpen = true;
      } else {
        giftImage.src = "image/gift-closed.PNG";
        document.getElementById("menu")?.classList.add("hidden");
        giftOpen = false;
      }
    };
  }

});

/* =========================
   NAVIGATION
========================= */
function openScrapbook() {
  window.location.href = "scrapbook.html";
}

function openMemories() {
  window.location.href = "memories.html";
}

function openCard() {
  window.location.href = "card.html";
}

function openVideo() {
  window.location.href = "video.html";
}
