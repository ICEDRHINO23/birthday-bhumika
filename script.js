document.addEventListener("DOMContentLoaded", () => {

    const bg = document.getElementById("bg");
    const gift = document.getElementById("gift");
    const book = document.getElementById("book");
    const fun = document.getElementById("funText");

    let canOpen = false;
    let allowMove = true;
    let current = 1;
    let typingDone = false;

    const msgs = [
        "😂 Catch me!",
        "Too slow 😜",
        "Not yet!",
        "Hehe try again!"
    ];

    /* 🎬 START */
    setTimeout(() => {
        document.body.classList.add("gift-mode");
        canOpen = true;
    }, 4000);

    /* 🎉 BACKGROUND */
    const emojis = ["🎈","🎂","🎉","🎁","🎀"];

    for (let i = 0; i < 40; i++) {
        let el = document.createElement("span");
        el.innerText = emojis[Math.floor(Math.random()*emojis.length)];

        el.style.left = Math.random()*100 + "%";
        el.style.fontSize = (25 + Math.random()*40) + "px";
        el.style.animationDuration = (6 + Math.random()*10) + "s";

        bg.appendChild(el);
    }

    /* 🧠 MOVE FUNCTION */
    function moveGift() {
        if (!allowMove) return;

        let x = Math.random() * (window.innerWidth - 160);
        let y = Math.random() * (window.innerHeight - 160);

        gift.style.left = x + "px";
        gift.style.top = y + "px";
        gift.style.transform = "none";

        showMessage(msgs[Math.floor(Math.random()*msgs.length)]);
    }

    /* 😂 MESSAGE */
    function showMessage(text) {
        fun.innerText = text;
        fun.style.opacity = "1";

        setTimeout(() => {
            fun.style.opacity = "0";
        }, 1500);
    }

    /* 🎁 STOP AFTER 20 SEC */
    setTimeout(() => {
        allowMove = false;

        gift.style.left = "50%";
        gift.style.top = "50%";
        gift.style.transform = "translate(-50%, -50%)";

        showMessage("🎁 Now you can open me ❤️");

    }, 20000);

    /* 🎯 MOVEMENT TRIGGERS */
    gift.addEventListener("mouseenter", () => {
        if (canOpen) moveGift();
    });

    gift.addEventListener("touchstart", () => {
        if (canOpen) moveGift();
    });

    document.addEventListener("mousemove", (e) => {

        if (!canOpen || !allowMove) return;

        const rect = gift.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width/2);
        const dy = e.clientY - (rect.top + rect.height/2);

        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 120) moveGift();
    });

    /* 🎁 OPEN */
    gift.addEventListener("click", () => {

        if (!canOpen) return;

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

                showMessage("👉 Click right side to flip");
            }
        }

        type();
    }

    /* 📖 FLIP */
    function handleFlip() {

        if (!typingDone) return;

        const page = document.getElementById("p" + current);

        if (!page) return;

        page.classList.add("flipped");

        current++;

        if (current <= 3) {
            setTimeout(() => startTyping(current), 400);
        } else {
            setTimeout(() => {
                book.style.display = "none";

                showFinal();
            }, 800);
        }
    }

    /* CLICK RIGHT SIDE */
    book.addEventListener("click", (e) => {
        if (!e.target.closest(".right")) return;
        handleFlip();
    });

    /* 💌 FINAL WITH REFRESH */
    function showFinal() {

        const final = document.getElementById("final");

        final.innerHTML = `
            💌 More to go but need to wait...<br><br>
            <button onclick="location.reload()" style="
                padding:10px 20px;
                background:#ff4d6d;
                color:white;
                border:none;
                border-radius:8px;
                cursor:pointer;
                font-size:16px;
            ">Restart Surprise 🔄</button>
        `;

        final.style.display = "block";
    }

});
