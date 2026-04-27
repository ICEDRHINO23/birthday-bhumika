let lit = 0;

/* 🕯️ LIGHT CANDLES */
document.querySelectorAll(".candle").forEach(c => {

  c.onclick = () => {

    if (c.classList.contains("lit")) return;

    c.classList.add("lit");
    lit++;

    if (lit === 3) {
      document.getElementById("cakeMsg").innerText =
        "✨ Now cut the cake 🎂";
    }
  };

});

/* 🔪 CUT CAKE */
function cutCake() {

  if (lit < 3) {
    alert("Light all candles first 🕯️");
    return;
  }

  const cake = document.getElementById("cake");
  const knife = document.getElementById("knife");

  cake.classList.add("split");
  knife.classList.add("animate");

  launchConfetti();

  setTimeout(() => {
    document.getElementById("cakeSection").classList.add("hidden");
    document.getElementById("finalScreen").classList.remove("hidden");
  }, 1500);
}

/* 🎉 CONFETTI */
function launchConfetti() {

  for (let i = 0; i < 60; i++) {

    const conf = document.createElement("div");
    conf.className = "confetti";

    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.background =
      `hsl(${Math.random() * 360}, 100%, 60%)`;

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 3000);
  }
}

/* 🏠 HOME */
function goHome() {
  window.location.href = "index.html";
}
