const gift = document.getElementById("gift");
const book = document.getElementById("book");
const fun = document.getElementById("funText");

let canOpen = false;
let current = 1;

const msgs = ["😂 Catch me!", "Try again!", "Not yet!"];

setTimeout(() => {
    moveGift();
}, 4000);

/* 🎁 move */
function moveGift() {

    let count = 0;

    let interval = setInterval(() => {
        gift.style.left = Math.random()*80 + "%";
        gift.style.top = Math.random()*80 + "%";

        fun.innerText = msgs[Math.floor(Math.random()*msgs.length)];

        count++;

        if(count > 10){
            clearInterval(interval);
            gift.style.left = "50%";
            gift.style.top = "50%";
            canOpen = true;
        }

    }, 800);
}

/* open */
gift.addEventListener("click", () => {
    if(!canOpen) return;

    gift.classList.add("open");

    setTimeout(()=>{
        gift.style.display = "none";
        book.style.display = "block";

        typeText("Dear Bhumika 💖 Happy Birthday!", "typing");
    },500);
});

/* typing */
function typeText(text, id){
    let i=0;
    let el = document.getElementById(id);

    function t(){
        if(i<text.length){
            el.innerHTML += text[i++];
            setTimeout(t,40);
        }
    }
    t();
}

/* flip */
function next(){
    let page = document.getElementById("p"+current);

    if(page){
        page.classList.add("flipped");
        current++;
    }

    if(current===4){
        document.getElementById("final").style.display="block";
    }
}
