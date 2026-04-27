/* =========================
   GLOBAL STATE
========================= */
let taps = 0;
let unlocked = false;
let giftOpen = false;

/* =========================
   ON LOAD (SAFE)
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

  /* TAP GAME (SAFE INIT) */
  const tapBtn = document.getElementById("tapBtn");
  const tapCount = document.getElementById("tapCount");
  const giftContainer = document.getElementById("giftContainer");

  if (tapBtn && tapCount && giftContainer) {
    tapBtn.onclick = () => {

      if (unlocked) return;

      taps++;

      if (taps >= 5) {
        taps = 5;
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

  /* VIDEO LOCK */
  const unlockDate = new Date("2026-05-12T00:00:00");
  const now = new Date();

  if (now < unlockDate) {
    const btn = document.getElementById("videoBtn");
    if (btn) {
      btn.style.opacity = "0.6";
      btn.innerText = "🔒 Unlocks on 12 May 2026";
    }
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

function openCakePage() {
  window.location.href = "cake.html";
}

/* =========================
   VIDEO SYSTEM
========================= */
function openVideo() {

  const unlockDate = new Date("2026-05-12T00:00:00");
  const now = new Date();

  if (now < unlockDate) {
    alert("⏳ Unlocks on 12 May 2026 💖");
    return;
  }

  document.getElementById("menu")?.classList.add("hidden");
  document.getElementById("videoSection")?.classList.remove("hidden");

  const video = document.getElementById("specialVideo");
  const music = document.getElementById("bgMusic");

  if (music) music.pause();

  if (video) {
    video.currentTime = 0;
    video.play().catch(()=>{});
  }
}

function closeVideo() {
  const video = document.getElementById("specialVideo");
  const music = document.getElementById("bgMusic");

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  document.getElementById("videoSection")?.classList.add("hidden");
  document.getElementById("menu")?.classList.remove("hidden");

  if (music) music.play().catch(()=>{});
}

/* =========================
   CAKE SYSTEM (SAFE)
========================= */
function enableCakeSystem() {

  let lit = 0;

  document.querySelectorAll(".candle").forEach(c => {
    c.onclick = () => {

      if (c.classList.contains("lit")) return;

      c.classList.add("lit");
      lit++;

      if (lit === 3) {
        const msg = document.getElementById("cakeMsg");
        if (msg) msg.innerText = "✨ Now cut the cake 🎂";

        const cake = document.querySelector(".cake");

        if (cake) {
          cake.onclick = () => {
            cake.classList.add("cut");

            setTimeout(() => {
              document.querySelector(".card")?.classList.add("open");
            }, 1000);
          };
        }
      }
    };
  });
}
