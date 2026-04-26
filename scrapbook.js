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
they come quietly,
and become the calmest part of your day.`,

`We never planned anything…
yet every small moment started meaning more.`,

`You don’t say much…
but somehow, you say enough.`,

`Some memories don’t need noise…
just being there is enough.`,

`Not everyone understands silence…
but with you, it feels comfortable.`,

`That smile of yours…
it’s rare, and that’s what makes it special.`,

`I’m really glad you’re in my life…
just for being you.`,

`💖 Happy Birthday 💖

I hope you always find your peace,
your space,
and your quiet happiness.

You matter more than you think.`

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
