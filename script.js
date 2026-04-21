document.addEventListener("DOMContentLoaded", () => {

  setTimeout(()=>document.getElementById("intro").style.display="none",1500);

  let count = 0;

  const tapBtn = document.getElementById("tapBtn");
  const tapCount = document.getElementById("tapCount");
  const gameBox = document.getElementById("gameBox");
  const giftContainer = document.getElementById("giftContainer");
  const gift = document.getElementById("giftImage");
  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");
  const menu = document.getElementById("menu");

  const funny = [
    "That was fast 😂",
    "You are too curious 😏",
    "Wait… almost there 😌",
    "Okay now real surprise 💫"
  ];

  tapBtn.onclick = () => {
    count++;
    tapCount.innerText = `Taps: ${count}`;

    if(count >= 5){
      gameBox.style.display = "none";
      giftContainer.classList.remove("hidden");
    }
  };

  gift.onclick = () => {

    gift.src = "image/gift-open.PNG";

    setTimeout(()=>{
      giftContainer.style.display="none";
      funSection.classList.remove("hidden");

      let i=0;
      funText.innerText = funny[i];

      const int = setInterval(()=>{
        i++;
        if(i<funny.length){
          funText.innerText = funny[i];
        } else clearInterval(int);
      },2000);

    },1000);
  };

  window.continueAfterFun = () => {
    funSection.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  window.openScrapbook = () => {
    window.location.href = "scrapbook.html";
  };

  window.openVideo = () => {
    const now = new Date();
    const unlockDate = new Date("2026-05-12T00:00:00");

    if(now >= unlockDate){
      window.location.href = "video.html";
    } else {
      alert("🎁 Unlocks on Birthday!");
    }
  };

});
