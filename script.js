document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");

  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => intro.style.display = "none", 500);
  }, 1200);

  const tapBtn = document.getElementById("tapBtn");
  const tapCountText = document.getElementById("tapCount");

  const gameBox = document.getElementById("gameBox");
  const giftContainer = document.getElementById("giftContainer");
  const giftImage = document.getElementById("giftImage");

  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");

  const menu = document.getElementById("menu");

  const music = document.getElementById("bgMusic");

  let count = 0;

  /* 🎵 MUSIC */
  document.body.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* 🎯 TAP GAME */
  tapBtn.addEventListener("click", () => {

    count++;

    tapCountText.innerText = `Tapped: ${count}/5`;

    if (count >= 5) {
      gameBox.classList.add("hidden");
      giftContainer.classList.remove("hidden");
    }
  });

  /* 🎁 GIFT CLICK */
  giftImage.addEventListener("click", () => {

    giftImage.src = "./image/gift-open.PNG";

    setTimeout(() => {
      giftContainer.classList.add("hidden");
      funSection.classList.remove("hidden");

      funText.innerText = "Okay okay… now the real surprise 😄";
    }, 800);
  });

  /* 👉 CONTINUE */
  window.continueAfterFun = function () {
    funSection.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  /* 📖 SCRAPBOOK */
  window.openScrapbook = function () {
    window.location.href = "scrapbook.html";
  };

  /* 🎥 VIDEO LOCK */
  window.openVideo = function () {
    alert("⏳ Unlocks on birthday 🎂");
  };

});
