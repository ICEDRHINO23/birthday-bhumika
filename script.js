document.addEventListener("DOMContentLoaded", () => {

  /* INTRO */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 1500);

  /* ELEMENTS */
  const gift = document.getElementById("giftImage");
  const giftContainer = document.getElementById("giftContainer");
  const menu = document.getElementById("menu");
  const funSection = document.getElementById("funSection");
  const funText = document.getElementById("funText");
  const bigMessage = document.getElementById("bigMessage");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  /* ADMIN */
  if (adminBtn && adminPanel) {
    adminBtn.onclick = () => adminPanel.classList.toggle("open");
  }

  if (loginBtn) {
    loginBtn.onclick = () => {
      if (userInput.value === "abin" && passInput.value === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }
    };
  }

  /* FUN MESSAGES */
  const funnyMessages = [
    "You really thought it's over after opening the gift? 😂",
    "Patience level = 0 I guess 😏",
    "Wait… good things take time 😌",
    "Okay okay… now you're ready for the real surprise 💫"
  ];

  /* GIFT CLICK */
  if (gift) {
    gift.onclick = () => {

      gift.src = "image/gift-open.PNG";

      if (music) music.play().catch(() => {});

      if (bigMessage) bigMessage.style.opacity = "1";

      setTimeout(() => {

        giftContainer.style.display = "none";

        funSection.classList.remove("hidden");

        let i = 0;
        funText.innerText = funnyMessages[i];

        const interval = setInterval(() => {
          i++;
          if (i < funnyMessages.length) {
            funText.innerText = funnyMessages[i];
          } else {
            clearInterval(interval);
          }
        }, 2000);

      }, 1200);
    };
  }

  /* CONTINUE AFTER FUN */
  window.continueAfterFun = function () {
    funSection.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  /* OPEN SCRAPBOOK PAGE */
  window.openScrapbookPage = function () {
    window.location.href = "scrapbook.html";
  };

});
