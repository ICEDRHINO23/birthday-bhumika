/* =========================
   🎬 VIDEO LIST
========================= */
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4"
];

let currentVideo = 0;
let player = null;

/* =========================
   ▶ PLAY VIDEO
========================= */
function playVideo(index) {

  if (!player) return;

  currentVideo = index;

  player.src = videos[index];
  player.load();

  player.play().catch(() => {
    console.log("Autoplay blocked");
  });

  updateActiveButton();
}

/* =========================
   🔥 INIT PLAYER
========================= */
document.addEventListener("DOMContentLoaded", () => {

  player = document.getElementById("player");

  if (!player) {
    console.error("❌ Video element not found!");
    return;
  }

  playVideo(0);

  /* AUTO NEXT */
  player.addEventListener("ended", () => {
    currentVideo = (currentVideo + 1) % videos.length;
    playVideo(currentVideo);
  });

});

/* =========================
   🎯 BUTTON HIGHLIGHT
========================= */
function updateActiveButton() {
  document.querySelectorAll(".video-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentVideo);
  });
}

/* =========================
   ⌨️ KEYBOARD CONTROL
========================= */
document.addEventListener("keydown", (e) => {

  if (!player) return;

  if (e.key === "ArrowRight") {
    playVideo((currentVideo + 1) % videos.length);
  }

  if (e.key === "ArrowLeft") {
    playVideo((currentVideo - 1 + videos.length) % videos.length);
  }

});

/* =========================
   🔙 BACK
========================= */
function goBack() {
  window.location.href = "index.html";
}
