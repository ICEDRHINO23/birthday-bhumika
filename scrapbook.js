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

`Some people just walk into your life…
and suddenly, everything feels a little lighter.

Like… even a normal day starts feeling special for no reason.`,

`We never really planned anything…

No “big moments”, no dramatic stories—
just random conversations that somehow became my favorite part of the day.`,

`And honestly…
I still don’t know how it happened 😄

Somewhere between the jokes, the talks, and the silence…
you became important.`,

`You know what’s funny?

The best memories we have…
are probably the ones we didn’t even try to make.`,

`That smile of yours…

It’s dangerous 😌
Because once you see it, it stays in your mind way longer than it should.`,

`There were days that felt ordinary…

but somehow, because you were there,
they turned into something I never want to forget.`,

`I don’t say this often,
but I’m really glad you’re in my life.

Not for any big reason…
just for being you.`,

`💖 Happy Birthday 💖

I hope you always stay the same—
a little crazy, a little sweet,
and completely unforgettable.

And yeah…
keep smiling like that,
it’s kind of unfair for the rest of us 😄`

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
