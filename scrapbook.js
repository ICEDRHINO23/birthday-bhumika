document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     MUSIC (USER CLICK FIX)
  ========================= */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.volume = 0.6;
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* =========================
     DATA
  ========================= */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "video", src: "./scrapbook/6.mp4" },
    { type: "image", src: "./scrapbook/7.jpg" }
  ];

  const texts = [
    "You came quietly… but became everything.",
    "Our random talks became my favorite moments.",
    "Some bonds don’t need effort… they just exist.",
    "This day… it started feeling special because of you.",
    "That smile… I still remember it clearly.",
    "It was never about the gift… it was you.",
    "Whatever this is… I truly value it 💖"
  ];

  /* =========================
     CREATE PAGES
  ========================= */
  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";
    page.style.zIndex = pages.length - i;

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            p.type === "video"
              ? `<video src="${p.src}" muted loop controls></video>`
              : `<img src="${p.src}">`
          }
        </div>

        <div class="right">
          <p>${texts[i]}</p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     COVER
  ========================= */
  cover.addEventListener("click", () => {

    cover.classList.add("flipped");

    setTimeout(() => {
      cover.style.zIndex = "0";
      cover.style.pointerEvents = "none";
    }, 900);
  });

  /* =========================
     NEXT
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];
      page.classList.add("flipped");

      const video = page.querySelector("video");
      if (video) video.play().catch(()=>{});

      current++;
    }
  };

  /* =========================
     PREV
  ========================= */
  window.prevPage = function () {

    if (current > 0) {

      current--;

      const page = allPages[current];
      page.classList.remove("flipped");

      const video = page.querySelector("video");
      if (video) video.pause();

    } else {

      cover.classList.remove("flipped");

      setTimeout(() => {
        cover.style.zIndex = "9999";
        cover.style.pointerEvents = "auto";
      }, 300);
    }
  };

  /* =========================
     HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
