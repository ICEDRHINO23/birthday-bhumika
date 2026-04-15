// 🎁 Elements
const gift = document.getElementById("gift");
const book = document.getElementById("book");
const fun = document.getElementById("funText");

let canOpen = false;
let current = 1;

const msgs = [
    "😂 Catch me!",
    "Not so easy!",
    "Try again!",
    "Almost there!"
];

/* 🎬 Start after intro */
setTimeout(() => {
    startMoving();
}, 4000);


/* 🎁 Smooth movement */
function startMoving() {

    let count = 0;

    let interval = setInterval(() => {

        // smooth random positions
        let x = Math.random() * (window.innerWidth - 150);
        let y = Math.random() * (window.innerHeight - 150);

        gift.style.transition = "all 0.6s ease";
        gift.style.left = x + "px";
        gift.style.top = y + "px";

        // funny text
        fun.innerText = msgs[Math.floor(Math.random() * msgs.length)];

        count++;

        // ⏳ demo timing (~12 sec)
        if (count > 15) {
            clearInterval(interval);
            returnToCenter();
        }

    }, 800);
}


/* 🎯 Return to center smoothly */
function returnToCenter() {

    gift.style.transition = "all 1s ease";
    gift.style.left = "50%";
    gift.style.top = "50%";
    gift.style.transform = "translate(-50%, -50%)";

    fun.innerText = "🎁 Okay... you can open now";

    canOpen = true;
}


/* 🎁 Open gift */
gift.addEventListener("click", () => {

    if (!canOpen) return;

    gift.classList.add("open");

    setTimeout(() => {
        gift.style.display = "none";
        book.style.display = "block";

        typeText(
            "Dear Bhumika 💖\n\nHappy Birthday!\nThis is just the beginning 😊",
            "typing"
        );

    }, 500);
});


/* ✍️ Typing effect */
function typeText(text, id) {

    let i = 0;
    const el = document.getElementById(id);
    el.innerHTML = "";

    function type() {
        if (i < text.length) {

            if (text[i] === "\n") {
                el.innerHTML += "<br>";
            } else {
                el.innerHTML += text[i];
            }

            i++;
            setTimeout(type, 40);
        }
    }

    type();
}


/* 📖 Page flip */
function next() {

    const page = document.getElementById("p" + current);

    if (page) {
        page.classList.add("flipped");
        current++;
    }

    // 📕 close book + show message
    if (current === 4) {

        setTimeout(() => {
            book.style.display = "none";

            document.getElementById("final").style.display = "block";
        }, 800);
    }
}
