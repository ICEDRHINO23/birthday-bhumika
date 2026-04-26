document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");
  const tapBtn = document.getElementById("tapBtn");
  const tapCount = document.getElementById("tapCount");
  const gameBox = document.getElementById("gameBox");

  const giftContainer = document.getElementById("giftContainer");
  const giftImage = document.getElementById("giftImage");

  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");

  const menu = document.getElementById("menu");
  const music = document.getElementById("bgMusic");

  let taps = 0;

  /* =========================
     LOADING SCREEN
  ========================= */
  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => intro.style.display = "none", 500);
  }, 1500);

  /* =========================
     MUSIC START
  ========================= */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* =========================
     TAP GAME
  ========================= */
  tapBtn.addEventListener("click", () => {

    taps++;
    tapCount.innerText = `Taps: ${taps}/5`;

    if (taps >= 5) {
      gameBox.classList.add("hidden");
      giftContainer.classList.remove("hidden");
    }

  });

  /* =========================
     GIFT CLICK
  ========================= */
  giftImage.addEventListener("click", () => {

    giftImage.src = "./image/gift-open.PNG";

    setTimeout(() => {
      giftContainer.classList.add("hidden");
      funSection.classList.remove("hidden");
      startFunText();
    }, 1000);

  });

  /* =========================
     FUN TEXT TYPEWRITER
  ========================= */
  const messages = [
    "You really thought it was that easy? 😂",
    "Wait… patience 😌",
    "Good things take time 💖",
    "Okay okay… now enjoy 🎉"
  ];

  let msgIndex = 0;

  function startFunText() {

    funText.innerText = "";
    let i = 0;
    const text = messages[msgIndex];

    const interval = setInterval(() => {

      funText.innerText += text[i];
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }

    }, 40);

  }

  /* =========================
     CONTINUE AFTER FUN
  ========================= */
  window.continueAfterFun = function () {

    msgIndex++;

    if (msgIndex < messages.length) {
      startFunText();
    } else {
      funSection.classList.add("hidden");
      menu.classList.remove("hidden");
    }

  };

});

/* =========================
   PAGE NAVIGATION
========================= */
function goToPage(page) {
  document.body.style.transition = "opacity 0.3s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = page;
  }, 300);
}
