document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
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
  setTimeout(() => {
    if (intro) intro.style.display = "none";
  }, 2000);

  /* =========================
     ADMIN PANEL
  ========================= */
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      adminPanel.classList.toggle("open");
    });
  }

  /* =========================
     LOGIN SYSTEM (FIXED)
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
     GIFT UNLOCK DELAY
  ========================= */
  let unlocked = false;
  setTimeout(() => unlocked = true, 3000);

  /* =========================
     GIFT CLICK
  ========================= */
  if (gift) {
    gift.addEventListener("click", () => {

      if (!unlocked) return;

      gift.src = "./image/gift-open.PNG";
      gift.classList.add("opened");

      // play music
      if (music) {
        music.play().catch(() => {});
      }

      // show big message
      setTimeout(() => {
        if (bigMessage) bigMessage.style.opacity = "1";
      }, 1200);

      // typing effect
      setTimeout(() => startTyping(), 2000);

      // show menu
      setTimeout(() => {
        document.getElementById("giftContainer").style.display = "none";
        menu.classList.remove("hidden");
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
     FLOATING HEARTS
  ========================= */
  function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }

  setInterval(createHeart, 500);

  /* =========================
     DATE LOCK
  ========================= */
  const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

  function isUnlocked() {
    return Date.now() >= unlockDate;
  }

  /* =========================
     NAVIGATION
  ========================= */
  window.openPage = function(type) {

    menu.classList.add("hidden");
    timerPage.classList.add("hidden");
    videoPage.classList.add("hidden");
    book.classList.add("hidden");

    if (type === "timer") {
      timerPage.classList.remove("hidden");
    }

    if (type === "video") {
      if (!isUnlocked()) {
        alert("🔒 Unlocks on May 12 🎂");
        menu.classList.remove("hidden");
        return;
      }
      videoPage.classList.remove("hidden");
    }

    if (type === "book") {
      book.classList.remove("hidden");
      loadScrapbook();
    }
  };

  /* =========================
     BACK
  ========================= */
  window.goBack = function() {
    timerPage.classList.add("hidden");
    videoPage.classList.add("hidden");
    book.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  /* =========================
     TIMER
  ========================= */
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
     SCRAPBOOK LOAD (FIXED)
  ========================= */
  function loadScrapbook() {

    const container = document.getElementById("pagesContainer");
    if (!container) return;

    container.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("scrapbook") || "[]");

    if (data.length === 0) {
      container.innerHTML = "<p>No memories yet 💔</p>";
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
  }

  /* =========================
     PAGE NAVIGATION
  ========================= */
  let currentPage = 0;

  function getPages() {
    return document.querySelectorAll(".spread");
  }

  function showPage(index) {

    const pages = getPages();

    pages.forEach((p, i) => {
      p.classList.remove("active");

      if (i < index) p.classList.add("flip");
      else p.classList.remove("flip");
    });

    if (pages[index]) pages[index].classList.add("active");

    currentPage = index;
  }

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

});
