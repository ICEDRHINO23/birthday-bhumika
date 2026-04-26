const folders = [
  "memory1","memory2","memory3","memory4","memory5","memory6",
  "memory7","memory8","memory9","memory10","memory11","memory12"
];

const gallery = document.getElementById("gallery");

// 👉 how many images per folder
const imagesPerFolder = 10; // change if needed

folders.forEach(folder => {

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
