/* =========================
   STATE
========================= */
let litCount = 0;
let canCut = false;

/* =========================
   CANDLE LIGHTING
========================= */
const candles = document.querySelectorAll(".candle");
const msg = document.getElementById("cakeMsg");

candles.forEach(candle => {

  candle.addEventListener("click", () => {

    if (candle.classList.contains("lit")) return;

    candle.classList.add("lit");
    litCount++;

    if (litCount < candles.length) {
      msg.innerText = "Light all candles 🕯️";
    }

    if (litCount === candles.length) {
      msg.innerText = "✨ Make a wish… now cut the cake 🎂";
      enableCut();
    }
  });

});

/* =========================
   ENABLE CUT
========================= */
function enableCut() {

  const cake = document.getElementById("cake");
  canCut = true;

  cake.addEventListener("click", () => {

    if (!canCut) return;

    cake.classList.add("split");

    msg.innerText = "🎉 Happy Birthday 🎉";

    launchConfetti();

    setTimeout(() => {
      showCard();
    }, 1500);

  }, { once: true });
}

/* =========================
   CONFETTI
========================= */
function launchConfetti() {

  const container = document.getElementById("confettiContainer");

  for (let i = 0; i < 80; i++) {

    const c = document.createElement("div");
    c.className = "confetti";

    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random()*360},100%,60%)`;
    c.style.animationDuration = (Math.random() * 2 + 2) + "s";

    container.appendChild(c);

    setTimeout(() => c.remove(), 3000);
  }
}

/* =========================
   SHOW CARD
========================= */
function showCard() {
  document.getElementById("cakeSection").classList.add("hidden");
  document.getElementById("cardSection").classList.remove("hidden");
}

/* =========================
   CARD OPEN
========================= */
function openCard() {
  document.querySelector(".card").classList.add("open");
}
