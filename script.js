let taps = 0;
let unlocked = false;
let giftOpen = false;

window.onload = () => {

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2000);

  const music = document.getElementById("bgMusic");

  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.volume = 0.4;
      music.play().catch(()=>{});
    }
  }, { once: true });
};

/* TAP GAME */
const tapBtn = document.getElementById("tapBtn");
const tapCount = document.getElementById("tapCount");
const giftContainer = document.getElementById("giftContainer");

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

/* GIFT TOGGLE */
const giftImage = document.getElementById("giftImage");

giftImage.onclick = () => {

  if (!giftOpen) {
    giftImage.src = "./image/gift-open.PNG";
    document.getElementById("menu").classList.remove("hidden");
    giftOpen = true;
  } else {
    giftImage.src = "./image/gift-closed.PNG";
    document.getElementById("menu").classList.add("hidden");
    giftOpen = false;
  }
};

/* NAVIGATION */
function openScrapbook() {
  window.location.href = "scrapbook.html";
}

function openMemories() {
  window.location.href = "memories.html";
}

/* VIDEO */
function openVideo() {

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("videoSection").classList.remove("hidden");

  const video = document.getElementById("specialVideo");
  const music = document.getElementById("bgMusic");

  if (music) music.pause();

  video.currentTime = 0;
  video.play().catch(()=>{});
}

function closeVideo() {

  const video = document.getElementById("specialVideo");
  const music = document.getElementById("bgMusic");

  video.pause();
  video.currentTime = 0;

  document.getElementById("videoSection").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");

  if (music) music.play().catch(()=>{});
}
