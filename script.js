document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
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
      if (userInput.value === "abin" && passInput.value === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }
    };
  }

  /* =========================
     GIFT OPEN
  ========================= */
  let unlocked = false;

  setTimeout(() => unlocked = true, 2000);

  if (gift) {
    gift.onclick = () => {

      if (!unlocked) {
        alert("Wait a moment 😄");
        return;
      }

      gift.src = "image/gift-open.PNG";

      // Music fade in
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

      // Message
      setTimeout(() => {
        bigMessage.classList.add("show");
      }, 800);

      // Show menu
      setTimeout(() => {
        giftContainer.style.display = "none";
        menu.classList.remove("hidden");
      }, 2000);
    };
  }

  /* =========================
     NAVIGATION
  ========================= */
  window.openPage = (page) => {

    document.getElementById("main").style.display = "none";
    bookPage.classList.add("hidden");
    timerPage.classList.add("hidden");
    videoPage.classList.add("hidden");

    if (page === "book") {
      bookPage.classList.remove("hidden");
      renderPage();
    }

    if (page === "timer") {
      timerPage.classList.remove("hidden");
    }

    if (page === "video") {

      const now = new Date();
      const unlockDate = new Date("May 12, 2026 00:00:00");

      if (now < unlockDate) {
        alert("This video unlocks on 12 May 🎂");
        return;
      }

      videoPage.classList.remove("hidden");
    }
  };

  window.goBack = () => {
    document.getElementById("main").style.display = "block";
    bookPage.classList.add("hidden");
    timerPage.classList.add("hidden");
    videoPage.classList.add("hidden");
  };

  /* =========================
     SCRAPBOOK (FINAL)
  ========================= */

  const pagesData = [
    {
      type: "image",
      src: "scrapbook/20240429_230322.jpg"
    },
    {
      type: "image",
      src: "scrapbook/20240906_204953.jpg"
    },
    {
      type: "image",
      src: "scrapbook/image.jpg"
    },
    {
      type: "video",
      src: "scrapbook/bhumika.mp4"
    }
  ];

  const texts = [
    "Some people just become important without any announcement… you are one of them.",
    "We didn’t plan this friendship, but somehow it became something I value a lot.",
    "It’s rare to find someone who feels easy to talk to… and even easier to miss.",
    "Maybe it’s not about what we say… but what we never had to say."
  ];

  let currentPage = 0;

  function renderPage() {

    if (!container) return;

    container.innerHTML = "";

    const page = pagesData[currentPage];

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.className = "page left";
    right.className = "page right";

    if (page.type === "video") {
      left.innerHTML = `<video controls src="${page.src}"></video>`;
    } else {
      left.innerHTML = `<img src="${page.src}" alt="memory">`;
    }

    right.innerHTML = `<p>${texts[currentPage]}</p>`;

    container.appendChild(left);
    container.appendChild(right);
  }

  window.nextPage = () => {
    if (currentPage < pagesData.length - 1) {
      currentPage++;
      renderPage();
    }
  };

  window.prevPage = () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
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
     HEART ANIMATION
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
