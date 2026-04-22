document.addEventListener("DOMContentLoaded", () => {

  try {

    const intro = document.getElementById("intro");
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

    /* 🔥 REMOVE LOADING ALWAYS */
    setTimeout(() => {
      if (intro) intro.style.display = "none";
    }, 1200);

    /* 🎵 MUSIC */
    document.body.addEventListener("click", () => {
      if (music && music.paused) {
        music.play().catch(()=>{});
      }
    }, { once: true });

    /* 🎯 TAP GAME */
    if (tapBtn) {
      tapBtn.addEventListener("click", () => {

        count++;
        tapCountText.innerText = `Tapped: ${count}/5`;

        if (count >= 5) {
          gameBox.style.display = "none";
          giftContainer.style.display = "block";
        }
      });
    }

    /* 🎁 GIFT CLICK */
    if (giftImage) {
      giftImage.addEventListener("click", () => {

        giftImage.src = "./image/gift-open.PNG";

        setTimeout(() => {
          giftContainer.style.display = "none";
          funSection.style.display = "block";
          funText.innerText = "Okay okay… now real surprise 😄";
        }, 800);
      });
    }

    /* 👉 CONTINUE */
    window.continueAfterFun = function () {
      funSection.style.display = "none";
      menu.style.display = "block";
    };

    /* 📖 OPEN SCRAPBOOK */
    window.openScrapbook = function () {
      window.location.href = "scrapbook.html";
    };

    /* 🎥 VIDEO LOCK */
    window.openVideo = function () {
      alert("⏳ This will unlock on Birthday 🎂");
    };

  } catch (e) {

    console.error("Script error:", e);

    /* 🔥 FAILSAFE */
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }

});
