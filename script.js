// ==============================
// 🎬 INTRO → GIFT MODE
// ==============================
setTimeout(() => {
  document.body.classList.add("gift-mode");
}, 3000);


// ==============================
// 🎮 FUN TEXT SYSTEM
// ==============================
const funText = document.getElementById("funText");

const messages = [
  "Catch me 😜",
  "Too slow 😂",
  "Almost there!",
  "Hehe try again!",
  "You can do it 💪"
];

function showMessage() {
  if (!funText) return;
  funText.innerText = messages[Math.floor(Math.random() * messages.length)];
}


// ==============================
// 🎁 GIFT CHASE SYSTEM
// ==============================
const gift = document.getElementById("gift");

let giftUnlocked = false;

if (gift) {

  function moveGift() {
    if (giftUnlocked) return;

    const x = Math.random() * (window.innerWidth - 160);
    const y = Math.random() * (window.innerHeight - 160);

    gift.style.left = x + "px";
    gift.style.top = y + "px";

    showMessage();
  }

  gift.addEventListener("mouseover", moveGift);
  gift.addEventListener("touchstart", moveGift);

  // Unlock after 20 sec
  setTimeout(() => {
    giftUnlocked = true;
    if (funText) funText.innerText = "Okay fine… click me 🎁";
  }, 20000);
}


// ==============================
// 🎵 AUDIO SYSTEM
// ==============================
const bgMusic = document.getElementById("bgMusic");
const openSound = document.getElementById("openSound");
const flipSound = document.getElementById("flipSound");

// Start music on first interaction
document.body.addEventListener("click", () => {
  if (bgMusic) bgMusic.play();
}, { once: true });


// ==============================
// 🎁 GIFT OPEN LOGIC
// ==============================
const lid = document.querySelector(".lid");
const book = document.getElementById("book");

gift?.addEventListener("click", () => {

  if (!giftUnlocked) return;

  // Open lid animation
  gift.classList.add("open");

  if (openSound) openSound.play();

  // Butterfly effect
  releaseButterflies();

  // Show book after delay
  setTimeout(() => {
    gift.style.display = "none";
    if (book) book.style.display = "block";
  }, 1200);

});


// ==============================
// 🦋 BUTTERFLY EFFECT (UPGRADED)
// ==============================
function releaseButterflies() {

  const canvas = document.getElementById("butterflyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 5 + 3,
      vx: (Math.random() - 0.5) * 7,
      vy: Math.random() * -7 - 2,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.012;

      ctx.fillStyle = `rgba(255,182,193,${p.life})`;

      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size, p.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}


// ==============================
// 📖 PAGE FLIP SYSTEM (YOUR BOOK)
// ==============================
const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
  page.addEventListener("click", () => {

    page.classList.add("flipped");

    if (flipSound) {
      flipSound.currentTime = 0;
      flipSound.play();
    }

    // Last page → show final message
    if (index === pages.length - 1) {
      setTimeout(() => {
        document.getElementById("book").style.display = "none";
        document.getElementById("final").style.display = "block";
      }, 1200);
    }

  });
});


// ==============================
// ⏳ COUNTDOWN TIMER (NEW)
// ==============================
const countdown = document.getElementById("countdown");

const targetDate = new Date("May 12, 2026 00:00:00").getTime();

setInterval(() => {

  if (!countdown) return;

  const now = new Date().getTime();
  const gap = targetDate - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const m = Math.floor((gap / (1000 * 60)) % 60);
  const s = Math.floor((gap / 1000) % 60);

  countdown.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;

}, 1000);
