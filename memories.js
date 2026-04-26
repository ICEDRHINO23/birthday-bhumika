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

/* OPEN ALBUM VIEWER */
function openAlbum(folder) {

  const viewer = document.createElement("div");
  viewer.className = "viewer";

  const close = document.createElement("div");
  close.innerHTML = "✖";
  close.style.position = "absolute";
  close.style.top = "20px";
  close.style.right = "20px";
  close.style.color = "white";
  close.style.fontSize = "24px";
  close.style.cursor = "pointer";

  close.onclick = () => viewer.remove();

  const stack = document.createElement("div");
  stack.style.position = "relative";

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

    img.style.width = "300px";
    img.style.borderRadius = "10px";
    img.style.boxShadow = "0 15px 30px rgba(0,0,0,0.6)";

    stack.appendChild(img);

    caption.innerText = `Memory ${index} 💖`;
  }

  viewer.onclick = () => {
    index++;

    if (index > 20) {
      viewer.remove();
    } else {
      showImage();
    }
  };

  showImage();
}
