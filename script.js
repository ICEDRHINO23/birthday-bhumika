document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     🔥 LOADING SCREEN (SMOOTH)
  =============================== */
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.transition = "opacity 0.6s ease";
      intro.style.opacity = "0";

      setTimeout(() => {
        intro.style.display = "none";
      }, 600);
    }
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
  const heartbeat = document.getElementById("heartbeat");

  let count = 0;
  let giftOpened = false;


  /* ===============================
     🎵 MUSIC (SAFE AUTOPLAY)
  =============================== */
  function startMusic() {
    if (music && music.paused) {

      music.volume = 0;
      music.play().catch(()=>{});

      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        music.volume = v;

        if (v >= 0.6) clearInterval(fade);
      }, 200);
    }
  }

  document.body.addEventListener("click", startMusic, { once: true });


  /* ===============================
     🎯 TAP GAME
  =============================== */
  if (tapBtn) {
    tapBtn.addEventListener("click", () => {

      count++;

      if (tapCountText) {
        tapCountText.innerText = `Tapped: ${Math.min(count, 5)}/5`;
      }

      if (count === 5) {
        gameBox.style.display = "none";
        giftContainer.style.display = "flex";
      }

    });
  }


  /* ===============================
     🎁 GIFT OPEN (CINEMATIC)
  =============================== */
  if (giftImage) {
    giftImage.addEventListener("click", () => {

      if (giftOpened) return;
      giftOpened = true;

      /* 💓 HEARTBEAT */
      if (heartbeat) {
        heartbeat.currentTime = 0;
        heartbeat.volume = 1;
        heartbeat.play().catch(()=>{});
      }

      /* 🎬 DIM BACKGROUND */
      document.body.style.transition = "filter 0.5s ease";
      document.body.style.filter = "brightness(0.85)";

      /* 🎁 POP */
      giftImage.classList.add("gift-pop");

      setTimeout(() => {
        giftImage.src = "./image/gift-open.PNG";
        createSparkles(giftImage);
      }, 400);

      /* 🎵 LOWER MUSIC */
      if (music) {
        let v = music.volume;

        const reduce = setInterval(() => {
          v -= 0.05;
          music.volume = v;

          if (v <= 0.2) clearInterval(reduce);
        }, 200);
      }

      /* NEXT */
      setTimeout(() => {
        giftContainer.style.display = "none";
        funSection.style.display = "block";

        typeText(funText, getFunnyMessage());
      }, 1300);

    });
  }


  /* ===============================
     ✨ SPARKLES (CENTERED ON GIFT)
  =============================== */
  function createSparkles(target) {

    const rect = target.getBoundingClientRect();

    for (let i = 0; i < 25; i++) {

      const s = document.createElement("div");
      s.className = "sparkle";

      s.style.left = rect.left + rect.width / 2 + "px";
      s.style.top = rect.top + rect.height / 2 + "px";

      document.body.appendChild(s);

      setTimeout(() => s.remove(), 1000);
    }
  }


  /* ===============================
     ✍️ TYPING EFFECT
  =============================== */
  function typeText(element, text) {

    if (!element) return;

    element.innerHTML = "";
    element.classList.add("typing");

    let i = 0;

    const interval = setInterval(() => {

      element.innerHTML += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        element.classList.remove("typing");
      }

    }, 30);
  }


  /* ===============================
     😂 FUN TEXT
  =============================== */
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
     👉 CONTINUE
  =============================== */
  window.continueAfterFun = function () {
    funSection.style.display = "none";
    menu.style.display = "block";

    document.body.style.filter = "brightness(1)";
  };


  /* ===============================
     📖 OPEN SCRAPBOOK
  =============================== */
  window.openScrapbook = function () {

    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "scrapbook.html";
    }, 800);
  };


  /* ===============================
     🎥 LOCKED VIDEO
  =============================== */
  window.openVideo = function () {

    const now = new Date();
    const unlockDate = new Date(2026, 4, 12);

    if (now >= unlockDate) {
      window.location.href = "video.html";
    } else {
      alert("⏳ This video will unlock on Birthday 🎂");
    }
  };

});
