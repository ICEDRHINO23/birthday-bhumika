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

  btn.onclick = () => openAlbum(mem.folder);

  albumContainer.appendChild(btn);
});

/* OPEN VIEWER */
function openAlbum(folder) {

  const viewer = document.createElement("div");
  viewer.className = "viewer";

  const close = document.createElement("div");
  close.className = "close-btn";
  close.innerHTML = "✖";
  close.onclick = () => viewer.remove();

  const stack = document.createElement("div");
  stack.className = "stack";

  const caption = document.createElement("div");
  caption.className = "caption";

  viewer.appendChild(close);
  viewer.appendChild(stack);
  viewer.appendChild(caption);

  document.body.appendChild(viewer);

  let index = 1;

  function showImage() {

    stack.innerHTML = "";

    const img = document.createElement("img");
    img.src = `./assets/images/${folder}/${index}.jpg`;

    caption.innerText = `Memory ${index} 💖`;

    stack.appendChild(img);
  }

  viewer.onclick = () => {
    index++;

    if (index > 20) {  // adjust max images if needed
      viewer.remove();
    } else {
      showImage();
    }
  };

  showImage();
}
