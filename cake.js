/* =========================
   STATE
========================= */
let litCount = 0;
let canCut = false;

/* =========================
   ELEMENTS
========================= */
const candles = document.querySelectorAll(".candle");
const msg = document.getElementById("cakeMsg");
const cake = document.getElementById("cake");
const knife = document.getElementById("knife");

/* =========================
   🕯️ CANDLE LIGHTING
========================= */
candles.forEach(candle => {

  candle.addEventListener("click", () => {

    // prevent double lighting
    if (candle.classList.contains("lit")) return;

    candle.classList.add("lit");
    litCount++;

    if (litCount < candles.length) {
      msg.innerText = "Light all candles 🕯️";
    }

    if (litCount === candles.length) {
      msg.innerText = "✨ Make a wish… now tap the cake 🎂";
      enableCut();
    }
  });

});

/* =========================
   🔪 ENABLE CUT (KNIFE FLOW)
========================= */
function enableCut() {

  canCut = true;

  cake.addEventListener("click", () => {

    if (!canCut) return;

    canCut = false; // prevent repeat

    // start knife animation
    knife.classList.add("animate");

    msg.innerText = "Cutting the cake... 🎂";

    /* SPLIT AFTER KNIFE REACHES */
    setTimeout(() => {

      cake.classList.add("split");

      msg.innerText = "🎉 Happy Birthday 🎉";

      launchConfetti();

    }, 700);

    /* SHOW CARD AFTER EFFECT */
    setTimeout(() => {
      showCard();
    }, 1500);

  }, { once: true });
}

/* =========================
   🎉 CONFETTI
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
   💌 SHOW CARD
========================= */
function showCard() {

  document.getElementById("cakeSection").classList.add("hidden");
  document.getElementById("cardSection").classList.remove("hidden");
}

/* =========================
   💌 CARD FLIP
========================= */
function openCard() {
  document.querySelector(".card").classList.add("open");
}
