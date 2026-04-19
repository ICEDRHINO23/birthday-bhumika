// ==============================
// 🎬 STAGE CONTROL SYSTEM
// ==============================
function showStage(id) {
  document.querySelectorAll(".stage").forEach(stage => {
    stage.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// ==============================
// ⏳ COUNTDOWN TIMER (12 MAY 2026)
// ==============================
const targetDate = new Date("May 12, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = targetDate - now;

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((gap / (1000 * 60)) % 60);
  const seconds = Math.floor((gap / 1000) % 60);

  const countdown = document.getElementById("countdown");
  if (countdown) {
    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// ==============================
// 🎵 AUDIO SYSTEM
// ==============================
const bgMusic = document.getElementById("bgMusic");
const openSound = document.getElementById("openSound");
const flipSound = document.getElementById("flipSound");

// Start music only after first user interaction
document.body.addEventListener("click", () => {
  if (bgMusic) bgMusic.play();
}, { once: true });

// ==============================
// 🎮 GIFT CHASE GAME
// ==============================
const gift = document.getElementById("gift");

if (gift) {
  gift.style.position = "absolute";

  function moveGift() {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 120);

    gift.style.left = x + "px";
    gift.style.top = y + "px";
  }

  // Move on hover / touch
  gift.addEventListener("mouseover", moveGift);
  gift.addEventListener("touchstart", moveGift);

  // After 10 sec → allow click
  setTimeout(() => {
    gift.addEventListener("click", () => {
      showStage("stage3");
    });
  }, 10000);
}

// ==============================
// 🎁 GIFT OPEN + BUTTERFLY
// ==============================
const openGift = document.getElementById("openGift");

if (openGift) {
  openGift.addEventListener("click", () => {
    if (openSound) openSound.play();

    releaseButterflies();

    setTimeout(() => {
      showStage("stage4");
    }, 2000);
  });
}

// ==============================
// 🦋 BUTTERFLY ANIMATION
// ==============================
function releaseButterflies() {
  const canvas = document.getElementById("butterflyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 6 + 3,
      speedX: (Math.random() - 0.5) * 6,
      speedY: Math.random() * -6 - 2,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 0.015;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 105, 180, ${p.life})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
// 📖 3D PAGE FLIP SYSTEM
// ==============================
const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
  page.addEventListener("click", () => {
    page.classList.add("flipped");

    if (flipSound) {
      flipSound.currentTime = 0;
      flipSound.play();
    }

    // If last page → final stage
    if (index === pages.length - 1) {
      setTimeout(() => {
        showStage("stage5");
      }, 1500);
    }
  });
});

// ==============================
// 🎯 OPTIONAL: AUTO STAGE FLOW
// ==============================

// Start from stage1
window.onload = () => {
  showStage("stage1");
};

// Optional: auto move to game after 3 sec
setTimeout(() => {
  showStage("stage2");
}, 3000);
