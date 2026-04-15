document.addEventListener("DOMContentLoaded", () => {

    const gift = document.getElementById("gift");
    const book = document.getElementById("book");
    const fun = document.getElementById("funText");

    let canOpen = false;
    let current = 1;
    let typingDone = false;

    const msgs = ["😂 Catch me!", "Not so easy!", "Try again!"];

    // 🎬 enable gift mode after intro
    setTimeout(() => {
        document.body.classList.add("gift-mode");
        canOpen = true;
    }, 4000);

    /* 🎁 MOVE ONLY ON HOVER */
    gift.addEventListener("mouseenter", () => {
        if (!canOpen) return;

        let x = Math.random() * (window.innerWidth - 150);
        let y = Math.random() * (window.innerHeight - 150);

        gift.style.transition = "0.4s";
        gift.style.left = x + "px";
        gift.style.top = y + "px";
        gift.style.transform = "none";

        fun.innerText = msgs[Math.floor(Math.random() * msgs.length)];
    });

    /* 🎁 OPEN */
    gift.addEventListener("click", () => {

        gift.classList.add("open");

        setTimeout(() => {
            gift.style.display = "none";
            book.style.display = "block";

            startTyping(current);

        }, 500);
    });

    /* ✍️ TYPEWRITER */
    function startTyping(page) {

        typingDone = false;

        const texts = {
            1: "Dear Bhumika 💖\n\nYou are truly special.\nThis is just the beginning 😊",
            2: "Every memory with you feels warm and unforgettable ✨",
            3: "You deserve happiness, smiles and beautiful moments always 🎉"
        };

        const el = document.getElementById("text" + page);
        el.innerHTML = "";

        let i = 0;

        function type() {
            if (i < texts[page].length) {

                if (texts[page][i] === "\n") {
                    el.innerHTML += "<br>";
                } else {
                    el.innerHTML += texts[page][i];
                }

                i++;
                setTimeout(type, 40);
            } else {
                typingDone = true;
            }
        }

        type();
    }

    /* 📖 CLICK RIGHT SIDE TO FLIP */
    document.querySelectorAll(".right").forEach((el) => {

        el.addEventListener("click", () => {

            if (!typingDone) return;

            let page = document.getElementById("p" + current);

            if (page) {
                page.classList.add("flipped");
                current++;
            }

            if (current <= 3) {
                startTyping(current);
            } else {
                setTimeout(() => {
                    book.style.display = "none";
                    document.getElementById("final").style.display = "block";
                }, 800);
            }

        });

    });

});
