document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 MUSIC */
  document.addEventListener("click", () => {
    if (music.paused) music.play().catch(()=>{});
  }, { once: true });

  /* 💖 TEXT (ROMANTIC + FRIENDLY) */
const texts = [

`Some people don’t enter your life loudly…

They come quietly,
without trying to be noticed.

And somehow,
they become the most peaceful part of your day.`,

`We never really planned anything…

No big moments, no dramatic stories—
just simple conversations,
small silences,
and a comfort that slowly grew.`,

`You don’t say much,
but somehow, you say enough.

In your quiet way,
you make things feel safe…
and that means more than words ever could.`,

`There were moments we didn’t even realise were important…

just sitting, talking, or even not talking at all—
but now, those moments feel special.`,

`You know what I like the most?

The way you are…
calm, real, and completely yourself.

No pretending, no noise—
just genuine.`,

`That smile of yours…

It’s not loud,
it’s not for everyone—
but when it appears,
it feels… real.`,

`Not everyone understands silence…

but with you,
even silence feels comfortable,
like it doesn’t need to be filled.`,

`💖 Happy Birthday 💖

I hope life always stays kind to you…

I hope you always find your calm,
your space,
and your quiet happiness.

And even if you don’t say much…

just know—
you matter more than you think.`

];

  /* 📸 PAGES */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "image", src: "./scrapbook/5.mp4" },
    { type: "image", src: "./scrapbook/6.mp4" },
    { type: "image", src: "./scrapbook/7.jpg" },
    { type: "image", src: "./scrapbook/8.jpg" }
  ];

  /* CREATE PAGES */
  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            p.type === "video"
            ? `<video controls>
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

  /* ✅ FIX STACK ORDER */
  allPages.forEach((page, i) => {
    page.style.zIndex = 1000 - i;
  });

  /* ✅ COVER CLICK (NO AUTO FLIP) */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* NEXT PAGE */
  window.nextPage = function () {
    if (current < allPages.length) {
      allPages[current].classList.add("flipped");
      current++;

      if (current === allPages.length) {
        setTimeout(showEnding, 800);
      }
    }
  };

  /* PREVIOUS */
  window.prevPage = function () {
    if (current > 0) {
      current--;
      allPages[current].classList.remove("flipped");
    }
  };

});

/* 🎉 END SCREEN */
function showEnding() {

  const end = document.createElement("div");

  end.style.position = "fixed";
  end.style.inset = "0";
  end.style.background = "rgba(0,0,0,0.95)";
  end.style.display = "flex";
  end.style.flexDirection = "column";
  end.style.justifyContent = "center";
  end.style.alignItems = "center";
  end.style.color = "white";
  end.style.textAlign = "center";
  end.style.zIndex = "9999";

  end.innerHTML = `
    <h2 style="font-size:28px;">💖 Happy Birthday 💖</h2>

    <p style="max-width:600px; font-size:18px; line-height:1.8;">
      Some people don’t just come into life…
      they stay, they change everything.
    </p>

    <button onclick="goHome()">Back to Home</button>
  `;

  document.body.appendChild(end);
}

/* HOME */
function goHome() {
  window.location.href = "index.html";
}
