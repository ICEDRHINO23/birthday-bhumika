document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     FIX LOADING SCREEN (NO STUCK)
  =============================== */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 1500);


  /* ===============================
     SCRAPBOOK DATA (YOUR FILES)
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


  /* ===============================
     ELEMENT
  =============================== */
  const container = document.getElementById("pagesContainer");
  let index = 0;


  /* ===============================
     RENDER PAGE (NO BLACK SCREEN)
  =============================== */
  function renderPage() {

    if (!container) return;

    const page = pages[index];

    container.innerHTML = `
      <div class="book">

        <div class="page">

          <div class="left">
            ${
              page.type === "video"
              ? `<video controls autoplay muted loop src="${page.src}"></video>`
              : `<img src="${page.src}" onerror="this.style.display='none'">`
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
     NAVIGATION
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
     3D FLIP EFFECT
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
     INITIAL LOAD
  =============================== */
  renderPage();

});
