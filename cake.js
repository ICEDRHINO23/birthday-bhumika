function cutCake() {
  const cake = document.getElementById("cake");
  const knife = document.getElementById("knife");

  cake.classList.add("split");
  knife.classList.add("animate");

  // 🎉 CONFETTI
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";

    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.top = "0px";

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 3000);
  }
}
function goHome() {
  window.location.href = "index.html";
}
