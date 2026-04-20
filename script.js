document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const gift = document.getElementById("giftImage");
  const giftContainer = document.getElementById("giftContainer");

  const bigMessage = document.getElementById("bigMessage");
  const menu = document.getElementById("menu");

  const videoPage = document.getElementById("videoPage");
  const book = document.getElementById("book");

  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  const bigTimer = document.getElementById("bigTimer");

  /* =========================
     INTRO REMOVE
  ========================= */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 2000);

  /* =========================
     ADMIN PANEL
  ========================= */
  if (adminBtn && adminPanel) {
    adminBtn.addEventListener("click", () => {
      adminPanel.classList.toggle("open");
    });
  }

  /* =========================
     LOGIN
  ========================= */
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      const u = userInput?.value.trim();
      const p = passInput?.value.trim();

      if (u === "abin" && p === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }

    });
  }

  /* =========================
     TIMER (ALWAYS ON HOME)
  ========================= */
  const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

  setInterval(() => {

    if (!bigTimer) return;

    const now = new Date().getTime();
    const gap = unlockDate - now;

    if (gap <= 0) {
      bigTimer.innerHTML = "🎉 It's Time 🎂";
      return;
    }

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const m = Math.floor((gap / (1000 * 60)) % 60);
    const s = Math.floor((gap / 1000) % 60);

    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

  }, 1000);

  /* =========================
     GIFT SYSTEM
  ========================= */
  let unlocked = false;

  setTimeout(() => {
    unlocked = true;
  }, 2000);

  if (gift) {
    gift.addEventListener("click", () => {

      if (!unlocked) {
        alert("Wait a second 😄");
        return;
      }

      /* CHANGE IMAGE */
      gift.src = "./image/gift-open.PNG";

      /* MUSIC */
      if (music) {
        music.volume = 0;
        music.play().catch(() => {});

        let v = 0;
        let fade = setInterval(() => {
          v += 0.05;
          music.volume = v;
          if (v >= 1) clearInterval(fade);
        }, 200);
      }

      /* BIG MESSAGE */
      if (bigMessage) {
        setTimeout(() => {
          bigMessage.classList.add("show");
        }, 1000);
      }

      /* SHOW MENU */
      setTimeout(() => {
        if (giftContainer) giftContainer.style.display = "none";
        if (menu) menu.classList.remove("hidden");
      }, 2500);

    });
  }

  /* =========================
     HEARTS
  ========================= */
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "💖";
    h.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(h);

    setTimeout(() => h.remove(), 4000);
  }, 600);

});


/* =========================
   GLOBAL FUNCTIONS (IMPORTANT)
========================= */

window.openPage = function(type) {

  const menu = document.getElementById("menu");
  const videoPage = document.getElementById("videoPage");
  const book = document.getElementById("book");

  if (menu) menu.classList.add("hidden");
  if (videoPage) videoPage.classList.add("hidden");
  if (book) book.classList.add("hidden");

  if (type === "video") {
    videoPage.classList.remove("hidden");
  }

  if (type === "book") {
    book.classList.remove("hidden");
    loadScrapbook(); // 🔥 must exist later
  }
};

window.goBack = function() {
  document.getElementById("videoPage")?.classList.add("hidden");
  document.getElementById("book")?.classList.add("hidden");
  document.getElementById("menu")?.classList.remove("hidden");
};
