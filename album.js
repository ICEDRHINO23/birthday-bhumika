const urlParams = new URLSearchParams(window.location.search);
const folder = urlParams.get("folder");
const title = urlParams.get("title");

document.getElementById("albumTitle").innerText = title;

const stack = document.getElementById("stack");

let total = 12;

/* CREATE STACK */
for (let i = total; i >= 1; i--) {

  const card = document.createElement("div");
  card.className = "card";

  card.style.zIndex = i;

  card.innerHTML = `
    <img src="./assets/images/${folder}/${i}.jpg">
    <p>${title} 💖</p>
  `;

  /* CLICK TO REMOVE */
  card.onclick = () => {

    card.style.transform = "translateX(200px) rotate(20deg)";
    card.style.opacity = "0";

    setTimeout(() => {
      card.remove();
    }, 300);
  };

  stack.appendChild(card);
}

/* BACK BUTTON */
function goBack() {
  window.history.back();
}
