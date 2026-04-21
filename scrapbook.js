document.addEventListener("DOMContentLoaded", () => {

  let index = 0;

  const pages = [
   const pages = [
  { type: "image", src: "scrapbook/1.jpg" },
  { type: "image", src: "scrapbook/2.jpg" },
  { type: "image", src: "scrapbook/3.jpg" },
  { type: "video", src: "scrapbook/4.mp4" },
  { type: "image", src: "scrapbook/5.jpg" } // ✅ LAST PAGE IMAGE
];
  ];

  const texts = [
    "",
    "Some people don’t enter life loudly… they slowly become important. That’s how this started — quietly, naturally.",
    "Not every friendship gives peace… but this one did. There was always comfort, even without trying.",
    "Some moments don’t feel big then… but later they stay. Small things became meaningful memories.",
    "Some memories don’t fade… they stay quietly within, no matter how time changes things.",
    "Maybe this was never meant to be loud… but it became something meaningful."
  ];

  const container = document.getElementById("pageContent");

  function renderPage() {

    if (!container) return;

    const page = pages[index];

    if (page.type === "cover") {
      container.innerHTML = `
        <div class="page">
          <div class="front cover">
            <h2>🎂 Happy Birthday Bhoomika 🎉</h2>
            <p>Something special just for you 💫</p>
          </div>
        </div>
      `;
      return;
    }

    if (page.type === "end") {
      container.innerHTML = `
        <div class="page">
          <div class="front">
            <div class="left">
              <img src="scrapbook/image.jpg">
            </div>
            <div class="right">
              <p>Wait for the real gifts 🎁✨</p>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        alert("🎁 More surprises are waiting...");
      }, 800);

      return;
    }

    container.innerHTML = `
      <div class="page">
        <div class="front">

          <div class="left">
            ${
              page.type === "video"
              ? `<video src="${page.src}" controls muted></video>`
              : `<img src="${page.src}" onerror="this.src='image/bhoomika.jpg'">`
            }
          </div>

          <div class="right">
            <p>${texts[index]}</p>
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

  /* INITIAL LOAD */
  renderPage();

});
