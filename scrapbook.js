document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 MUSIC START ON CLICK */
  document.addEventListener("click", () => {
    if (music.paused) music.play().catch(()=>{});
  }, { once: true });

  /* 💖 TEXT (INTROVERT STYLE) */
const texts = [

`Some people don’t enter your life loudly…

They don’t try to stand out,
they don’t try to be noticed—
but somehow, their presence slowly becomes something you start looking forward to.

And before you even realise it,
they become the calmest, safest part of your day.`,

`We never really planned anything…

There were no big moments,
no dramatic stories to tell—
just simple conversations,
random talks,
and those small moments that didn’t seem important at the time…

but now, they mean everything.`,

`You don’t say much…

and maybe that’s what makes it special.

Because in a world where everyone is trying to be heard,
you remind me that silence can also speak—
and sometimes, it speaks more honestly than words ever could.`,

`Some memories don’t need noise…

They don’t need excitement or attention—
just being there,
sharing that quiet space,
is already enough to make them unforgettable.`,

/* 🎥 PAGE 5 — INNOCENT SMILE (EXPANDED) */
`That smile of yours…

It’s not something you show all the time,
and maybe that’s why it feels so real when it appears.

There’s no effort in it,
no need to impress anyone—
it just happens, naturally,
like a small moment of happiness finding its way out.

And somehow,
it carries a kind of innocence that’s rare to see.

The kind of smile that doesn’t try to be perfect,
but still feels perfect in its own way.

And the truth is…
it stays in my mind much longer than the moment it came from.`,

/* 🎥 PAGE 6 — EXCITEMENT (EXPANDED) */
`And then there are those moments
when you get excited…

Not in a loud or overwhelming way,
but in your own quiet, subtle way.

It’s not something everyone would notice—
but if you really pay attention,
you can see it.

That small change in your expression,
those little sparks in your eyes,
that gentle happiness that doesn’t need words.

It’s almost like your excitement speaks softly,
but clearly enough for someone who cares to understand.

And honestly,
those small, genuine moments…
feel more beautiful than anything loud or exaggerated.`,

`I don’t always say this…

but I’m really glad you’re in my life.

Not because of big reasons,
not because of anything dramatic—
but because of all those small, quiet moments
that slowly became important without even asking for attention.`,

`💖 Happy Birthday 💖

I hope life always stays kind to you…

I hope you always find your calm,
your space,
and the kind of happiness that feels peaceful and real.

And even if you don’t say much,
even if you don’t always show everything you feel…

just know—
you matter more than you think,
and you always will.`

];

  /* 📸 MEDIA */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "video", src: "./scrapbook/6.mp4" },
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
            ? `
              <video class="scrap-video" muted playsinline controls preload="auto">
                <source src="${p.src}" type="video/mp4">
              </video>
            `
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

  /* ✅ STACK ORDER FIX */
  allPages.forEach((page, i) => {
    page.style.zIndex = 1000 - i;
  });

  /* ✅ COVER CLICK */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* ▶ NEXT PAGE */
  window.nextPage = function () {

    if (current < allPages.length) {

      /* ⏸ pause all videos */
      document.querySelectorAll("video").forEach(v => v.pause());

      allPages[current].classList.add("flipped");
      current++;

      /* ▶ play current video if exists */
      const video = allPages[current]?.querySelector("video");

      if (video) {
        video.load();
        video.play().catch(()=>{});
      }

      /* 🎉 END */
      if (current === allPages.length) {
        setTimeout(showEnding, 800);
      }
    }
  };

  /* ◀ PREVIOUS */
  window.prevPage = function () {

    if (current > 0) {

      current--;
      allPages[current].classList.remove("flipped");

      /* ▶ play video again if exists */
      const video = allPages[current]?.querySelector("video");

      if (video) {
        video.play().catch(()=>{});
      }
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
