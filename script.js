document.addEventListener("DOMContentLoaded", () => {

const gift = document.getElementById("giftImage");
const bigMessage = document.getElementById("bigMessage");
const menu = document.getElementById("menu");
const music = document.getElementById("bgMusic");

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");

/* ADMIN */
adminBtn.onclick = () => {
  adminPanel.classList.toggle("open");
};

/* LOGIN */
document.getElementById("loginBtn").onclick = () => {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u==="abin" && p==="1234"){
    window.location.href = "admin.html";
  } else alert("Wrong");
};

/* GIFT */
gift.onclick = () => {

  gift.src = "./image/gift-open.PNG";

  music.volume = 0;
  music.play();

  let v = 0;
  let fade = setInterval(()=>{
    v+=0.05;
    music.volume=v;
    if(v>=1) clearInterval(fade);
  },200);

  setTimeout(()=>{
    bigMessage.classList.add("show");
  },1500);

  setTimeout(()=>{
    document.getElementById("giftContainer").style.display="none";
    menu.classList.remove("hidden");
  },3000);
};

/* HEARTS */
setInterval(()=>{
  let h=document.createElement("div");
  h.className="heart";
  h.innerHTML="💖";
  h.style.left=Math.random()*100+"vw";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),4000);
},500);

});
