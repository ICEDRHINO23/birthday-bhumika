const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");
const bgMusic = document.getElementById("bgMusic");

/* intro */
setTimeout(() => {
    present.style.display = "block";
}, 4000);

/* open gift */
present.addEventListener("click", () => {
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

/* page flip */
let currentPage = 1;

function nextPage() {
    const page = document.getElementById("page" + currentPage);

    if (page) {
        page.classList.add("flipping");

        setTimeout(() => {
            page.classList.add("flipped");
            page.classList.remove("flipping");
        }, 200);

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
