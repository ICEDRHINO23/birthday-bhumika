// CONFIG: Your folders
const memoryFolders = [
  "memory1",
  "memory2",
  "memory3",
  "memory4",
  "memory5",
  "memory6",
  "memory7",
  "memory8",
  "memory9",
  "memory10",
  "memory11",
  "memory12"
];

// Images per folder (adjust if needed)
const imagesPerFolder = 10;

const gallery = document.getElementById("gallery");

// Generate memories
memoryFolders.forEach(folder => {

  for (let i = 1; i <= imagesPerFolder; i++) {

    const div = document.createElement("div");
    div.className = "polaroid";

    div.innerHTML = `
      <img src="./assets/images/${folder}/${i}.jpg">
      <p>${folder} 💖</p>
    `;

    gallery.appendChild(div);
  }

});
