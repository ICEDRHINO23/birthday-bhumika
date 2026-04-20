document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SAFE ELEMENT FETCH
  ========================= */
  const gift = document.getElementById("giftImage");
  const bigMessage = document.getElementById("bigMessage");
  const menu = document.getElementById("menu");
  const music = document.getElementById("bgMusic");

  const adminBtn = document.getElementById("adminBtn");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  const giftContainer = document.getElementById("giftContainer");

  /* =========================
     DEBUG CHECK (IMPORTANT)
  ========================= */
  console.log("Gift:", gift);
  console.log("Menu:", menu);
  console.log("LoginBtn:", loginBtn);

  /* =========================
     ADMIN PANEL TOGGLE
  ========================= */
  if (adminBtn && adminPanel) {
    adminBtn.addEventListener("click", () => {
      adminPanel.classList.toggle("open");
    });
  }

  /* =========================
     LOGIN FIX
  ========================= */
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      const u = userInput?.value.trim();
      const p = passInput?.value.trim();

      if (u === "abin" && p === "1234") {
        window.location.href = "admin.html";
      } else {
        alert("Wrong credentials ❌");
      }

    });
  }

  /* =========================
     GIFT SYSTEM (FIXED)
  ========================= */
  let unlocked = false;

  setTimeout(() => {
    unlocked = true;
  }, 2000);

  if (gift) {
    gift.addEventListener("click", () => {

      console.log("Gift clicked");

      if (!unlocked) {
        alert("Wait a second 😄");
        return;
      }

      /* CHANGE IMAGE */
      gift.src = "./image/gift-open.PNG";

      /* MUSIC SAFE PLAY */
      if (music) {
        music.volume = 0;
        music.play().catch(() => {});

        let v = 0;
        let fade = setInterval(() => {
          v += 0.05;
          music.volume = v;
          if (v >= 1) clearInterval(fade);
        }, 200);
      }

      /* BIG MESSAGE */
      if (bigMessage) {
        setTimeout(() => {
          bigMessage.classList.add("show");
        }, 1000);
      }

      /* MENU SHOW */
      setTimeout(() => {
        if (giftContainer) giftContainer.style.display = "none";
        if (menu) menu.classList.remove("hidden");
      }, 2500);

    });
  }

  /* =========================
     HEARTS (SAFE)
  ========================= */
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "💖";
    h.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(h);

    setTimeout(() => h.remove(), 4000);
  }, 600);

});
