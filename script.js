const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");
const funText = document.getElementById("funText");
const flipSound = document.getElementById("flipSound");
const bgMusic = document.getElementById("bgMusic");

let canOpen = false;
setTimeout(() => canOpen = true, 8000);

const msgs = ["😂 Not so easy!", "Catch me!", "Try again!"];

function moveGift() {
    if (canOpen) return;

    present.style.left = Math.random() * 80 + "%";
    present.style.top = Math.random() * 80 + "%";

    funText.innerText = msgs[Math.floor(Math.random() * msgs.length)];
    funText.style.opacity = 1;

    setTimeout(() => funText.style.opacity = 0, 1500);
}

present.addEventListener("mouseenter", moveGift);

/* open */
present.addEventListener("click", () => {
    if (!canOpen) return;

    present.classList.add("open");

    setTimeout(() => {
        present.style.display = "none";
        scrapbook.style.display = "block";

        bgMusic.play();
        typeText("Dear Bhumika 💖 Happy Birthday!", "typingText");
        releaseButterflies();
    }, 600);
});

/* typing */
function typeText(text, id) {
    let i = 0;
    const el = document.getElementById(id);
    el.innerHTML = "";

    function t() {
        if (i < text.length) {
            el.innerHTML += text[i++];
            setTimeout(t, 35);
        }
    }
    t();
}

/* pages */
let currentPage = 1;

function nextPage() {
    let page = document.getElementById("page" + currentPage);

    if (page) {
        page.classList.add("flipped");
        flipSound.play();
        currentPage++;
    }

    if (currentPage === 4) heartBurst();
}

/* butterflies */
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

/* hearts */
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
