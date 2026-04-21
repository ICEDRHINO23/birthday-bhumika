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
     GAME LOGIC
  =============================== */
  tapBtn.addEventListener("click", () => {

    count++;
    tapCountText.innerText = `Tapped: ${count}/5`;

    if (count === 1) music.play();

    if (count >= 5) {
      gameBox.classList.add("hidden");
      giftContainer.classList.remove("hidden");
    }
  });


  /* ===============================
     GIFT CLICK
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
     FUN SECTION
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
     SCRAPBOOK NAVIGATION
  =============================== */
  window.openScrapbook = function () {
    window.location.href = "scrapbook.html";
  };


  /* ===============================
     VIDEO (DATE LOCK)
     ONLY AFTER 12 MAY 2026 12:00 AM
  =============================== */
  window.openVideo = function () {

    const now = new Date();
    const unlockDate = new Date("2026-05-12T00:00:00");

    if (now >= unlockDate) {
      window.location.href = "video.html";
    } else {
      alert("⏳ This video will unlock on Birthday 🎂");
    }
  };


  /* ===============================
     ADMIN PANEL (OPTIONAL)
  =============================== */
  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  adminBtn.addEventListener("click", () => {
    adminPanel.classList.toggle("open");
  });

  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "1234") {
      alert("Login successful");
    } else {
      alert("Invalid credentials");
    }
  });

});
