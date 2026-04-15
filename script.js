const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");
const funText = document.getElementById("funText");
const flipSound = document.getElementById("flipSound");
const bgMusic = document.getElementById("bgMusic");

/* 🎯 FUN */
const msgs = ["😂 Not so easy!", "Catch me!", "Hehe 😜", "Try again!"];
let canOpen = false;

setTimeout(() => canOpen = true, 10000);

function moveGift() {
    if (canOpen) return;

    present.style.left = Math.random() * 80 + "%";
    present.style.top = Math.random() * 80 + "%";

    funText.innerText = msgs[Math.floor(Math.random() * msgs.length)];
    funText.style.opacity = 1;

    setTimeout(() => funText.style.opacity = 0, 1500);
}

present.addEventListener("mouseenter", moveGift);
present.addEventListener("touchstart", moveGift);

/* 🎁 OPEN */
present.addEventListener("click", () => {
    if (!canOpen) return;

    present.classList.add("open");

    setTimeout(() => {
        present.style.display = "none";
        scrapbook.style.display = "block";

        bgMusic.play();
        releaseButterflies();
        createConfetti();
        drawConfetti();

        typeText(
            "Dear Bhumika 💖\n\nHappy Birthday! This surprise is just for you 😊",
            "typingText"
        );

    }, 600);
});

/* 🦋 */
function releaseButterflies() {
    for (let i = 0; i < 10; i++) {
        let b = document.createElement("div");
        b.className = "butterfly";
        b.innerText = "🦋";
        b.style.left = "50%";
        b.style.top = "50%";
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 3000);
    }
}

/* 🎊 CONFETTI */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let confetti = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 5,
            speed: 3
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(c => {
        ctx.fillRect(c.x, c.y, c.size, c.size);
        c.y += c.speed;
    });

    requestAnimationFrame(drawConfetti);
}

/* 💌 typing */
function typeText(text, id) {
    let i = 0;
    const el = document.getElementById(id);
    el.innerHTML = "";

    function typing() {
        if (i < text.length) {
            el.innerHTML += text[i];
            i++;
            setTimeout(typing, 35);
        }
    }

    typing();
}

/* 📖 flip */
let currentPage = 1;

function nextPage() {
    let page = document.getElementById("page" + currentPage);

    if (page) {
        page.classList.add("flipped");
        flipSound.play();
        currentPage++;
    }

    if (currentPage === 4) {
        heartBurst();
    }
}

/* 💖 */
function heartBurst() {
    for (let i = 0; i < 20; i++) {
        let h = document.createElement("div");
        h.className = "heart";
        h.innerText = "💖";
        h.style.left = "50%";
        h.style.top = "50%";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    }
}

/* 🌌 particles */
const pCanvas = document.getElementById("particles");
const pCtx = pCanvas.getContext("2d");

pCanvas.width = innerWidth;
pCanvas.height = innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height
    });
}

function drawParticles() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    particles.forEach(p => {
        pCtx.fillStyle = "white";
        pCtx.fillRect(p.x, p.y, 2, 2);

        p.y -= 1;
        if (p.y < 0) p.y = pCanvas.height;
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();
