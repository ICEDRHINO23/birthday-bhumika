document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     🔥 LOADING SCREEN
  ========================= */
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      setTimeout(() => intro.style.display = "none", 500);
    }
  }, 1200);

  /* =========================
     ELEMENTS
  ========================= */
  const tapBtn = document.getElementById("tapBtn");
  const tapCountText = document.getElementById("tapCount");

  const gameBox = document.getElementById("gameBox");
  const giftContainer = document.getElementById("giftContainer");
  const giftImage = document.getElementById("giftImage");

  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");

  const menu = document.getElementById("menu");

  const bgMusic = document.getElementById("bgMusic");
  const bdaySong = document.getElementById("bdaySong"); // 🎂 bds.mp3

  let count = 0;

  /* =========================
     🎵 BACKGROUND MUSIC (SAFE)
  ========================= */
  document.body.addEventListener("click", () => {
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0.4;
      bgMusic.play().catch(()=>{});
    }
  }, { once: true });

  /* =========================
     🎯 TAP GAME
  ========================= */
  if (tapBtn) {
    tapBtn.addEventListener("click", () => {

      count++;
      tapCountText.innerText = `Tapped: ${count}/5`;

      if (count >= 5) {

        gameBox.classList.add("hidden");
        giftContainer.classList.remove("hidden");

        /* 🎂 PLAY BIRTHDAY SONG */
        if (bdaySong) {
          bdaySong.currentTime = 0;

          /* 🔥 Fade-in effect */
          bdaySong.volume = 0;
          bdaySong.play().catch(()=>{});

          let v = 0;
          const fade = setInterval(() => {
            v += 0.05;
            bdaySong.volume = v;
            if (v >= 0.8) clearInterval(fade);
          }, 200);
        }
      }
    });
  }

  /* =========================
     🎁 GIFT CLICK
  ========================= */
  if (giftImage) {
    giftImage.addEventListener("click", () => {

      giftImage.src = "./image/gift-open.PNG";

      setTimeout(() => {
        giftContainer.classList.add("hidden");
        funSection.classList.remove("hidden");

        funText.innerText = "Okay okay… now the real surprise 😄";
      }, 800);
    });
  }

  /* =========================
     👉 CONTINUE
  ========================= */
  window.continueAfterFun = function () {

    funSection.classList.add("hidden");
    menu.classList.remove("hidden");

    /* 🔇 STOP BIRTHDAY SONG */
    if (bdaySong) {
      bdaySong.pause();
    }
  };

  /* =========================
     📖 OPEN SCRAPBOOK
  ========================= */
  window.openScrapbook = function () {
    window.location.href = "scrapbook.html";
  };

  /* =========================
     🎥 VIDEO LOCK
  ========================= */
  window.openVideo = function () {
    alert("⏳ This will unlock on Birthday 🎂");
  };

});
