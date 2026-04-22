document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     🔥 LOADING SCREEN FIX
  =============================== */
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      setTimeout(() => {
        intro.style.display = "none";
      }, 500);
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

  /* ===============================
     🎵 MUSIC (FADE-IN)
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
        tapCountText.innerText = `Tapped: ${count}/5`;
      }

      if (count >= 5) {
        gameBox.style.display = "none";
        giftContainer.style.display = "block";
      }
    });
  }

  /* ===============================
     🎁 GIFT OPEN (PREMIUM)
  =============================== */
  if (giftImage) {
    giftImage.addEventListener("click", () => {

      /* 💓 HEARTBEAT */
      if (heartbeat) {
        heartbeat.currentTime = 0;
        heartbeat.play().catch(()=>{});
      }

      /* 🎁 POP EFFECT */
      giftImage.classList.add("gift-pop");

      setTimeout(() => {
        giftImage.src = "./image/gift-open.PNG";
        createSparkles();
      }, 400);

      setTimeout(() => {
        giftContainer.style.display = "none";
        funSection.style.display = "block";

        typeText(funText, getFunnyMessage());
      }, 1200);

    });
  }

  /* ===============================
     ✨ SPARKLES
  =============================== */
  function createSparkles() {

    for (let i = 0; i < 25; i++) {

      const s = document.createElement("div");
      s.className = "sparkle";

      s.style.left = Math.random() * window.innerWidth + "px";
      s.style.top = (window.innerHeight / 2) + "px";

      document.body.appendChild(s);

      setTimeout(() => s.remove(), 1000);
    }
  }

  /* ===============================
     ✍️ TYPING EFFECT
  =============================== */
  function typeText(element, text) {

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
     😂 FUN MESSAGES
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
  };

  /* ===============================
     📖 OPEN SCRAPBOOK (SMOOTH)
  =============================== */
  window.openScrapbook = function () {

    document.body.style.transition = "opacity 0.8s";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "scrapbook.html";
    }, 800);
  };

  /* ===============================
     🎥 OPEN VIDEO (LOCKED)
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
