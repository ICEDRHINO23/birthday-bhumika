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
     💖 EXPANDED TEXT
  ========================= */
  const texts = [

`There are people who enter our life quietly…
without any noise, without any announcement.

At first, they feel like just another part of the day,
just another conversation,
just another moment.

But slowly… without even realizing,
they become a part of everything.

You became that comfort.
That calm presence that just feels right.

And somehow…
things started feeling a little better,
just because you were there.`,

`We never planned anything…

Nothing was forced,
nothing was expected.

Yet every time we spoke,
it felt real.

No pressure,
no pretending,
no need to be anything else.

And in a world where most things don’t last,
you became something that stayed.

And that…
means more than words can explain.`,

`Some connections don’t need effort.

They don’t need constant talking,
or daily reminders.

They just exist…
quietly,
naturally,
effortlessly.

Strong enough to stay,
even in silence.

And honestly,
that’s what makes them rare.`,

`Then came moments like these…

Simple,
unplanned,
almost ordinary.

Nothing big,
nothing dramatic.

But somehow,
they turned into memories.

Because it was never about what we did…

it was about how it felt.`,

`I still remember that smile…

Not because it was perfect,
but because it was real.

That kind of happiness
doesn’t just fade away.

It stays.

Quietly,
somewhere inside,
long after the moment has passed.`,

`Maybe this was never about anything big…

No labels,
no expectations,
no definitions.

Just a connection
that happened naturally,
and stayed effortlessly.

Sometimes…
that’s all something needs to be real.`,

`And today…
is not just another birthday.
It’s a reminder…

that some people
walk into our lives quietly,
but leave a mark that never fades.

Not because of what they did,
but because of how they made us feel.
And no matter where life goes from here…

some people always remain special.

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
     ➡ NEXT PAGE (VIDEO PLAY)
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];

      /* FLIP FIRST */
      page.classList.add("flipped");

      /* PLAY VIDEO AFTER FLIP */
      setTimeout(() => {

        const video = page.querySelector("video");

        if (video) {
          video.currentTime = 0;
          video.muted = true;

          video.play().catch(() => {
            document.body.addEventListener("click", () => {
              video.play().catch(()=>{});
            }, { once: true });
          });
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
        they stay.

        And they make everything feel better. 💖
        "wait for more"
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
