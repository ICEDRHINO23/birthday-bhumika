/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");
  const gift = document.getElementById("giftImage");

  const menu = document.getElementById("menu");
  const timerPage = document.getElementById("timerPage");
  const videoPage = document.getElementById("videoPage");
  const book = document.getElementById("book");

  const bigTimer = document.getElementById("bigTimer");

  /* =========================
     INTRO LOADER
  ========================= */
  setTimeout(() => {
    intro.style.display = "none";
  }, 2000);

  /* =========================
     GIFT UNLOCK DELAY
  ========================= */
  let unlocked = false;

  setTimeout(() => {
    unlocked = true;
  }, 3000);

  /* =========================
     GIFT CLICK
  ========================= */
  gift.addEventListener("click", () => {

    if (!unlocked) return;

    gift.src = "./image/gift-open.PNG";
    gift.classList.add("opened");

    setTimeout(() => {
      document.getElementById("giftContainer").style.display = "none";
      menu.classList.remove("hidden");
    }, 1000);
  });

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
      showPage(currentPage);
    }
  };

  /* =========================
     BACK BUTTON
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
     SCRAPBOOK FLIP SYSTEM
  ========================= */
  let currentPage = 0;

  function getPages() {
    return document.querySelectorAll("#pagesContainer .spread");
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

    if (pages[index]) {
      pages[index].classList.add("active");
    }
  }

  /* NEXT PAGE */
  window.nextPage = function () {
    const pages = getPages();

    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage(currentPage);
    }
  };

  /* PREVIOUS PAGE */
  window.prevPage = function () {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  };

});
