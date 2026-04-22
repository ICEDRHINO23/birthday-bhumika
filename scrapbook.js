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
     💖 EXPANDED STORY TEXT
  ========================= */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

At first, they feel like just another part of the day…
just another conversation, just another moment.

But slowly… without even realizing,
they become a part of everything.

You became that comfort.
That calm presence that just feels right.

And somewhere along the way,
things started feeling better…
just because you were there.`,

`We never planned our conversations.
Nothing was forced, nothing was expected.

Yet every time we spoke,
it felt real.

No pressure, no pretending…
just something simple and honest.

In a world where most things don’t last,
you became something that stayed.

And that…
means more than words can explain.`,

`Some connections don’t need constant talking.
They don’t need daily messages or long explanations.

They just exist…
quietly, naturally, effortlessly.

Strong enough to stay,
even in silence.

And honestly,
that’s what makes this so rare…

and so special.`,

`Then came moments like these…
simple, small, almost ordinary.

Nothing grand, nothing planned.

But somehow,
they turned into memories.

Because it was never about what we did…

it was about how it felt,
being there,
in that moment.`,

`I still remember that smile…

Not because it was perfect,
but because it was real.

That kind of happiness…
it doesn’t fade quickly.

It stays.

Quietly,
somewhere in the heart,
long after the moment is gone.`,

`And maybe that’s what all of this is…

Not something we defined,
not something we tried to explain.

Just a connection…
that happened naturally,
and stayed effortlessly.

No labels needed.
No expectations.

Just something real.`,

`So today isn’t just about a birthday…

It’s about celebrating someone
who unknowingly made life a little lighter,
a little softer,
and a lot more meaningful.

And no matter where life goes from here…

some people always remain special.

Not because of what they did,
but because of how they made us feel.

And you…

you will always be one of those people.

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
     ✍️ TYPE TEXT (STABLE)
  ========================= */
  function typeText(el, text) {
    el.innerHTML = "";
    let i = 0;

    const speed = 18;

    const interval = setInterval(() => {
      el.innerHTML = text.slice(0, i);
      i++;

      if (i > text.length) clearInterval(interval);
    }, speed);
  }

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

      /* render text first */
      typeText(textEl, texts[current]);

      /* then flip */
      setTimeout(() => {
        page.classList.add("flipped");
      }, 120);

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
      textEl.innerHTML = "";
    }
  };

  /* =========================
     🏠 GO HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
