document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     🎵 MUSIC START
  ========================= */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* =========================
     💖 TEXT
  ========================= */
  const texts = [
`There are people who enter our life quietly…
without any noise, without any announcement.

At first, they feel like just another moment,
but slowly… they become everything.`,

`We never planned anything…

Yet every time we spoke,
it felt real.`,

`Some connections don’t need effort.

They just exist…
quietly, naturally.`,

`Moments like these…
simple but unforgettable.`,

`That smile…
still stays.`,

`No expectations…
just something real.`,

`💖 Happy Birthday 💖`
  ];

  /* =========================
     📂 MEDIA (FIXED PATHS)
  ========================= */
  const pages = [
    { type: "image", src: "./1.jpg" },
    { type: "image", src: "./2.jpg" },
    { type: "image", src: "./3.jpg" },
    { type: "video", src: "./4.mp4" },
    { type: "video", src: "./5.mp4" },
    { type: "video", src: "./6.mp4" },
    { type: "image", src: "./7.jpg" }
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
              ? `<video class="scrapVideo" muted playsinline controls preload="auto">
                   <source src="${p.src}" type="video/mp4">
                 </video>`
              : `<img src="${p.src}" loading="lazy">`
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

  /* =========================
     📖 COVER OPEN
  ========================= */
  if (cover) {
    cover.addEventListener("click", () => {
      cover.classList.add("flipped");
    });
  }

  /* =========================
     ➡ NEXT PAGE
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];
      page.classList.add("flipped");

      setTimeout(() => {
        const video = page.querySelector("video");
        if (video) {
          video.currentTime = 0;
          video.muted = true;
          video.play().catch(()=>{});
        }
      }, 500);

      current++;

      if (current === allPages.length) {
        setTimeout(showEnding, 800);
      }
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

      const video = page.querySelector("video");
      if (video) video.pause();
    }
  };

  /* =========================
     💖 END SCREEN
  ========================= */
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
      <p style="font-size:26px;max-width:600px;line-height:1.6;">
        Some people don’t just come into life…  
        they stay 💖
      </p>

      <button onclick="goHome()">Go Home 💖</button>
    `;

    document.body.appendChild(end);
  }

  window.goHome = function () {
    window.location.href = "../index.html";
  };

});
