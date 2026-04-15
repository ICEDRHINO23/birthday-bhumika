// 🎉 background elements
const bg = document.getElementById("bg");
const emojis = ["🎈","🎂","🎉","🎁","🎀"];

for (let i = 0; i < 35; i++) {
    let el = document.createElement("span");
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = (6 + Math.random() * 10) + "s";
    el.style.fontSize = (25 + Math.random() * 25) + "px";

    bg.appendChild(el);
}

// 🎁 elements
const gift = document.getElementById("gift");
const book = document.getElementById("book");
const fun = document.getElementById("funText");

let canOpen = false;
let current = 1;

const msgs = ["😂 Catch me!", "Try again!", "Not yet!"];

/* start */
setTimeout(() => {
    moveGift();
}, 4000);

/* move */
function moveGift() {

    let count = 0;

    let interval = setInterval(() => {

        let x = Math.random() * (window.innerWidth - 150);
        let y = Math.random() * (window.innerHeight - 150);

        gift.style.left = x + "px";
        gift.style.top = y + "px";
        gift.style.transform = "none";

        fun.innerText = msgs[Math.floor(Math.random() * msgs.length)];

        count++;

        if (count > 15) {
            clearInterval(interval);

            gift.style.left = "50%";
            gift.style.top = "50%";
            gift.style.transform = "translate(-50%, -50%)";

            fun.innerText = "🎁 Open me!";
            canOpen = true;
        }

    }, 700);
}

/* open */
gift.addEventListener("click", () => {

    if (!canOpen) return;

    gift.classList.add("open");

    setTimeout(() => {
        gift.style.display = "none";
        book.style.display = "block";

        typeText("Dear Bhumika 💖 Happy Birthday!", "typing");

    }, 500);
});

/* typing */
function typeText(text, id) {
    let i = 0;
    let el = document.getElementById(id);

    function t() {
        if (i < text.length) {
            el.innerHTML += text[i++];
            setTimeout(t, 40);
        }
    }
    t();
}

/* flip */
function next() {
    let page = document.getElementById("p" + current);

    if (page) {
        page.classList.add("flipped");
        current++;
    }

    if (current === 4) {
        document.getElementById("book").style.display = "none";
        document.getElementById("final").style.display = "block";
    }
}
