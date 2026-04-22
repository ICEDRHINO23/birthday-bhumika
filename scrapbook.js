document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 MUSIC */
  function startMusic() {
    if (music && music.paused) {
      music.volume = 0.5;
      music.play().catch(()=>{});
    }
  }
  document.addEventListener("click", startMusic, { once: true });

  /* 💖 EXPANDED TEXT */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

But slowly… without even realizing,
they become a part of everything.

You became that comfort.
That calm presence that just feels right.`,

`We never planned anything…
but every moment felt real.

Nothing forced.
Nothing fake.

And that made it special.`,

`Some connections don’t need effort.

They don’t need constant talking.

They just stay…
naturally.`,

`Then came moments like these…

Simple…
but unforgettable.

Because of how they felt.`,

`I still remember that smile…

Not perfect.
But real.

And that kind of happiness stays.`,

`Maybe it was never about anything big…

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

  /* 📂 MEDIA */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "image", src: "./scrapbook/6.mp4" },
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
              ? `<video src="${p.src}" autoplay muted loop playsinline></video>`
              : `<img src="${p.src}" />`
          }
        </div>

        <div class="right">
          ${ i === pages.length - 1 ? `<h2>For You 💖</h2>` : "" }
          <p class="text">${texts[i]}</p>
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* 📖 COVER */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* ➡ NEXT */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];

      /* 🔥 START VIDEO WHEN PAGE OPENS */
      const video = page.querySelector("video");
      if (video) {
        video.play().catch(()=>{});
      }

      page.classList.add("flipped");

      current++;

      /* 🔥 SHOW ENDING */
      if (current === allPages.length) {
        setTimeout(showEnding, 1000);
      }
    }
  };

  /* ⬅ PREV */
  window.prevPage = function () {

    if (current > 0) {
      current--;

      const page = allPages[current];
      page.classList.remove("flipped");
    }
  };

  /* 💖 ENDING MESSAGE */
  function showEnding() {

    const end = document.createElement("div");

    end.style.position = "fixed";
    end.style.inset = "0";
    end.style.background = "rgba(0,0,0,0.92)";
    end.style.display = "flex";
    end.style.flexDirection = "column";
    end.style.justifyContent = "center";
    end.style.alignItems = "center";
    end.style.color = "white";
    end.style.textAlign = "center";
    end.style.zIndex = "9999";

    end.innerHTML = `
      <p style="font-size:26px;max-width:600px;line-height:1.6;">
        No matter where life goes…  
        some people always stay special. 💖
      </p>

      <button onclick="goHome()" style="margin-top:20px;">
        Go Home 💖
      </button>
    `;

    document.body.appendChild(end);
  }

  /* 🏠 HOME */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
