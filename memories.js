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

  /* 👉 OPEN NEW PAGE */
  btn.onclick = () => {
    window.location.href =
      `album.html?folder=${mem.folder}&title=${encodeURIComponent(mem.name)}`;
  };

  albumContainer.appendChild(btn);
});

/* HOME BUTTON */
function goHome() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 300);
}
function goBack() {
  window.history.back();
}

function goHome() {
  window.location.href = "index.html";
}
