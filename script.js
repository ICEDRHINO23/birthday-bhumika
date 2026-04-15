const present = document.getElementById("presentBox");
const scrapbook = document.getElementById("scrapbook");

let currentPage = 1;

/* intro → show gift */
setTimeout(() => {
    present.style.display = "block";
}, 4000);

/* open gift */
present.addEventListener("click", () => {
    present.classList.add("open");

    setTimeout(() => {
        present.style.display = "none";
        scrapbook.style.display = "block";

        typeText(
            "Dear Bhumika 💖\n\nHappy Birthday!\nThis small surprise is just for you 😊",
            "typingText"
        );

    }, 500);
});

/* typing */
function typeText(text, id) {
    let i = 0;
    const el = document.getElementById(id);
    el.innerHTML = "";

    function t() {
        if (i < text.length) {
            if (text[i] === "\n") {
                el.innerHTML += "<br>";
            } else {
                el.innerHTML += text[i];
            }
            i++;
            setTimeout(t, 40);
        }
    }

    t();
}

/* page flip */
function nextPage() {
    const page = document.getElementById("page" + currentPage);

    if (page) {
        page.classList.add("flipped");
        currentPage++;
    }

    // 🎉 final message popup
    if (currentPage === 6) {
        showEnding();
    }
}

/* ending */
function showEnding() {
    const msg = document.createElement("div");

    msg.innerHTML = "💖 More to come... 💖";
    msg.style.position = "fixed";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.fontSize = "40px";
    msg.style.color = "#ff4d6d";
    msg.style.zIndex = "9999";

    document.body.appendChild(msg);
}
