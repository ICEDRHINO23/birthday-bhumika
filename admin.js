document.addEventListener("DOMContentLoaded", () => {

/* ELEMENTS */
const intro = document.getElementById("intro");
const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

/* INTRO */
setTimeout(() => intro.style.display = "none", 2000);

/* ADMIN TOGGLE */
adminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("open");
});

/* LOGIN FIX (FINAL WORKING) */
loginBtn.addEventListener("click", () => {

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  console.log(user, pass);

  if (user === "abin" && pass === "1234") {

    alert("Login Success ✅");

    // TEST SUCCESS
    document.body.innerHTML = "<h1>Welcome Admin 🎉</h1>";

  } else {
    alert("Wrong credentials ❌");
  }

});

/* =========================
   REST OF YOUR LOGIC
========================= */

});
