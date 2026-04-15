document.addEventListener("DOMContentLoaded", () => {

    const bg = document.getElementById("bg");
    const gift = document.getElementById("gift");
    const book = document.getElementById("book");
    const fun = document.getElementById("funText");

    let canOpen = false;
    let current = 1;
    let typingDone = false;

    const msgs = ["😂 Catch me!", "Too slow!", "Try again!"];

    /* 🎬 AFTER INTRO */
    setTimeout(() => {
        document.body.classList.add("gift-mode");
        canOpen = true;
    }, 4000);

    /* 🎉 BACKGROUND ELEMENTS */
    const emojis = ["🎈","🎂","🎉","🎁","🎀"];

    for (let i = 0; i < 40; i++) {
        let el = document.createElement("span");
        el.innerText = emojis[Math.floor(Math.random()*emojis.length)];

        el.style.left = Math.random()*100 + "%";
        el.style.fontSize = (25 + Math.random()*40) + "px";
        el.style.animationDuration = (6 + Math.random()*10) + "s";

        bg.appendChild(el);
    }

    /* 🧠 SMART GIFT MOVEMENT (CURSOR NEAR) */
    document.addEventListener("mousemove", (e) => {

        if (!canOpen) return;

        const rect = gift.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width/2);
        const dy = e.clientY - (rect.top + rect.height/2);

        const distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < 150) {

            let x = Math.random() * (window.innerWidth - 160);
            let y = Math.random() * (window.innerHeight - 160);

            gift.style.transition = "0.4s";
            gift.style.left = x + "px";
            gift.style.top = y + "px";
            gift.style.transform = "none";

            fun.innerText = msgs[Math.floor(Math.random()*msgs.length)];
        }
    });

    /* 🎁 OPEN GIFT */
    gift.addEventListener("click", () => {

        if (!canOpen) return;

        gift.classList.add("open");

        setTimeout(() => {
            gift.style.display = "none";
            book.style.display = "block";

            startTyping(current);
        }, 500);
    });

    /* ✍️ TYPEWRITER FUNCTION */
    function startTyping(page) {

        typingDone = false;

        const texts = {
            1: "Dear Bhumika 💖\n\nYou are truly special.\nThis is just the beginning 😊",
            2: "Every memory with you feels warm and unforgettable ✨",
            3: "You deserve happiness, smiles and beautiful moments always 🎉"
        };

        const el = document.getElementById("text" + page);

        if (!el) return;

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

    /* 📖 PAGE FLIP */
    function handleFlip() {

        if (!typingDone) return;

        const page = document.getElementById("p" + current);

        if (!page) return;

        page.classList.add("flipped");

        current++;

        if (current <= 3) {

            setTimeout(() => {
                startTyping(current);
            }, 400);

        } else {

            setTimeout(() => {
                book.style.display = "none";
                document.getElementById("final").style.display = "block";
            }, 800);
        }
    }

    /* 🎯 CLICK ONLY RIGHT SIDE */
    book.addEventListener("click", (e) => {

        const right = e.target.closest(".right");

        if (!right) return;

        handleFlip();
    });

});
