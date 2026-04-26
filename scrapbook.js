document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 START MUSIC ON CLICK */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* 💖 TEXT */
const texts = [

`There are some people who don’t just enter our lives…
they slowly become a part of it.

No noise, no warning…
just a quiet presence that starts to mean everything.`,

`We never really planned anything…

No expectations, no big moments—
yet somehow, every small conversation felt special.`,

`It’s strange how some memories don’t need grand reasons.

Just simple days,
random talks,
and genuine smiles…`,

`There were moments we didn’t even realize were important…

but today, they feel priceless.`,

`That smile of yours…
it stayed longer than the moment itself.`,

`Not everything needs a reason,
not everything needs a definition…

some things are just meant to be felt.`,

`And somewhere between all these memories…

you became someone I never want to lose.`,

`💖 Happy Birthday 💖

I don’t know what the future holds,
but I know one thing for sure…

some people are not just memories—
they are feelings that stay forever.`

];

  /* 📂 MEDIA PATH (IMPORTANT FIX) */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "video", src: "./scrapbook/6.mp4" },
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
              ? `<video class="scrapVideo" controls>
                   <source src="${p.src}" type="video/mp4">
                 </video>`
              : `<img src="${p.src}">`
          }
        </div>

        <div class="right">
          ${ i === pages.length - 1 ? `<h2>For You 💖</h2>` : "" }
          <p>${texts[i]}</p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* 📖 OPEN COVER */
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

  /* ⬅ PREVIOUS */
  window.prevPage = function () {
    if (current > 0) {
      current--;
      allPages[current].classList.remove("flipped");
    }
  };

});
window.goHome = function () {
  window.location.href = "index.html";
};
