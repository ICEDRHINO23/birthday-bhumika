document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS (SAFE)
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
  const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

  function isUnlocked(){
    return Date.now() >= unlockDate;
  }

  /* =========================
     INTRO
  ========================= */
  setTimeout(() => {
    document.getElementById("intro")?.remove();
  }, 2000);

  /* =========================
     ADMIN PANEL
  ========================= */
  if(adminBtn && adminPanel){
    adminBtn.onclick = () => adminPanel.classList.toggle("open");
  }

  if(loginBtn){
    loginBtn.onclick = () => {
      let u = document.getElementById("user")?.value.trim();
      let p = document.getElementById("pass")?.value.trim();

      if (u === "abin" && p === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong ❌");
      }
    };
  }

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

  },1000);

  /* =========================
     GIFT SYSTEM
  ========================= */
  let unlocked = false;
  setTimeout(()=> unlocked = true, 2000);

  if(gift){
    gift.onclick = () => {

      if (!unlocked) return alert("Wait 😄");

      gift.src = "./image/gift-open.PNG";

      /* MUSIC */
      if(music){
        music.volume = 0;
        music.play().catch(()=>{});

        let v=0;
        let fade=setInterval(()=>{
          v+=0.05;
          music.volume=v;
          if(v>=1) clearInterval(fade);
        },200);
      }

      /* MESSAGE */
      setTimeout(()=> bigMessage?.classList.add("show"),1000);

      /* SHOW MENU */
      setTimeout(()=>{
        giftContainer?.style && (giftContainer.style.display="none");
        menu?.classList.remove("hidden");
      },2500);
    };
  }

});


/* =========================
   NAVIGATION (FINAL FIX)
========================= */
window.openPage = function(type){

  const menu = document.getElementById("menu");
  const book = document.getElementById("book");

  const unlockDate = new Date("May 12, 2026 00:00:00").getTime();

  /* 🔒 VIDEO LOCK FIRST */
  if(type==="video"){

    if(Date.now() < unlockDate){
      alert("🔒 Video unlocks on May 12, 12:00 AM 🎂");
      return; // ❗ STOP here
    }

    window.location.href = "video.html";
    return;
  }

  /* NORMAL NAV */
  menu?.classList.add("hidden");
  book?.classList.add("hidden");

  if(type==="book"){
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
   SCRAPBOOK LOAD (FIXED)
========================= */
async function loadScrapbook(){

  const container = document.getElementById("pagesContainer");
  if(!container) return;

  container.innerHTML = "Loading...";

  try{

    /* 🔥 CACHE FIX */
    let res = await fetch(
      "https://raw.githubusercontent.com/ICEDRHINO23/birthday-bhumika/main/data/scrapbook.json?nocache=" + Date.now()
    );

    let data = await res.json();

    container.innerHTML = "";

    if(data.length === 0){
      container.innerHTML = "<h2>No memories yet 💔</h2>";
      return;
    }

    data.forEach((item,index)=>{

      let div = document.createElement("div");
      div.className = "spread";

      let media = item.type==="video"
        ? `<video src="${item.src}" controls class="media"></video>`
        : `<img src="${item.src}" class="media">`;

      div.innerHTML = `
        <div class="left">${media}</div>
        <div class="right">
          <h2>${item.title}</h2>
          <p>${item.text}</p>

          <button onclick="editPage(${index})">Edit</button>
          <button onclick="deletePage(${index})">Delete</button>
        </div>
      `;

      container.appendChild(div);

    });

    showPage(0);

  }catch(e){
    container.innerHTML="Failed to load ❌";
    console.error(e);
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

  if(pages[i]) pages[i].classList.add("active");

  current = i;
}

function nextPage(){
  const pages=document.querySelectorAll(".spread");
  if(current < pages.length-1) showPage(current+1);
}

function prevPage(){
  if(current>0) showPage(current-1);
}


/* =========================
   EDIT / DELETE (PLACEHOLDER)
========================= */
function editPage(index){
  alert("Edit from admin panel 🔐");
}

function deletePage(index){
  alert("Delete from admin panel 🔐");
}
