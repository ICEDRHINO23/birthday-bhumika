document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     🎵 MUSIC (SAFE START)
  ========================= */
  function startMusic() {
    if (music && music.paused) {
      music.volume = 0.5;
      music.play().catch(()=>{});
    }
  }

  document.addEventListener("click", startMusic, { once: true });

  /* =========================
     💖 EXPANDED TEXT
  ========================= */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

But slowly… without even realizing,
they become a part of everything.

You became that comfort.
That calm presence that just feels right.`,

`We never planned our conversations.
Nothing was forced, nothing was expected.

Yet every time we spoke,
it felt real.

And that…
means more than words can explain.`,

`Some connections don’t need constant talking.

They just exist…
quietly, naturally, effortlessly.

And honestly,
that’s what makes them so special.`,

`Then came moments like these…

Simple, small, almost ordinary.

But somehow,
they turned into memories.`,

`I still remember that smile…

Not because it was perfect,
but because it was real.

And that kind of happiness…
stays.`,

`Maybe this was never about anything big…

Just real moments
that meant something.`,

`And today isn’t just about a birthday…

It’s about celebrating someone
who made life feel lighter.

💖 Happy Birthday 💖`
  ];

  /* =========================
     📂 MEDIA
  ========================= */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "image", src: "./scrapbook/6.jpg" },
    { type: "image", src: "./scrapbook/7.jpg" }
  ];

  /* =========================
     🧱 CREATE PAGES
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
              ? `<video src="${p.src}" muted loop controls playsinline></video>`
              : `<img src="${p.src}" />`
          }
        </div>

        <div class="right">
          ${ i === pages.length - 1 ? `<h2>For You 💖</h2>` : "" }
          <p class="text"></p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     📖 COVER OPEN
  ========================= */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* =========================
     ➡ NEXT PAGE
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];
      const textEl = page.querySelector(".text");

      /* 🔥 TEXT APPEARS ONLY NOW */
      textEl.innerText = texts[current];

      /* 🔥 THEN FLIP */
      setTimeout(() => {
        page.classList.add("flipped");
      }, 100);

      current++;
    }
  };

  /* =========================
     ⬅ PREVIOUS PAGE
  ========================= */
  window.prevPage = function () {

    if (current > 0) {

      current--;

      const page = allPages[current];
      page.classList.remove("flipped");

      const textEl = page.querySelector(".text");
      textEl.innerText = "";  // reset text
    }
  };

  /* =========================
     🏠 GO HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
