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
   CAKE CUT
========================= */
function enableCut() {

  const cake = document.querySelector(".cake");
  canCut = true;

  cake.addEventListener("click", () => {

    if (!canCut) return;

    cake.classList.add("cut");

    msg.innerText = "🎉 Happy Birthday 🎉";

    setTimeout(() => {
      showCard();
    }, 1200);

  }, { once: true });
}

/* =========================
   SHOW CARD
========================= */
function showCard() {
  document.getElementById("cakeSection").classList.add("hidden");
  document.getElementById("cardSection").classList.remove("hidden");
}

/* =========================
   CARD OPEN (FLIP)
========================= */
function openCard() {
  document.querySelector(".card").classList.add("open");
}
