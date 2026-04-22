document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pagesContainer");
  const cover = document.getElementById("cover");
  const music = document.getElementById("scrapMusic");

  let current = 0;
  let voicesReady = false;
  let selectedVoice = null;

  /* =========================
     🎤 LOAD VOICE
  ========================= */
  function loadVoices() {
    const voices = speechSynthesis.getVoices();

    if (voices.length) {
      selectedVoice = voices.find(v => v.lang.includes("en")) || voices[0];
      voicesReady = true;
    }
  }

  speechSynthesis.onvoiceschanged = loadVoices;

  /* =========================
     🎵 MUSIC
  ========================= */
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

  /* =========================
     💖 TEXT
  ========================= */
  const texts = [
`There are people who enter our life quietly… but slowly become everything.`,
`We never planned anything… but it always felt real.`,
`Some connections don’t need effort… they just stay.`,
`Moments like this… simple but unforgettable.`,
`Your smile… that’s what stayed.`,
`And maybe… that’s what makes it special.`,
`Happy Birthday 💖`
  ];

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
     🧱 CREATE
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
              ? `<video src="${p.src}" muted loop></video>`
              : `<img src="${p.src}">`
          }
        </div>

        <div class="right">
          <p class="typing-text"></p>
        </div>
      </div>
      <div class="back"></div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll("#pagesContainer .page");

  /* =========================
     ✍️ TYPING EFFECT
  ========================= */
  function typeText(el, text, speed = 35) {
    el.innerHTML = "";
    let i = 0;

    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  /* =========================
     🎤 VOICE
  ========================= */
  function speak(text) {
    if (!voicesReady) return;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = selectedVoice;
    utter.rate = 0.95;
    utter.pitch = 1;

    speechSynthesis.speak(utter);
  }

  /* =========================
     📖 COVER
  ========================= */
  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
    startMusic();
    startStory();
  });

  /* =========================
     🎬 STORY FLOW
  ========================= */
  function startStory() {

    let i = 0;

    const interval = setInterval(() => {

      if (i < allPages.length) {

        const page = allPages[i];
        const textEl = page.querySelector(".typing-text");

        page.classList.add("flipped");

        /* typing */
        typeText(textEl, texts[i]);

        /* voice */
        speak(texts[i]);

        i++;

      } else {
        clearInterval(interval);
        setTimeout(showEnding, 2000);
      }

    }, 3500);
  }

  /* =========================
     🎉 CONFETTI
  ========================= */
  function launchConfetti() {
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("div");

      c.style.position = "fixed";
      c.style.width = "6px";
      c.style.height = "6px";
      c.style.background =
        `hsl(${Math.random()*360},100%,60%)`;

      c.style.top = "-10px";
      c.style.left = Math.random()*100 + "vw";
      c.style.zIndex = 9999;

      document.body.appendChild(c);

      const fall = setInterval(() => {
        let top = parseFloat(c.style.top);
        c.style.top = top + 5 + "px";

        if (top > window.innerHeight) {
          clearInterval(fall);
          c.remove();
        }
      }, 30);
    }
  }

  /* =========================
     💖 END SCREEN
  ========================= */
  function showEnding() {

    launchConfetti();

    const end = document.createElement("div");

    end.style.position = "fixed";
    end.style.inset = "0";
    end.style.background = "rgba(0,0,0,0.9)";
    end.style.display = "flex";
    end.style.flexDirection = "column";
    end.style.justifyContent = "center";
    end.style.alignItems = "center";
    end.style.color = "white";
    end.style.textAlign = "center";
    end.style.zIndex = "9999";

    end.innerHTML = `
      <p style="font-size:26px;max-width:600px;">
        Some people always stay special 💖
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
