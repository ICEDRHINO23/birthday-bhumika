const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");
const funText = document.getElementById("funText");
const flipSound = document.getElementById("flipSound");
const bgMusic = document.getElementById("bgMusic");

let canOpen = false;

/* enable after 10 sec */
setTimeout(() => {
    canOpen = true;
}, 10000);

/* funny messages */
const messages = ["😂 Not so easy!", "Try again!", "Catch me!", "Hehe 😜"];

function moveGift() {
    if (canOpen) return;

    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);

    present.style.left = x + "px";
    present.style.top = y + "px";

    funText.innerText = messages[Math.floor(Math.random() * messages.length)];
    funText.style.opacity = 1;

    setTimeout(() => funText.style.opacity = 0, 1500);
}

present.addEventListener("mouseenter", moveGift);
present.addEventListener("touchstart", moveGift);

/* open gift */
present.addEventListener("click", () => {
    if (!canOpen) return;

    present.classList.add("open");

    setTimeout(() => {
        present.style.display = "none";
        scrapbook.style.display = "block";

        bgMusic.play();
        releaseButterflies();

        typeText("Dear Bhumika 💖 Happy Birthday! This is for you 😊", "typingText");

    }, 600);
});

/* butterflies */
function releaseButterflies() {
    const container = document.getElementById("butterflies");

    for (let i = 0; i < 10; i++) {
        let b = document.createElement("div");
        b.className = "butterfly";
        b.innerText = "🦋";

        b.style.left = "50%";
        b.style.top = "50%";

        container.appendChild(b);

        setTimeout(() => b.remove(), 3000);
    }
}

/* typing */
function typeText(text, id) {
    let i = 0;
    const el = document.getElementById(id);

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 40);
        }
    }

    typing();
}

/* pages */
let currentPage = 1;

function nextPage() {
    currentPage++;
    flipSound.play();
}
