document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = -1; // start before first flip

  /* 🎵 MUSIC (user interaction required) */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* 💖 TEXT CONTENT */
  const texts = [

`Some people don’t enter your life loudly…

They don’t try to stand out,
they don’t try to be noticed—
but somehow, their presence slowly becomes something you start looking forward to.`,

`We never really planned anything…

just simple conversations,
random talks,
and those small moments that didn’t seem important…
but now, they mean everything.`,

`You don’t say much…

and maybe that’s what makes it special.

Silence can speak more honestly than words.`,

`Some memories don’t need noise…

just being there is enough to make them unforgettable.`,

`That smile of yours…

it feels natural,
real,
and it stays in my mind much longer than the moment.`,

`Those quiet moments of excitement…

they’re small,
but they feel more beautiful than anything loud.`,

`I’m really glad you’re in my life…

for all the small moments that became important.`,

`💖 Happy Birthday 💖

You matter more than you think.`

  ];

  /* 📸 MEDIA */
  const media = [
    "scrapbook/1.jpg",
    "scrapbook/2.jpg",
    "scrapbook/3.jpg",
    "scrapbook/4.mp4",
    "scrapbook/5.mp4",
    "scrapbook/6.mp4",
    "scrapbook/7.jpg",
    "scrapbook/8.jpg"
  ];

  /* 📄 CREATE PAGES */
  let pages = [];

  media.forEach((src, i) => {

    const page = document.createElement("div");
    page.className = "page";

    const isVideo = src.endsWith(".mp4");

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            isVideo
            ? `<video muted playsinline preload="auto" loop>
                 <source src="${src}" type="video/mp4">
               </video>`
            : `<img src="${src}">`
          }
        </div>

        <div class="right">
          ${ i === media.length - 1 ? `<h2>For You 💖</h2>` : "" }
          <p>${texts[i]}</p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
    pages.push(page);
  });

  /* ✅ INCLUDE COVER IN FLOW */
  pages.unshift(cover);

  /* ✅ STACK ORDER FIX */
  pages.forEach((p, i) => {
    p.style.zIndex = pages.length - i;
  });

  /* 📖 COVER CLICK */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
    current = 0;
  });

  /* ➡ NEXT PAGE */
  window.nextPage = function () {

    if (current < pages.length - 1) {

      // pause all videos
      document.querySelectorAll("video").forEach(v => v.pause());

      current++;
      pages[current].classList.add("flipped");

      // play next video if exists
      const video = pages[current]?.querySelector("video");

      if (video) {
        video.currentTime = 0;
        video.play().catch(()=>{});
      }

      // END SCREEN
      if (current === pages.length - 1) {
        setTimeout(showEnding, 800);
      }
    }
  };

  /* ⬅ PREVIOUS PAGE */
  window.prevPage = function () {

    if (current >= 0) {

      pages[current].classList.remove("flipped");
      current--;

      const video = pages[current]?.querySelector("video");

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
    <h2>💖 Happy Birthday 💖</h2>
    <p>Some people don’t just come into life… they stay.</p>
    <button onclick="goHome()">Back to Home</button>
  `;

  document.body.appendChild(end);
}

/* 🏠 HOME */
function goHome() {
  window.location.href = "index.html";
}
