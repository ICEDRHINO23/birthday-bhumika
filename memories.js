/* =========================
   📁 MEMORY LIST WITH CAPTIONS
========================= */
const memories = [
  {
    folder: "memory1",
    title: "Icecream & We Scream",
    captions: [
      "🍦 First icecream together",
      "😂 That silly moment",
      "💖 You laughing",
      "✨ Perfect day",
      "📸 Random click",
      "❤️ Favorite memory",
      "😄 Fun time",
      "💫 Special moment",
      "🥰 Cute smile",
      "🌟 Unforgettable",
      "💭 Just us",
      "💖 Always special"
    ]
  },
  {
    folder: "memory2",
    title: "KFC 1",
    captions: Array(12).fill("🍗 KFC memories")
  },
  {
    folder: "memory3",
    title: "Chai Gossip",
    captions: Array(12).fill("☕ Chai time")
  },
  {
    folder: "memory4",
    title: "Mumbai Crazy Ride",
    captions: Array(12).fill("🚗 Crazy ride")
  },
  {
    folder: "memory5",
    title: "Tipsy Turtle",
    captions: Array(12).fill("🍹 Fun night")
  },
  {
    folder: "memory6",
    title: "KFC 2",
    captions: Array(12).fill("🍗 Again KFC 😄")
  },
  {
    folder: "memory7",
    title: "Bday @ KFC",
    captions: Array(12).fill("🎂 Birthday vibes")
  },
  {
    folder: "memory8",
    title: "Bday Boy",
    captions: Array(12).fill("🎉 Birthday boy")
  },
  {
    folder: "memory9",
    title: "Backyard Palms",
    captions: Array(12).fill("🌴 Chill time")
  },
  {
    folder: "memory10",
    title: "FC Social",
    captions: Array(12).fill("🍽️ FC Social")
  },
  {
    folder: "memory11",
    title: "School Days",
    captions: Array(12).fill("🏫 Old memories")
  }
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

  stack.innerHTML = "";
  viewer.classList.remove("hidden");

  const memory = memories.find(m => m.folder === folder);
  const totalImages = 12;

  for (let i = 1; i <= totalImages; i++) {

    const card = document.createElement("div");
    card.className = "polaroid-card";

    const captionText = memory.captions[i - 1] || "💖 Memory";

    card.innerHTML = `
      <img src="assets/images/${folder}/${i}.jpg" />
      <p class="caption">${captionText}</p>
    `;

    stack.appendChild(card);
  }

  setupStack();
}

/* =========================
   🧠 STACK LOGIC (FIXED)
========================= */
function setupStack() {

  const cards = Array.from(document.querySelectorAll(".polaroid-card"));
  let current = 0;

  /* INITIAL STACK ORDER */
  cards.forEach((card, i) => {
    card.style.zIndex = cards.length - i;
  });

  cards.forEach((card, index) => {

    card.addEventListener("click", () => {

      if (index !== current) return;

      /* ANIMATE UP */
      card.classList.add("active");

      setTimeout(() => {

        /* SEND TO BACK */
        card.style.zIndex = 0;
        card.classList.remove("active");

        current++;

        /* RESET STACK */
        if (current >= cards.length) {
          current = 0;

          cards.forEach((c, i) => {
            c.style.zIndex = cards.length - i;
          });
        }

      }, 500);

    });

  });

}

/* =========================
   ❌ CLOSE VIEWER
========================= */
function closeViewer() {
  viewer.classList.add("hidden");
}
function goHome() {
  window.location.href = "index.html";
}
/* 🎵 MEMORY MUSIC SYSTEM */
const songs = [
  "assets/audio/mem1.mp3",
  "assets/audio/mem2.mp3"
];

let currentSong = 0;
let player = null;

document.addEventListener("DOMContentLoaded", () => {
  player = document.getElementById("memoryMusic");

  if (!player) return;

  // autoplay first after interaction
  document.addEventListener("click", () => {
    player.src = songs[currentSong];
    player.play().catch(()=>{});
  }, { once: true });

  // auto next song
  player.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    player.src = songs[currentSong];
    player.play().catch(()=>{});
  });
});
