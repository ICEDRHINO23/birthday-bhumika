document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const gift = document.getElementById("giftImage");
  const giftContainer = document.getElementById("giftContainer");
  const bigMessage = document.getElementById("bigMessage");
  const menu = document.getElementById("menu");
  const book = document.getElementById("book");
  const music = document.getElementById("bgMusic");
  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");
  const bigTimer = document.getElementById("bigTimer");

  /* =========================
     DATE LOCK
  ========================= */
  const unlockDate = new Date("2026-05-12T00:00:00+05:30").getTime();

  /* =========================
     INTRO
  ========================= */
  setTimeout(() => {
    document.getElementById("intro")?.remove();
  }, 2000);

  /* =========================
     ADMIN PANEL
  ========================= */
  adminBtn?.addEventListener("click", () => {
    adminPanel?.classList.toggle("open");
  });

  loginBtn?.addEventListener("click", () => {
    const u = document.getElementById("user")?.value.trim();
    const p = document.getElementById("pass")?.value.trim();

    if (u === "abin" && p === "1234") {
      window.location.href = "admin.html";
    } else {
      alert("Wrong ❌");
    }
  });

  /* =========================
     TIMER (HOME)
  ========================= */
  setInterval(() => {

    if (!bigTimer) return;

    let gap = unlockDate - Date.now();

    if (gap <= 0) {
      bigTimer.innerHTML = "🎉 It's Time 🎂";
      return;
    }

    let d = Math.floor(gap/(1000*60*60*24));
    let h = Math.floor((gap/(1000*60*60))%24);
    let m = Math.floor((gap/(1000*60))%60);
    let s = Math.floor((gap/1000)%60);

    bigTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

  }, 1000);

  /* =========================
     GIFT SYSTEM
  ========================= */
  let unlocked = false;
  setTimeout(()=> unlocked = true, 2000);

  gift?.addEventListener("click", () => {

    if (!unlocked) return alert("Wait 😄");

    gift.src = "./image/gift-open.png";

    /* MUSIC */
    if (music) {
      music.volume = 0;
      music.play().catch(()=>{});

      let v = 0;
      let fade = setInterval(()=>{
        v += 0.05;
        music.volume = v;
        if(v >= 1) clearInterval(fade);
      },200);
    }

    /* BIG MESSAGE */
    setTimeout(()=>{
      bigMessage?.classList.add("show");
    },800);

    /* MENU */
    setTimeout(()=>{
      giftContainer.style.display = "none";
      menu?.classList.remove("hidden");
    },2200);

  });

});


/* =========================
   NAVIGATION
========================= */
window.openPage = function(type){

  const menu = document.getElementById("menu");
  const book = document.getElementById("book");

  const unlockDate = new Date("2026-05-12T00:00:00+05:30").getTime();

  /* 🔒 VIDEO LOCK */
  if(type === "video"){
    if(Date.now() < unlockDate){
      alert("🔒 Unlocks on May 12 🎂");
      return;
    }
    window.location.href = "video.html";
    return;
  }

  /* RESET */
  menu?.classList.add("hidden");
  book?.classList.add("hidden");

  if(type === "book"){
    book?.classList.remove("hidden");
    loadScrapbook();
  }
};


/* =========================
   BACK
========================= */
window.goBack = function(){
  document.getElementById("book")?.classList.add("hidden");
  document.getElementById("menu")?.classList.remove("hidden");
};


/* =========================
   SCRAPBOOK FINAL (5 PAGE)
========================= */
async function loadScrapbook(){

  const container = document.getElementById("pagesContainer");
  if(!container) return;

  container.innerHTML = "Loading...";

  try{

    const res = await fetch(
      "https://raw.githubusercontent.com/ICEDRHINO23/birthday-bhumika/main/data/scrapbook.json?nocache=" + Date.now()
    );

    const data = await res.json();

    container.innerHTML = "";

    if(!data.length){
      container.innerHTML = "<h2>No memories yet 💔</h2>";
      return;
    }

    /* 🎯 LIMIT TO 5 */
    const pagesData = data.slice(0,5);

    /* 💬 FRIENDSHIP TEXT */
    const texts = [

      `Some people enter life quietly…  
but slowly they become part of everything.  
That’s how this started — simple, real, effortless.`,

      `Not every friendship gives comfort…  
but this one did.  
Even silence felt understood.`,

      `Memories were never planned…  
they just happened.  
And somehow, they stayed.`,

      `Some bonds don’t need explanation.  
They just exist… strong and constant.`,

      `Not loud, not obvious…  
but something that quietly stays,  
no matter what changes.`
    ];

    pagesData.forEach((item,i)=>{

      const div = document.createElement("div");
      div.className = "spread";

      const media = item.type === "video"
        ? `<video src="${item.src}" controls></video>`
        : `<img src="${item.src}">`;

      div.innerHTML = `
        <div class="left">${media}</div>
        <div class="right">
          <h2>Memory ${i+1}</h2>
          <p>${texts[i]}</p>
        </div>
      `;

      container.appendChild(div);
    });

    setTimeout(()=> showPage(0),100);

  }catch(err){
    container.innerHTML = "Failed ❌";
    console.error(err);
  }
}


/* =========================
   PAGE FLIP
========================= */
let current = 0;

function showPage(i){

  const pages = document.querySelectorAll(".spread");

  pages.forEach((p,index)=>{
    p.classList.remove("active","flip");

    if(index < i) p.classList.add("flip");
  });

  if(pages[i]){
    pages[i].classList.add("active");
  }

  current = i;
}

function nextPage(){
  const pages = document.querySelectorAll(".spread");
  if(current < pages.length - 1){
    showPage(current + 1);
  }
}

function prevPage(){
  if(current > 0){
    showPage(current - 1);
  }
}
