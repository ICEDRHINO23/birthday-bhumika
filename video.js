/* =========================
   🎬 VIDEO LIST
========================= */
const videos = [
  "./videos/video1.mp4",
  "./videos/video2.mp4",
  "./videos/video3.mp4",
  "./videos/video4.mp4"
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

  player.play().catch(err => {
    console.log("Playback blocked:", err);
  });
}

/* =========================
   🔥 INIT PLAYER
========================= */
document.addEventListener("DOMContentLoaded", () => {

  player = document.getElementById("player");

  if (!player) {
    console.error("Video element not found!");
    return;
  }

  /* ▶ LOAD FIRST VIDEO */
  playVideo(0);

  /* ⏭ AUTO NEXT VIDEO */
  player.addEventListener("ended", () => {

    currentVideo++;

    if (currentVideo < videos.length) {
      playVideo(currentVideo);
    } else {
      currentVideo = 0; // 🔁 restart playlist
      playVideo(currentVideo);
    }

  });

});

/* =========================
   ⌨️ KEYBOARD CONTROL
========================= */
document.addEventListener("keydown", (e) => {

  if (!player) return;

  if (e.key === "ArrowRight") {
    currentVideo = (currentVideo + 1) % videos.length;
    playVideo(currentVideo);
  }

  if (e.key === "ArrowLeft") {
    currentVideo =
      (currentVideo - 1 + videos.length) % videos.length;
    playVideo(currentVideo);
  }

});

/* =========================
   🔙 BACK BUTTON
========================= */
function goBack() {
  window.location.href = "index.html";
}
