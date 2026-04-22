document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LOADING SCREEN
  =============================== */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 1200);

  /* ===============================
     ELEMENTS
  =============================== */
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

  /* ===============================
     🎵 GLOBAL MUSIC START (FIXED)
  =============================== */
  function startMusic() {
    if (music && music.paused) {

      music.volume = 0;
      music.play().catch(()=>{});

      /* smooth fade-in */
      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        music.volume = v;
        if (v >= 0.6) clearInterval(fade);
      }, 200);
    }
  }

  /* 🔥 START MUSIC ON FIRST CLICK ANYWHERE */
  document.body.addEventListener("click", startMusic, { once: true });

  /* ===============================
     GAME
  =============================== */
  tapBtn.addEventListener("click", () => {

    count++;
    tapCountText.innerText = `Tapped: ${count}/5`;

    if (count >= 5) {
      gameBox.classList.add("hidden");
      giftContainer.classList.remove("hidden");
    }
  });

  /* ===============================
     GIFT
  =============================== */
  giftImage.addEventListener("click", () => {

    giftImage.src = "./image/gift-open.PNG";

    setTimeout(() => {
      giftContainer.classList.add("hidden");
      funSection.classList.remove("hidden");
      funText.innerText = getFunnyMessage();
    }, 800);
  });

  /* ===============================
     FUN
  =============================== */
  window.continueAfterFun = function () {
    funSection.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  function getFunnyMessage() {
    const messages = [
      "You really thought gift will open so easily? 😂",
      "Patience level: zero detected 🤭",
      "Still waiting? Good things take time 😌",
      "Okay okay… now real surprise coming 😄"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  /* ===============================
     NAVIGATION
  =============================== */
  window.openScrapbook = function () {
    window.location.href = "scrapbook.html";
  };

  window.openVideo = function () {
    const now = new Date();
    const unlockDate = new Date(2026, 4, 12, 0, 0, 0); // May 12, 2026

    if (now >= unlockDate) {
      window.location.href = "video.html";
    } else {
      alert("⏳ This video will unlock on Birthday 🎂");
    }
  };

});
