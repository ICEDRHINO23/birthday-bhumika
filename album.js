const urlParams = new URLSearchParams(window.location.search);

const folder = urlParams.get("folder");
const title = urlParams.get("title");

document.getElementById("albumTitle").innerText = title;

const stack = document.getElementById("stack");

let maxImages = 12;
let loadedImages = [];

/* =========================
   LOAD IMAGES SAFELY
========================= */
for (let i = 1; i <= maxImages; i++) {

  const img = new Image();

  img.src = `./assets/images/${folder}/${i}.jpg`;

  img.onload = () => {
    loadedImages.push(img.src);

    /* AFTER ALL LOAD ATTEMPTS */
    if (loadedImages.length === countLoaded()) {
      renderStack();
    }
  };

  img.onerror = () => {
    /* ignore missing images */
  };
}

/* COUNT EXISTING IMAGES */
function countLoaded() {
  return loadedImages.length;
}

/* =========================
   RENDER STACK
========================= */
function renderStack() {

  /* reverse → last image on top */
  loadedImages.reverse().forEach((src, index) => {

    const card = document.createElement("div");
    card.className = "card";

    card.style.zIndex = index + 1;

    card.innerHTML = `
      <img src="${src}">
      <p>${title} 💖</p>
    `;

    /* CLICK TO REMOVE */
    card.onclick = () => {

      card.style.transform = "translateX(250px) rotate(25deg)";
      card.style.opacity = "0";

      setTimeout(() => {
        card.remove();
      }, 300);
    };

    stack.appendChild(card);
  });

}

/* =========================
   BACK BUTTON
========================= */
function goBack() {
  window.history.back();
}
