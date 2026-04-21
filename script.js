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
  const bigMessage = document.getElementById("bigMessage");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");


  /* ===============================
     ADMIN PANEL
  =============================== */
  if (adminBtn && adminPanel) {
    adminBtn.addEventListener("click", () => {
      adminPanel.classList.toggle("open");
    });
  }


  /* ===============================
     LOGIN
  =============================== */
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      const user = userInput.value.trim();
      const pass = passInput.value.trim();

      if (user === "abin" && pass === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }

    });
  }


  /* ===============================
     🎁 GIFT SYSTEM (MAIN FIX)
  =============================== */
  if (gift) {

    gift.addEventListener("click", () => {

      console.log("Gift clicked ✅");

      // open gift
      gift.src = "image/gift-open.PNG";

      // play music
      if (music) {
        music.play().catch(() => {});
      }

      // show message
      if (bigMessage) {
        bigMessage.style.opacity = "1";
      }

      // show menu
      setTimeout(() => {

        if (giftContainer) giftContainer.style.display = "none";

        if (menu) {
          menu.classList.remove("hidden");
        }

      }, 1500);

    });

  } else {
    console.log("❌ giftImage not found");
  }


  /* ===============================
     ✅ OPEN BOOK (FIXED)
  =============================== */
  window.openBook = function () {
    window.location.href = "book.html";
  };


  /* ===============================
     FLOATING HEARTS
  =============================== */
  setInterval(() => {

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);

  }, 700);

});
