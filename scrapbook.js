document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     🎵 MUSIC (SAFE START)
  ========================= */
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(()=>{});
    }
  }, { once: true });

  /* =========================
     💖 EXPANDED TEXT
  ========================= */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

At first, they feel like just another part of the day.

But slowly… without even realizing,
they become a part of everything.

You became that comfort.`,

`We never planned our conversations.

Nothing was forced,
nothing was expected.

Yet every moment felt real.

And that’s what made it special.`,

`Some connections don’t need constant talking.

They don’t need effort.

They just stay…
naturally.`,

`Then came moments like these…

Simple,
unplanned,
but unforgettable.

Because of how they felt.`,

`I still remember that smile…

Not perfect,
but real.

And that kind of happiness stays.`,

`Maybe this was never about anything big…

Just real moments
that meant something.`,

`And today…

is not just a birthday.

It’s a reminder…

that some people
make life better
just by being there.

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
    { type: "video", src: "./scrapbook/6.mp4" },
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
              ? `<video muted loop playsinline preload="auto">
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

  /* 🔥 ONLY REAL PAGES */
  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     📖 COVER
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

      /* 🎥 PLAY VIDEO SAFELY */
      const video = page.querySelector("video");
      if (video) {
        video.currentTime = 0;
        video.play().catch(()=>{});
      }

      page.classList.add("flipped");
      current++;

      /* 🎉 END TRIGGER */
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

      /* ⏸️ PAUSE VIDEO */
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
        they stay.

        And they make everything feel better. 💖
      </p>

      <button onclick="goHome()" style="margin-top:20px;">
        Go Home 💖
      </button>
    `;

    document.body.appendChild(end);
  }

  /* =========================
     🏠 HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
