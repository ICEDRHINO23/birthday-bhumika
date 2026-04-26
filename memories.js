const memoryData = [
  { name: "Icecream Meetup 🍦", folder: "memory1" },
  { name: "KFC 1 🍗", folder: "memory2" },
  { name: "Teaspot ☕", folder: "memory3" },
  { name: "Mumbai Nightout 🌃", folder: "memory4" },
  { name: "Tipsy Turtle 🐢", folder: "memory5" },
  { name: "KFC 2 🍗", folder: "memory6" },
  { name: "KFC Birthday 🎂", folder: "memory7" },
  { name: "Birthday Boy 🎉", folder: "memory8" },
  { name: "Backyard Palms 🌴", folder: "memory9" },
  { name: "FC Social 🍹", folder: "memory10" },
  { name: "School Pics 📚", folder: "memory11" }
];

const albumContainer = document.getElementById("albums");

/* CREATE BUTTONS */
memoryData.forEach(mem => {
  const btn = document.createElement("div");
  btn.className = "album-btn";
  btn.innerText = mem.name;

  btn.onclick = () => openAlbum(mem.folder, mem.name);

  albumContainer.appendChild(btn);
});

/* OPEN POLAROID GRID */
function openAlbum(folder, title) {

  const viewer = document.createElement("div");
  viewer.className = "viewer";

  const close = document.createElement("div");
  close.className = "close-btn";
  close.innerHTML = "✖";
  close.onclick = () => viewer.remove();

  const heading = document.createElement("h2");
  heading.innerText = title;
  heading.style.color = "white";
  heading.style.marginTop = "20px";

  const container = document.createElement("div");
  container.className = "polaroid-container";

  viewer.appendChild(close);
  viewer.appendChild(heading);
  viewer.appendChild(container);

  document.body.appendChild(viewer);

  /* LOAD MAX 12 IMAGES */
  for (let i = 1; i <= 12; i++) {

    const card = document.createElement("div");
    card.className = "polaroid";

    /* RANDOM ROTATION (SCATTER EFFECT) */
    card.style.transform = `rotate(${Math.random()*10 - 5}deg)`;

    card.innerHTML = `
      <img src="./assets/images/${folder}/${i}.jpg">
      <p>${title} 💖</p>
    `;

    container.appendChild(card);
  }
}
