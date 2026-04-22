document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     🎵 SAFE MUSIC START
  ========================= */
  function startMusic() {
    if (music && music.paused) {

      music.volume = 0;
      music.play().catch(() => {});

      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        music.volume = v;
        if (v >= 0.6) clearInterval(fade);
      }, 200);
    }
  }

  /* =========================
     📂 DATA (FINAL)
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

  const texts = [
    "There are people who enter quietly… but slowly become part of everything. You became that comfort without even trying.",

    "Our conversations were never planned… but they always felt real. And in a world full of noise, that meant everything.",

    "Some friendships don’t need daily talks… they stay strong silently. And that’s exactly what makes them special.",

    "And then came moments like this… simple, real, and full of happiness. Somehow, this day started feeling more special.",

    "I still remember this… the way your smile just appeared without effort. That happiness… it stayed longer than the moment itself.",

    "It was never about the gift… it was about that genuine happiness in your eyes. And honestly, that made everything worth it.",

    "Not everything needs words… some things are just felt. And whatever this is… it’s something I truly value.\n\nWait for the real gifts 🎁✨"
  ];

  /* =========================
     🧱 CREATE PAGES
  ========================= */
  if (!container) {
    console.error("pagesContainer not found");
    return;
  }

  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";

    /* 🔥 PERFECT STACK ORDER */
    page.style.zIndex = pages.length - i;

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            p.type === "video"
              ? `<video src="${p.src}" muted loop controls playsinline></video>`
              : `<img src="${p.src}" onerror="this.src='./image/bhoomika.jpg'"/>`
          }
        </div>

        <div class="right">
          ${
            i === pages.length - 1
              ? `<h2>Wait for the real gifts 🎁✨</h2><p>${texts[i]}</p>`
              : `<p>${texts[i]}</p>`
          }
        </div>

      </div>

      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  /* 🔥 IMPORTANT: ONLY INNER PAGES */
  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     📖 OPEN COVER
  ========================= */
  cover.addEventListener("click", () => {

    cover.classList.add("flipped");

    /* 🔥 MOVE COVER BEHIND AFTER FLIP */
    setTimeout(() => {
      cover.style.zIndex = 0;
    }, 800);

    startMusic();
  });

  /* =========================
     ➡ NEXT PAGE
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {

      const page = allPages[current];

      page.classList.add("flipped");

      /* 🎥 AUTO PLAY VIDEO WHEN PAGE OPENS */
      const video = page.querySelector("video");
      if (video) {
        video.play().catch(() => {});
      }

      current++;
      startMusic();
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

      /* 🎥 PAUSE VIDEO WHEN GO BACK */
      const video = page.querySelector("video");
      if (video) {
        video.pause();
      }

    } else {
      cover.classList.remove("flipped");
      cover.style.zIndex = 9999;
    }
  };

  /* =========================
     🔙 GO HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
