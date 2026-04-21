document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pageContent"); // ✅ FIXED ID
  let index = 0;

  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "image", src: "./scrapbook/5.jpg" }
  ];

  const texts = [
    "There are some people who don’t try to become important… yet somehow they just are. You became that without even realizing it.",

    "Our conversations were never planned, never perfect… but they always felt real. And that’s rare.",

    "Some friendships don’t need constant talking… they just stay, quietly strong in the background.",

    "Maybe this was never meant to be loud or obvious… but somewhere in between, it became something that mattered more than expected.",

    "Not everything needs to be said out loud… some things are just understood. And whatever this is, it’s something I truly value. So maybe this isn’t the end… just something waiting ahead."
  ];

  function renderPage() {
    if (!container) return;

    const page = pages[index];
    const isLast = index === pages.length - 1;

    container.innerHTML = `
      <div class="page">
        <div class="front">

          <div class="left">
            ${
              page.type === "video"
              ? `<video src="${page.src}" controls autoplay muted loop></video>`
              : `<img src="${page.src}?v=${Date.now()}" onerror="this.src='./image/bhoomika.jpg'">`
            }
          </div>

          <div class="right">
            ${
              isLast
              ? `<h2>Wait for the real gifts 🎁✨</h2><p>${texts[index]}</p>`
              : `<p>${texts[index]}</p>`
            }
          </div>

        </div>
      </div>
    `;
  }

  window.nextPage = function () {
    if (index < pages.length - 1) {
      index++;
      renderPage();
    }
  };

  window.prevPage = function () {
    if (index > 0) {
      index--;
      renderPage();
    }
  };

  window.goHome = function () {
    window.location.href = "index.html";
  };

  renderPage();

});
