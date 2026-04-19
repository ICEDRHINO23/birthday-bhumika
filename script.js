document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const intro = document.getElementById("intro");
  const gift = document.getElementById("giftImage");

  const menu = document.getElementById("menu");
  const timerPage = document.getElementById("timerPage");
  const videoPage = document.getElementById("videoPage");
  const book = document.getElementById("book");

  const bigTimer = document.getElementById("bigTimer");
  const pagesContainer = document.getElementById("pagesContainer");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");

  /* =========================
     INTRO
  ========================= */
  if (intro) {
    setTimeout(() => intro.style.display = "none", 2000);
  }

  /* =========================
     ADMIN SLIDER
  ========================= */
  adminBtn.addEventListener("click", () => {
    adminPanel.classList.toggle("open");
  });

  /* =========================
     LOGIN SYSTEM
  ========================= */
  window.login = function () {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "abin" && pass === "1234") {
      window.location.href = "admin.html";
    } else {
      alert("Wrong credentials ❌");
    }
  };

  /* =========================
     GIFT
  ========================= */
  let unlocked = false;
  setTimeout(() => unlocked = true, 3000);

  if (gift) {
    gift.addEventListener("click", () => {

      if (!unlocked) return;

      gift.src = "./image/gift-open.PNG";
      gift.classList.add("opened");

      setTimeout(() => {
        document.getElementById("giftContainer").style.display = "none";
        menu.classList.remove("hidden");
      }, 1000);
    });
  }

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
      currentPage = 0;
      showPage(currentPage);
    }
  };

  window.goBack = function() {
    timerPage.classList.add("hidden");
    videoPage.classList.add("hidden");
    book.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  /* =========================
     TIMER
  ========================= */
  if (bigTimer) {
    setInterval(() => {
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
  }

  /* =========================
     LOAD DATA
  ========================= */
  const scrapbookData = JSON.parse(localStorage.getItem("scrapbook")) || [];
  const videoData = localStorage.getItem("video");

  /* =========================
     LOAD VIDEO
  ========================= */
  if (videoData && videoPage) {
    videoPage.innerHTML = `
      <h2>Effort Video 🎥</h2>
      <video src="${videoData}" controls autoplay></video>
      <br><button onclick="goBack()">⬅ Back</button>
    `;
  }

  /* =========================
     LOAD SCRAPBOOK
  ========================= */
  function loadScrapbook() {

    if (!pagesContainer) return;

    pagesContainer.innerHTML = "";

    scrapbookData.forEach((item) => {

      const spread = document.createElement("div");
      spread.className = "spread";

      spread.innerHTML = `
        <div class="left">
          ${
            item.type === "image"
              ? `<img src="${item.src}">`
              : `<video src="${item.src}" controls></video>`
          }
        </div>
        <div class="right">
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
      `;

      pagesContainer.appendChild(spread);
    });

    showPage(0);
  }

  /* =========================
     SCRAPBOOK FLIP
  ========================= */
  let currentPage = 0;

  function getPages() {
    return document.querySelectorAll(".spread");
  }

  function showPage(index) {
    const pages = getPages();

    pages.forEach((page, i) => {
      page.classList.remove("active");

      if (i < index) {
        page.classList.add("flip");
      } else {
        page.classList.remove("flip");
      }
    });
  }

  window.nextPage = function () {
    const pages = getPages();
    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage(currentPage);
    }
  };

  window.prevPage = function () {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  };

  /* INIT */
  loadScrapbook();

});
