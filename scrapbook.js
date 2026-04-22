document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* =========================
     🎵 MUSIC (ON FIRST CLICK)
  ========================= */
  function startMusic() {
    if (music && music.paused) {
      music.volume = 0.5;
      music.play().catch(()=>{});
    }
  }
  document.addEventListener("click", startMusic, { once: true });

  /* =========================
     💖 TEXT (EXPANDED)
  ========================= */
  const texts = [
`There are people who enter our life quietly…  
but slowly become a part of everything.  
You became that comfort I didn’t even know I needed.`,

`We never planned anything…  
but every moment felt real.  
And that’s what made it special.`,

`Some connections don’t need effort…  
they just stay strong on their own.`,

`Moments like this…  
simple, but unforgettable.`,

`Your smile…  
that’s what stayed.`,

`Maybe it was never about anything big…  
just real moments that meant something.`,

`And today…  
is just a reminder of that.  

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
              ? `<video src="${p.src}" muted loop controls></video>`
              : `<img src="${p.src}" />`
          }
        </div>

        <div class="right">
          <p class="text"></p>
        </div>

      </div>
      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     ✍️ TYPING (OPTIONAL)
  ========================= */
  function typeText(el, text) {
    el.innerHTML = "";
    let i = 0;

    const speed = 20;

    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  /* =========================
     📖 COVER OPEN
  ========================= */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
  });

  /* =========================
     ➡ NEXT
  ========================= */
  window.nextPage = function () {
    if (current < allPages.length) {

      const page = allPages[current];
      const textEl = page.querySelector(".text");

      page.classList.add("flipped");

      typeText(textEl, texts[current]);

      current++;
    }
  };

  /* =========================
     ⬅ PREVIOUS
  ========================= */
  window.prevPage = function () {
    if (current > 0) {
      current--;

      const page = allPages[current];
      page.classList.remove("flipped");

      page.querySelector(".text").innerHTML = "";
    }
  };

  /* =========================
     🏠 HOME
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
