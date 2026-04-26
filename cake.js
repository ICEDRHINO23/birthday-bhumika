let lit = 0;

const candles = document.querySelectorAll(".candle");
const cake = document.getElementById("cake");
const knife = document.getElementById("knife");
const msg = document.getElementById("msg");

candles.forEach(c => {
  c.onclick = () => {

    if (c.classList.contains("lit")) return;

    c.classList.add("lit");
    lit++;

    if (lit === 3) {
      msg.innerText = "Tap cake to cut 🎂";
      enableCut();
    }
  };
});

function enableCut() {

  cake.onclick = () => {

    knife.classList.add("active");

    setTimeout(() => {
      cake.classList.add("split");
      launchConfetti();
    }, 500);

    setTimeout(() => {
      document.getElementById("cakeSection").classList.add("hidden");
      document.getElementById("cardSection").classList.remove("hidden");
    }, 1200);

  };
}

function launchConfetti(){
  const container = document.getElementById("confettiContainer");

  for(let i=0;i<50;i++){
    const c = document.createElement("div");
    c.className="confetti";
    c.style.left = Math.random()*100+"vw";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;
    container.appendChild(c);

    setTimeout(()=>c.remove(),2000);
  }
}

function openCard(){
  document.querySelector(".card").classList.add("open");
}
