/* =========================
   STATE
========================= */
let litCount = 0;
let cutDone = false;

/* =========================
   WAIT FOR DOM
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const candles = document.querySelectorAll(".candle");
  const msg = document.getElementById("cakeMsg");

  /* 🕯️ LIGHT CANDLES */
  candles.forEach(candle => {

    candle.addEventListener("click", () => {

      if (candle.classList.contains("lit")) return;

      candle.classList.add("lit");
      litCount++;

      /* 🔥 ALL LIT */
      if (litCount === candles.length) {
        msg.innerText = "✨ Now cut the cake 🎂";
      }

    });

  });

});

/* =========================
   CUT CAKE
========================= */
function cutCake() {

  if (cutDone) return;

  const cake = document.getElementById("cake");
  const knife = document.getElementById("knife");
  const msg = document.getElementById("cakeMsg");

  /* ❌ NOT READY */
  if (litCount < 3) {
    msg.innerText = "🕯️ Light all candles first!";
    return;
  }

  cutDone = true;

  /* 🎂 ANIMATION */
  cake.classList.add("split");
  knife.classList.add("animate");

  /* 🎉 CONFETTI */
  launchConfetti();

  /* 💖 FINAL SCREEN */
  setTimeout(() => {
    document.getElementById("cakeSection").classList.add("hidden");
    document.getElementById("finalScreen").classList.remove("hidden");
  }, 1500);
}

/* =========================
   CONFETTI SYSTEM
========================= */
function launchConfetti() {

  for (let i = 0; i < 60; i++) {

    const conf = document.createElement("div");
    conf.className = "confetti";

    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.top = "-20px";

    /* 🎨 RANDOM COLORS */
    conf.style.background =
      `hsl(${Math.random() * 360}, 100%, 60%)`;

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 3000);
  }
}

/* =========================
   HOME BUTTON
========================= */
function goHome() {
  window.location.href = "index.html";
}
