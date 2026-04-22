document.addEventListener("DOMContentLoaded", () => {

  /* LOADING */
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.transition = "opacity 0.6s ease";
      intro.style.opacity = "0";

      setTimeout(() => {
        intro.style.display = "none";
      }, 600);
    }
  }, 1200);

  /* ELEMENTS */
  const tapBtn = document.getElementById("tapBtn");
  const tapCountText = document.getElementById("tapCount");

  const gameBox = document.getElementById("gameBox");
  const giftContainer = document.getElementById("giftContainer");
  const giftImage = document.getElementById("giftImage");

  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");

  const menu = document.getElementById("menu");

  const music = document.getElementById("bgMusic");

  let count = 0;
  let giftOpened = false;

  /* MUSIC */
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

  document.body.addEventListener("click", startMusic, { once: true });

  /* GAME */
  tapBtn.addEventListener("click", () => {
    count++;
    tapCountText.innerText = `Tapped: ${Math.min(count,5)}/5`;

    if (count === 5) {
      gameBox.classList.add("hidden");
      giftContainer.classList.remove("hidden");
    }
  });

  /* GIFT */
  giftImage.addEventListener("click", () => {

    if (giftOpened) return;
    giftOpened = true;

    giftImage.classList.add("gift-pop");

    setTimeout(() => {
      giftImage.src = "./image/gift-open.PNG";
    }, 400);

    setTimeout(() => {
      giftContainer.classList.add("hidden");
      funSection.classList.remove("hidden");

      typeText(funText, getFunnyMessage());
    }, 1200);
  });

  function typeText(el, text) {
    el.innerHTML = "";
    let i = 0;

    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
  }

  function getFunnyMessage() {
    const messages = [
      "You really thought gift will open so easily? 😂",
      "Patience level: zero detected 🤭",
      "Still waiting? Good things take time 😌",
      "Okay okay… now real surprise coming 😄"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  window.continueAfterFun = function () {
    funSection.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  window.openScrapbook = function () {
    window.location.href = "scrapbook.html";
  };

  window.openVideo = function () {
    alert("⏳ Unlocks on Birthday 🎂");
  };

});
