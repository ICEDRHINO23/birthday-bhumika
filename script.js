/* =========================
   INITIAL LOAD
========================= */
let taps = 0;

window.onload = () => {

  /* LOADING SCREEN */
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2000);

  /* TRY PLAY MUSIC (SAFE) */
  const music = document.getElementById("bgMusic");

  document.addEventListener("click", () => {
    if (music.paused) {
      music.volume = 0.4;
      music.play().catch(()=>{});
    }
  }, { once: true });
};

/* =========================
   TAP GAME
========================= */
const tapBtn = document.getElementById("tapBtn");
const tapCount = document.getElementById("tapCount");
const gift = document.getElementById("giftContainer");

tapBtn.onclick = () => {
  taps++;
  tapCount.innerText = `Taps: ${taps}`;

  if (taps >= 5) {
    gift.classList.remove("hidden");
  }
};

/* =========================
   GIFT CLICK → OPEN MENU
========================= */
const giftImage = document.getElementById("giftImage");

giftImage.onclick = () => {
  giftImage.src = "./assets/images/gift-open.PNG"; // optional
  document.getElementById("menu").classList.remove("hidden");
};

/* =========================
   NAVIGATION
========================= */
function openScrapbook() {
  window.location.href = "scrapbook.html";
}

function openMemories() {
  window.location.href = "memories.html";
}

/* =========================
   SPECIAL VIDEO
========================= */
function openVideo() {

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("videoSection").classList.remove("hidden");

  const video = document.getElementById("specialVideo");

  /* STOP OTHER AUDIO */
  const music = document.getElementById("bgMusic");
  if (music) music.pause();

  video.currentTime = 0;
  video.play().catch(()=>{});
}

function closeVideo() {

  const video = document.getElementById("specialVideo");

  video.pause();
  video.currentTime = 0;

  document.getElementById("videoSection").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");

  /* RESUME MUSIC */
  const music = document.getElementById("bgMusic");
  if (music) music.play().catch(()=>{});
}
