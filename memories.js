const viewer = document.getElementById("viewer");
const stack = document.getElementById("polaroidStack");

let currentIndex = 0;
let images = [];

/* OPEN MEMORY */
function openMemory(folder) {

  viewer.classList.remove("hidden");
  stack.innerHTML = "";
  currentIndex = 0;

  images = [];

  let i = 1;

  function loadNext() {
    const img = new Image();
    img.src = `assets/images/${folder}/${i}.jpg`;

    img.onload = () => {
      images.push(img.src);
      i++;
      loadNext();
    };

    img.onerror = () => {
      showNextImage();
    };
  }

  loadNext();
}

/* SHOW NEXT IMAGE */
function showNextImage() {

  if (currentIndex >= images.length) return;

  const card = document.createElement("div");
  card.className = "polaroid-card";

  card.innerHTML = `
    <img src="${images[currentIndex]}">
  `;

  card.onclick = () => {
    currentIndex++;
    showNextImage();
  };

  stack.appendChild(card);
}

/* CLOSE */
function closeViewer() {
  viewer.classList.add("hidden");
  stack.innerHTML = "";
}

/* NAV */
function goHome() {
  window.location.href = "index.html";
}
