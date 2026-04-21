document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     INTRO LOADER
  =============================== */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 1500);


  /* ===============================
     ELEMENTS
  =============================== */
  const gift = document.getElementById("giftImage");
  const giftContainer = document.getElementById("giftContainer");
  const menu = document.getElementById("menu");
  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");
  const bigMessage = document.getElementById("bigMessage");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");


  /* ===============================
     ADMIN PANEL TOGGLE
  =============================== */
  if (adminBtn && adminPanel) {
    adminBtn.onclick = () => {
      adminPanel.classList.toggle("open");
    };
  }


  /* ===============================
     LOGIN SYSTEM
  =============================== */
  if (loginBtn) {
    loginBtn.onclick = () => {

      const user = userInput.value.trim();
      const pass = passInput.value.trim();

      if (user === "abin" && pass === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }

    };
  }


  /* ===============================
     FUNNY MESSAGE SEQUENCE
  =============================== */
  const funnyMessages = [
    "You really thought it's over after opening the gift? 😂",
    "Patience level = 0 I guess 😏",
    "Wait… good things take time 😌",
    "Okay okay… now you're ready for the real surprise 💫"
  ];


  /* ===============================
     GIFT CLICK (MAIN FLOW)
  =============================== */
  if (gift) {

    gift.onclick = () => {

      console.log("Gift clicked ✅");

      // Open gift image
      gift.src = "image/gift-open.PNG";

      // Play music
      if (music) {
        music.play().catch(() => {});
      }

      // Show emotional message
      if (bigMessage) {
        bigMessage.style.opacity = "1";
      }

      // Move to fun section
      setTimeout(() => {

        if (giftContainer) giftContainer.style.display = "none";

        if (funSection) {
          funSection.classList.remove("hidden");

          let i = 0;
          funText.innerText = funnyMessages[i];

          const interval = setInterval(() => {
            i++;
            if (i < funnyMessages.length) {
              funText.innerText = funnyMessages[i];
            } else {
              clearInterval(interval);
            }
          }, 2000);
        }

      }, 1200);

    };

  } else {
    console.log("❌ giftImage not found");
  }


  /* ===============================
     CONTINUE AFTER FUN
  =============================== */
  window.continueAfterFun = function () {

    if (funSection) funSection.classList.add("hidden");

    if (menu) menu.classList.remove("hidden");

  };


  /* ===============================
     OPEN SCRAPBOOK PAGE (FIXED)
  =============================== */
  window.openScrapbookPage = function () {

    window.location.href = "scrapbook.html"; // ✅ CORRECT FILE

  };

});
