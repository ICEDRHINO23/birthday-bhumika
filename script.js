const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");
const funText = document.getElementById("funText");

let canOpen = false;

/* ⏱ Allow opening after 15 sec */
setTimeout(() => {
    canOpen = true;
    funText.innerText = "🎁 Okay… you can open it now!";
    funText.style.opacity = 1;

    setTimeout(() => {
        funText.style.opacity = 0;
    }, 2000);

}, 15000);

/* 😄 Funny messages */
const messages = [
    "😂 Not so easy!",
    "Catch me if you can!",
    "Hehe… too slow!",
    "Almost there 😜",
    "Try again!",
    "Nope 😆",
    "You can't catch me!",
    "Oops! Missed it!",
    "Keep trying 😂"
];

/* 🎯 Move gift when user tries */
function moveGift() {
    if (canOpen) return;

    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);

    present.style.left = x + "px";
    present.style.top = y + "px";

    // 🎉 Show random funny text
    let randomText = messages[Math.floor(Math.random() * messages.length)];

    funText.innerText = randomText;
    funText.style.opacity = 1;

    // Hide after 1.5 sec
    setTimeout(() => {
        funText.style.opacity = 0;
    }, 1500);
}

/* 💻 Desktop */
present.addEventListener("mouseenter", moveGift);

/* 📱 Mobile */
present.addEventListener("touchstart", moveGift);

/* 🎁 Click to open */
present.addEventListener("click", () => {
    if (!canOpen) return;

    present.style.display = "none";
    scrapbook.style.display = "flex";
});

/* 📖 Page system */
let currentPage = 1;

function nextPage() {
    document.getElementById("page" + currentPage).style.display = "none";
    currentPage++;

    if (document.getElementById("page" + currentPage)) {
        document.getElementById("page" + currentPage).style.display = "flex";
    }
}
