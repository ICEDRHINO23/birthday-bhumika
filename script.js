// ==============================
// 🎬 INTRO CINEMATIC ENTRY
// ==============================
gsap.from("#intro", {
  opacity: 0,
  scale: 0.8,
  duration: 1.5,
  ease: "power3.out"
});

setTimeout(() => {
  gsap.to("#intro", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.getElementById("intro").style.display = "none";
      document.body.classList.add("gift-mode");
    }
  });
}, 3000);


// ==============================
// 🎁 GIFT FLOAT ENTRY
// ==============================
gsap.from("#gift", {
  y: -200,
  opacity: 0,
  duration: 1.5,
  ease: "bounce.out"
});


// ==============================
// 🎮 SMART GIFT MOVEMENT
// ==============================
const gift = document.getElementById("gift");
let unlocked = false;

function moveGift() {
  if (unlocked) return;

  const x = Math.random() * (window.innerWidth - 160);
  const y = Math.random() * (window.innerHeight - 160);

  gsap.to(gift, {
    x: x - window.innerWidth / 2,
    y: y - window.innerHeight / 2,
    duration: 0.6,
    ease: "power2.out"
  });
}

gift.addEventListener("mouseover", moveGift);
gift.addEventListener("touchstart", moveGift);

setTimeout(() => {
  unlocked = true;
}, 15000);


// ==============================
// 🎵 AUDIO
// ==============================
const bgMusic = document.getElementById("bgMusic");
const openSound = document.getElementById("openSound");
const flipSound = document.getElementById("flipSound");

document.body.addEventListener("click", () => {
  bgMusic?.play();
}, { once: true });


// ==============================
// 🎁 CINEMATIC GIFT OPEN
// ==============================
gift.addEventListener("click", () => {

  if (!unlocked) return;

  openSound?.play();

  // Lid animation (real feel)
  gsap.to(".lid", {
    rotationX: 130,
    transformOrigin: "top",
    duration: 1,
    ease: "power3.out"
  });

  // Glow burst
  gsap.to("#gift", {
    boxShadow: "0 0 80px gold",
    duration: 0.5
  });

  // Butterflies
  releaseButterflies();

  // Fade gift out
  gsap.to("#gift", {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      gift.style.display = "none";
      showBook();
    }
  });

});


// ==============================
// 📖 BOOK CINEMATIC ENTRY
// ==============================
function showBook() {
  const book = document.getElementById("book");

  book.style.display = "block";

  gsap.from("#book", {
    scale: 0.6,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
}


// ==============================
// 📖 PAGE FLIP (SMOOTH)
// ==============================
const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
  page.addEventListener("click", () => {

    gsap.to(page, {
      rotationY: -160,
      duration: 1,
      ease: "power2.inOut"
    });

    flipSound?.play();

    if (index === pages.length - 1) {
      setTimeout(showFinal, 1200);
    }

  });
});


// ==============================
// 💌 FINAL CINEMATIC MESSAGE
// ==============================
function showFinal() {
  const book = document.getElementById("book");
  const final = document.getElementById("final");

  gsap.to(book, {
    opacity: 0,
    duration: 0.8,
    onComplete: () => {
      book.style.display = "none";
      final.style.display = "block";

      gsap.from("#final", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      });
    }
  });
}


// ==============================
// 🦋 REALISTIC BUTTERFLY STYLE
// ==============================
function releaseButterflies() {
  const canvas = document.getElementById("butterflyCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 6 + 4,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 2,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.01;

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
// ⏳ COUNTDOWN (CLEAN STYLE)
// ==============================
const countdown = document.getElementById("countdown");
const target = new Date("May 12, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = target - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const m = Math.floor((gap / (1000 * 60)) % 60);
  const s = Math.floor((gap / 1000) % 60);

  if (countdown) {
    countdown.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
  }

}, 1000);
