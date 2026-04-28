/* =========================
   📁 MEMORY DATA
========================= */
const memories = [
  { folder: "memory1", title: "Icecream & We Scream" },
  { folder: "memory2", title: "KFC 1" },
  { folder: "memory3", title: "Chai Gossip" },
  { folder: "memory4", title: "Mumbai Crazy Ride" },
  { folder: "memory5", title: "Tipsy Turtle" },
  { folder: "memory6", title: "KFC 2" },
  { folder: "memory7", title: "Bday @ KFC" },
  { folder: "memory8", title: "Bday Boy" },
  { folder: "memory9", title: "Backyard Palms" },
  { folder: "memory10", title: "FC Social" },
  { folder: "memory11", title: "School Days" }
];

/* =========================
   📦 ELEMENTS
========================= */
const buttonsContainer = document.getElementById("memoryButtons");
const viewer = document.getElementById("viewer");
const stack = document.getElementById("polaroidStack");

/* =========================
   🎯 CREATE BUTTONS
========================= */
memories.forEach(mem => {

  const btn = document.createElement("button");
  btn.innerText = mem.title;

  btn.onclick = () => openMemory(mem.folder);

  buttonsContainer.appendChild(btn);
});

/* =========================
   📸 OPEN MEMORY
========================= */
function openMemory(folder) {

  stack.innerHTML = ""; // clear old cards
  viewer.classList.remove("hidden");

  const totalImages = 5; // 👉 change if needed

  for (let i = 1; i <= totalImages; i++) {

    const card = document.createElement("div");
    card.className = "polaroid-card";

    card.innerHTML = `
      <img src="./image/${folder}/${i}.jpg" />
    `;

    stack.appendChild(card);
  }

  setupStack();
}

/* =========================
   🧠 STACK LOGIC
========================= */
function setupStack() {

  const cards = document.querySelectorAll(".polaroid-card");

  let current = 0;

  cards.forEach((card, index) => {

    /* STACK ORDER */
    card.style.zIndex = cards.length - index;

    /* CLICK EVENT */
    card.addEventListener("click", () => {

      if (index !== current) return;

      card.classList.add("active");

      current++;

      /* RESET AFTER LAST */
      if (current >= cards.length) {
        setTimeout(() => {
          cards.forEach(c => c.classList.remove("active"));
          current = 0;
        }, 1200);
      }

    });

  });

}

/* =========================
   ❌ CLOSE VIEWER
========================= */
function closeViewer() {
  viewer.classList.add("hidden");
}
