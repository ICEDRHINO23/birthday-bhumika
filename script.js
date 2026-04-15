
// 🎁 Elements
const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");

// 📖 Page control
let currentPage = 1;

/* 🎬 Show gift after intro */
setTimeout(() => {
    present.style.display = "block";
}, 4000);

/* 🎁 Open gift */
present.addEventListener("click", () => {

    // open lid animation
    present.classList.add("open");

    setTimeout(() => {
        present.style.display = "none";
        scrapbook.style.display = "block";

        // start typing message
        typeText(
            "Dear Bhumika 💖\n\nHappy Birthday! This small surprise is just for you 😊",
            "typingText"
        );

    }, 500);
});


/* ✍️ Typing Effect */
function typeText(text, elementId) {
    let i = 0;
    const el = document.getElementById(elementId);
    el.innerHTML = "";

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 40);
        }
    }

    typing();
}


/* 📖 Page Flip */
function nextPage() {
    const page = document.getElementById("page" + currentPage);

    if (page) {
        page.classList.add("flipped");
        currentPage++;
    }
}


/* 🔄 OPTIONAL RESET (if needed later) */
function resetBook() {
    currentPage = 1;

    document.querySelectorAll(".page").forEach((page, index) => {
        page.classList.remove("flipped");
    });

    scrapbook.style.display = "none";
    present.style.display = "block";
}
