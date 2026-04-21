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
  const book = document.getElementById("book");
  const bigMessage = document.getElementById("bigMessage");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  const container = document.getElementById("pagesContainer");


  /* ===============================
     ADMIN PANEL TOGGLE
  =============================== */
  if (adminBtn && adminPanel) {
    adminBtn.addEventListener("click", () => {
      adminPanel.classList.toggle("open");
    });
  }


  /* ===============================
     LOGIN SYSTEM
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
     SCRAPBOOK DATA
  =============================== */
  const pages = [
    { type: "image", src: "scrapbook/1.jpg" },
    { type: "image", src: "scrapbook/2.jpg" },
    { type: "image", src: "scrapbook/3.jpg" },
    { type: "image", src: "scrapbook/4.jpg" },
    { type: "video", src: "scrapbook/5.mp4" }
  ];

  const texts = [
    "There are some people who don’t try to become important… yet somehow they just are. You became that without even realizing it.",

    "Our conversations were never planned, never perfect… but they always felt real. And that’s rare in today’s world.",

    "Some friendships don’t need constant talking… they just stay quietly strong, no matter how much time passes.",

    "You are one of those rare people who made ordinary moments feel special without even trying.",

    "Maybe this was never meant to be loud or obvious… but somewhere in between, it became something that truly mattered."
  ];

  let currentPage = 0;


  /* ===============================
     RENDER PAGE
  =============================== */
  function renderPage() {

    if (!container) return;

    const page = pages[currentPage];

    container.innerHTML = `
      <div class="book">
        <div class="page">

          <div class="left">
            ${
              page.type === "video"
              ? `<video controls autoplay muted loop src="${page.src}"></video>`
              : `<img src="${page.src}">`
            }
          </div>

          <div class="right">
            <p>${texts[currentPage]}</p>
          </div>

        </div>
      </div>
    `;
  }


  /* ===============================
     NAVIGATION
  =============================== */
  window.nextPage = function () {
    if (currentPage < pages.length - 1) {
      currentPage++;
      flipAnimation();
      setTimeout(renderPage, 400);
    }
  };

  window.prevPage = function () {
    if (currentPage > 0) {
      currentPage--;
      flipAnimation(true);
      setTimeout(renderPage, 400);
    }
  };


  /* ===============================
     FLIP ANIMATION
  =============================== */
  function flipAnimation(reverse = false) {

    const bookEl = document.querySelector(".book");
    if (!bookEl) return;

    bookEl.style.transform = reverse
      ? "rotateY(-180deg)"
      : "rotateY(180deg)";

    setTimeout(() => {
      bookEl.style.transform = "rotateY(0deg)";
    }, 400);
  }


  /* ===============================
     OPEN SCRAPBOOK
  =============================== */
  window.openScrapbook = function () {

    if (menu) menu.classList.add("hidden");
    if (book) book.classList.remove("hidden");

    renderPage();
  };


  /* ===============================
     GO BACK
  =============================== */
  window.goBack = function () {
    if (book) book.classList.add("hidden");
    if (menu) menu.classList.remove("hidden");
  };


  /* ===============================
     GIFT SYSTEM (MAIN FIX)
  =============================== */
  if (gift) {

    gift.addEventListener("click", () => {

      console.log("Gift clicked ✅");

      // change image
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
