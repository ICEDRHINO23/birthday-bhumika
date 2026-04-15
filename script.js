const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");

let startTime = Date.now();
let canOpen = false;

// ⏱ Move box for 15 seconds
const moveInterval = setInterval(() => {
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);

    present.style.left = x + "px";
    present.style.top = y + "px";

    if (Date.now() - startTime > 15000) {
        clearInterval(moveInterval);
        canOpen = true;
    }
}, 500);

// 🎁 Click behavior
present.addEventListener("click", () => {
    if (!canOpen) return;

    present.style.display = "none";
    scrapbook.style.display = "flex";
});
let currentPage = 1;

function nextPage() {
    document.getElementById("page" + currentPage).style.display = "none";
    currentPage++;

    if (document.getElementById("page" + currentPage)) {
        document.getElementById("page" + currentPage).style.display = "flex";
    }
}