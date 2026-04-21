document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     GLOBAL ERROR HANDLER
  ========================= */
  window.onerror = function (msg, url, line) {
    console.log("ERROR:", msg, "at line", line);
  };

  /* =========================
     INTRO FIX (NEVER STUCK)
  ========================= */
  const intro = document.getElementById("intro");
  setTimeout(() => {
    if (intro) intro.style.display = "none";
  }, 2000);

  /* =========================
     ELEMENTS (SAFE FETCH)
  ========================= */
  const gift = document.getElementById("giftImage");
  const giftContainer = document.getElementById("giftContainer");
  const bigMessage = document.getElementById("bigMessage");
  const menu = document.getElementById("menu");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  const bookPage = document.getElementById("book");
  const timerPage = document.getElementById("timerPage");
  const videoPage = document.getElementById("videoPage");

  const container = document.getElementById("pagesContainer");

  /* =========================
     ADMIN PANEL
  ========================= */
  if (adminBtn && adminPanel) {
    adminBtn.onclick = () => adminPanel.classList.toggle("open");
  }

  if (loginBtn) {
    loginBtn.onclick = () => {
      if (userInput?.value === "abin" && passInput?.value === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }
    };
  }

  /* =========================
     GIFT SYSTEM
  ========================= */
  let unlocked = false;
  setTimeout(() => unlocked = true, 1500);

  if (gift) {
    gift.onclick = () => {

      if (!unlocked) {
        alert("Wait a moment 😄");
        return;
      }

      gift.src = "image/gift-open.PNG";

      // Music fade
      if (music) {
        music.volume = 0;
        music.play().catch(() => {});
        let v = 0;
        const fade = setInterval(() => {
          v += 0.05;
          music.volume = v;
          if (v >= 1) clearInterval(fade);
        }, 200);
      }

      setTimeout(() => bigMessage?.classList.add("show"), 800);

      setTimeout(() => {
        if (giftContainer) giftContainer.style.display = "none";
        menu?.classList.remove("hidden");
      }, 1800);
    };
  }

  /* =========================
     NAVIGATION
  ========================= */
  window.openPage = (page) => {

    document.getElementById("main").style.display = "none";
    bookPage?.classList.add("hidden");
    timerPage?.classList.add("hidden");
    videoPage?.classList.add("hidden");

    if (page === "book") {
      bookPage?.classList.remove("hidden");
      safeRender();
    }

    if (page === "timer") {
      timerPage?.classList.remove("hidden");
    }

    if (page === "video") {
      const now = new Date();
      const unlock = new Date("May 12, 2026 00:00:00");

      if (now < unlock) {
        alert("🎁 Opens on May 12");
        return;
      }

      videoPage?.classList.remove("hidden");
    }
  };

  window.goBack = () => {
    document.getElementById("main").style.display = "block";
    bookPage?.classList.add("hidden");
    timerPage?.classList.add("hidden");
    videoPage?.classList.add("hidden");
  };

  /* =========================
     SCRAPBOOK (CINEMATIC)
  ========================= */

  const pages = [
    { type: "image", src: "scrapbook/1.jpg" },
    { type: "image", src: "scrapbook/2.jpg" },
    { type: "image", src: "scrapbook/3.jpg" },
    { type: "video", src: "scrapbook/4.mp4" }
  ];

  const texts = [
    "Some people just become important without any announcement…",
    "We didn’t plan this friendship… yet it became something real.",
    "There’s a comfort here that doesn’t need effort or explanation.",
    "Maybe not everything needs words… some things are just felt."
  ];

  let current = 0;

  function renderPage() {

    if (!container) return;

    container.innerHTML = "";

    const page = pages[current];

    const book = document.createElement("div");
    book.className = "flip-book";

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.className = "page left";
    right.className = "page right";

    if (page.type === "video") {
      left.innerHTML = `<video controls src="${page.src}"></video>`;
    } else {
      left.innerHTML = `<img src="${page.src}" alt="img"
        onerror="this.style.border='3px solid red'">`;
    }

    right.innerHTML = `<p>${texts[current]}</p>`;

    book.appendChild(left);
    book.appendChild(right);
    container.appendChild(book);

    setTimeout(() => book.classList.add("flip"), 50);
  }

  function safeRender() {
    try {
      renderPage();
    } catch (e) {
      console.error("Scrapbook error:", e);
    }
  }

  window.nextPage = () => {
    if (current < pages.length - 1) {
      current++;
      safeRender();
    }
  };

  window.prevPage = () => {
    if (current > 0) {
      current--;
      safeRender();
    }
  };

  /* =========================
     TIMER
  ========================= */
  const timer = document.getElementById("bigTimer");

  if (timer) {
    setInterval(() => {
      const target = new Date("May 12, 2026 00:00:00");
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        timer.innerHTML = "🎉 It's Time!";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      timer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
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
