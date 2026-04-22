document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 MUSIC */
  function startMusic() {
    if (music && music.paused) {
      music.volume = 0.5;
      music.play().catch(()=>{});
    }
  }

  document.addEventListener("click", startMusic, { once: true });

  /* 💖 TEXT */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

But slowly… they become everything.

You became that comfort.`,

`We never planned anything…
but it always felt real.

And that made it special.`,

`Some connections don’t need effort.

They just stay…
naturally.`,

`Moments like these…
simple, but unforgettable.`,

`Your smile…
that’s what stayed.`,

`Maybe it was never about anything big…

Just real moments.`,

`💖 Happy Birthday 💖`
  ];

  /* 📂 MEDIA */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "image", src: "./scrapbook/6.jpg" },
    { type: "image", src: "./scrapbook/7.jpg" }
  ];

  /* 🧱 CREATE PAGES */
  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";
    page.style.zIndex = pages.length - i;

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            p.type === "video"
              ? `<video src="${p.src}" muted loop controls playsinline></video>`
              : `<img src="${p.src}" />`
          }
        </div>

        <div class="right">
          ${ i === pages.length - 1 ? `<h2>For You 💖</h2>` : "" }
          <p class="text">${texts[i]}</p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* 📖 COVER */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* ➡ NEXT */
  window.nextPage = function () {
    if (current < allPages.length) {
      allPages[current].classList.add("flipped");
      current++;
    }
  };

  /* ⬅ PREV */
  window.prevPage = function () {
    if (current > 0) {
      current--;
      allPages[current].classList.remove("flipped");
    }
  };

  /* 🏠 HOME */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
