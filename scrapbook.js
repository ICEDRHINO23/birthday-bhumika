let current = 0;
const pages = document.querySelectorAll(".page");

function nextPage() {

  if (current < pages.length) {
    pages[current].classList.add("flipped");
    current++;

    // 🎁 END MESSAGE AFTER LAST PAGE
    if (current === pages.length) {
      setTimeout(() => {
        alert("🎁 Wait for the real gifts… something more is coming ✨");
      }, 800);
    }
  }
}

function prevPage() {
  if (current > 0) {
    current--;
    pages[current].classList.remove("flipped");
  }
}

function goHome() {
  window.location.href = "index.html";
}
