document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENT SAFETY GET
  ========================= */
  const intro = document.getElementById("intro");
  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const gift = document.getElementById("giftImage");
  const menu = document.getElementById("menu");
  const timerPage = document.getElementById("timerPage");
  const videoPage = document.getElementById("videoPage");
  const book = document.getElementById("book");

  const bigTimer = document.getElementById("bigTimer");
  const bigMessage = document.getElementById("bigMessage");

  const music = document.getElementById("bgMusic");
  const heartsContainer = document.getElementById("hearts");

  const typedText = document.getElementById("typedText");
  const surpriseText = document.getElementById("surpriseText");

  /* =========================
     INTRO
  ========================= */
  if (intro) {
    setTimeout(() => {
      intro.style.display = "none";
    }, 2000);
  }

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

      const user = document.getElementById("user").value.trim();
      const pass = document.getElementById("pass").value.trim();

      if (user === "abin" && pass === "1234") {
        alert("Login Success ✅");
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }

    });
  }

  /* =========================
     GIFT SYSTEM
  ========================= */
  let unlocked = false;
  setTimeout(() => unlocked = true, 3000);

  if (gift) {
    gift.addEventListener("click", () => {

      if (!unlocked) return;

      gift.src = "./image/gift-open.PNG";
      gift.classList.add("opened");

      if (music) {
        music.play().catch(() => {});
      }

      setTimeout(() => {
        if (bigMessage) bigMessage.style.opacity = "1";
      }, 1200);

      setTimeout(() => startTyping(), 2000);

      setTimeout(() => {
        const giftContainer = document.getElementById("giftContainer");
        if (giftContainer) giftContainer.style.display = "none";

        if (menu) menu.classList.remove("hidden");
      }, 3000);

    });
  }

  /* =========================
     TYPING EFFECT
  ========================= */
  function startTyping() {

    if (!typedText || !surpriseText) return;

    surpriseText.classList.remove("hidden");

    const text = "You didn’t just become a friend… you became my comfort, my peace, my happiness 💖";

    let i = 0;

    function typing() {
      if (i < text.length) {
        typedText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 40);
      }
    }

    typing();
  }

  /* =========================
     HEARTS
  ========================= */
  function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }

  setInterval(createHeart, 500);

  /* =========================
     TIMER
  ========================= */
  const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

  function isUnlocked() {
    return Date.now() >= unlockDate;
  }

  setInterval(() => {

    if (!bigTimer) return;

    let gap = unlockDate - Date.now();

    if (gap <= 0) {
      bigTimer.innerHTML = "🎉 It's Time! 🎂";
      return;
    }

    let d = Math.floor(gap / (1000 * 60 * 60 * 24));
    let h = Math.floor((gap / (1000 * 60 * 60)) % 24);
    let m = Math.floor((gap / (1000 * 60)) % 60);
    let s = Math.floor((gap / 1000) % 60);

    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

  }, 1000);

  /* =========================
     NAVIGATION
  ========================= */
  window.openPage = function(type) {

    if (menu) menu.classList.add("hidden");
    if (timerPage) timerPage.classList.add("hidden");
    if (videoPage) videoPage.classList.add("hidden");
    if (book) book.classList.add("hidden");

    if (type === "timer" && timerPage) {
      timerPage.classList.remove("hidden");
    }

    if (type === "video" && videoPage) {
      if (!isUnlocked()) {
        alert("🔒 Unlocks on May 12 🎂");
        if (menu) menu.classList.remove("hidden");
        return;
      }
      videoPage.classList.remove("hidden");
    }

    if (type === "book" && book) {
      book.classList.remove("hidden");
      loadScrapbook();
    }
  };

  window.goBack = function() {
    if (timerPage) timerPage.classList.add("hidden");
    if (videoPage) videoPage.classList.add("hidden");
    if (book) book.classList.add("hidden");
    if (menu) menu.classList.remove("hidden");
  };

});

/* =========================
   SCRAPBOOK (GLOBAL FIX)
========================= */
window.loadScrapbook = function () {

  const container = document.getElementById("pagesContainer");

  if (!container) return;

  container.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("scrapbook") || "[]");

  console.log("Scrapbook Data:", data);

  if (data.length === 0) {
    container.innerHTML = "<h3>No memories yet 💔</h3>";
    return;
  }

  data.forEach(item => {

    const page = document.createElement("div");
    page.className = "spread";

    let media = "";

    if (item.type === "image") {
      media = `<img src="${item.src}">`;
    } else {
      media = `<video src="${item.src}" controls></video>`;
    }

    page.innerHTML = `
      <div class="left">${media}</div>
      <div class="right">
        <h2>${item.title}</h2>
        <p>${item.text}</p>
      </div>
    `;

    container.appendChild(page);
  });

  showPage(0);
};

/* =========================
   PAGE NAVIGATION (GLOBAL)
========================= */
let currentPage = 0;

function getPages() {
  return document.querySelectorAll(".spread");
}

window.showPage = function(index) {

  const pages = getPages();

  pages.forEach((p, i) => {
    p.classList.remove("active");

    if (i < index) p.classList.add("flip");
    else p.classList.remove("flip");
  });

  if (pages[index]) pages[index].classList.add("active");

  currentPage = index;
};

window.nextPage = function() {
  const pages = getPages();
  if (currentPage < pages.length - 1) {
    showPage(currentPage + 1);
  }
};

window.prevPage = function() {
  if (currentPage > 0) {
    showPage(currentPage - 1);
  }
};
