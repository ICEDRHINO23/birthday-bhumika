document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;

  /* 🎵 MUSIC */
  function startMusic() {
    if (music && music.paused) {
      music.volume = 0;
      music.play().catch(()=>{});

      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        music.volume = v;
        if (v >= 0.6) clearInterval(fade);
      }, 200);
    }
  }

  /* 📂 PAGES */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "video", src: "./scrapbook/5.mp4" },
    { type: "image", src: "./scrapbook/6.jpg" }
  ];

  /* 💖 EXPANDED EMOTIONAL TEXT */
  const texts = [
    "Some people enter our life quietly… without any noise. But slowly, without even realizing, they become a part of everything. You became that comfort, that peace, that presence I didn’t even know I needed.",

    "We never planned conversations… never forced anything. Yet somehow, every moment we shared felt real. In a world full of temporary people, you became something permanent.",

    "Not every friendship needs constant talking. Some connections just stay strong silently. And honestly… that’s what makes this one so special.",

    "Then came moments like this… small, simple, but filled with happiness. Days that didn’t seem important before… suddenly became unforgettable.",

    "Your smile… it’s something I still remember clearly. Not because it was perfect, but because it was real. And that kind of happiness stays longer than the moment itself.",

    "And maybe this is what matters… not big words, not big gestures… just real moments, real smiles, and a connection that feels effortless.",

    "So today isn’t just about a birthday… it’s about celebrating someone who unknowingly made life a little better, a little lighter, and a lot more meaningful.\n\nHappy Birthday 💖"
  ];

  /* 🧱 CREATE */
  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";
    page.style.zIndex = pages.length - i;

    page.innerHTML = `
      <div class="front">
        <div class="left">
          ${
            p.type === "video"
              ? `<video src="${p.src}" autoplay muted loop></video>`
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

  /* 📖 COVER */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
    startMusic();
  });

  /* ➡ NEXT */
  window.nextPage = function () {
    if (current < allPages.length) {
      allPages[current].classList.add("flipped");
      current++;

      if (current === allPages.length) {
        setTimeout(showEnding, 1200);
      }
    }
  };

  /* ⬅ PREV */
  window.prevPage = function () {
    if (current > 0) {
      current--;
      allPages[current].classList.remove("flipped");
    }
  };

  /* 🏠 HOME */
  window.goHome = function () {
    window.location.href = "index.html";
  };

  /* 💖 FINAL ENDING */
  function showEnding() {
    const end = document.createElement("div");
    end.style.position = "fixed";
    end.style.inset = "0";
    end.style.background = "rgba(0,0,0,0.9)";
    end.style.color = "white";
    end.style.display = "flex";
    end.style.justifyContent = "center";
    end.style.alignItems = "center";
    end.style.textAlign = "center";
    end.style.fontSize = "28px";
    end.style.padding = "40px";
    end.style.zIndex = "9999";
    end.innerHTML = "No matter where life goes… some people always stay special. 💖";

    document.body.appendChild(end);
  }

});
