document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     INTRO LOADER FIX
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
  const scrapbookSection = document.getElementById("pagesContainer");
  const bigMessage = document.getElementById("bigMessage");
  const music = document.getElementById("bgMusic");


  /* ===============================
     SCRAPBOOK DATA
  =============================== */
  const pages = [
    { type: "image", src: "scrapbook/1.jpg" },
    { type: "image", src: "scrapbook/2.jpg" },
    { type: "image", src: "scrapbook/3.jpg" },
    { type: "video", src: "scrapbook/4.mp4" }
  ];

  const texts = [
    "There are some people who don’t try to become important… yet somehow they just are. You became that without even realizing it.",

    "Our conversations were never planned, never perfect… but they always felt real. And that’s rare.",

    "Some friendships don’t need constant talking… they just stay, quietly strong in the background.",

    "Maybe this was never meant to be loud or obvious… but somewhere in between, it became something that mattered more than expected."
  ];

  let index = 0;


  /* ===============================
     RENDER PAGE
  =============================== */
  function renderPage() {

    if (!scrapbookSection) return;

    const page = pages[index];

    scrapbookSection.innerHTML = `
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
            <p>${texts[index]}</p>
          </div>

        </div>
      </div>
    `;
  }


  /* ===============================
     PAGE NAVIGATION
  =============================== */
  window.nextPage = function () {
    if (index < pages.length - 1) {
      index++;
      flipAnimation();
      setTimeout(renderPage, 400);
    }
  };

  window.prevPage = function () {
    if (index > 0) {
      index--;
      flipAnimation(true);
      setTimeout(renderPage, 400);
    }
  };


  /* ===============================
     FLIP ANIMATION
  =============================== */
  function flipAnimation(reverse = false) {
    const book = document.querySelector(".book");
    if (!book) return;

    book.style.transform = reverse
      ? "rotateY(-180deg)"
      : "rotateY(180deg)";

    setTimeout(() => {
      book.style.transform = "rotateY(0deg)";
    }, 400);
  }


  /* ===============================
     GIFT CLICK (MAIN FIX 🔥)
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
        bigMessage.classList.add("show");
      }

      // move to scrapbook
      setTimeout(() => {

        if (giftContainer) giftContainer.style.display = "none";

        if (menu) {
          menu.classList.remove("hidden");
          menu.style.display = "block";
        }

        if (scrapbookSection) {
          scrapbookSection.style.display = "flex";
          renderPage(); // 🔥 LOAD SCRAPBOOK AFTER GIFT
        }

      }, 1200);

    });

  } else {
    console.log("❌ giftImage not found");
  }

});
