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
  { folder: "memory2", title: "KFC 1", captions: Array(12).fill("🍗 KFC memories") },
  { folder: "memory3", title: "Chai Gossip", captions: Array(12).fill("☕ Chai time") },
  { folder: "memory4", title: "Mumbai Crazy Ride", captions: Array(12).fill("🚗 Crazy ride") },
  { folder: "memory5", title: "Tipsy Turtle", captions: Array(12).fill("🍹 Fun night") },
  { folder: "memory6", title: "KFC 2", captions: Array(12).fill("🍗 Again KFC 😄") },
  { folder: "memory7", title: "Bday @ KFC", captions: Array(12).fill("🎂 Birthday vibes") },
  { folder: "memory8", title: "Bday Boy", captions: Array(12).fill("🎉 Birthday boy") },
  { folder: "memory9", title: "Backyard Palms", captions: Array(12).fill("🌴 Chill time") },
  { folder: "memory10", title: "FC Social", captions: Array(12).fill("🍽️ FC Social") },
  { folder: "memory11", title: "School Days", captions: Array(12).fill("🏫 Old memories") }
];

/* =========================
   🎵 MUSIC DATA
========================= */
const songs = [
  "assets/audio/mem1.mp3",
  "assets/audio/mem2.mp3"
];

const memoryMusicMap = {
  memory1: 0, memory2: 0, memory3: 0,
  memory4: 1, memory5: 1, memory6: 1,
  memory7: 1, memory8: 1, memory9: 1,
  memory10: 1, memory11: 1
};

let currentSong = 0;
let player = null;

/* =========================
   🚀 INIT (SAFE)
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const buttonsContainer = document.querySelector(".memory-buttons");
  const viewer = document.getElementById("viewer");
  const stack = document.getElementById("polaroidStack");

  player = document.getElementById("memoryMusic");

  /* =========================
     🎯 CREATE BUTTONS (CLEAN)
  ========================= */
  buttonsContainer.innerHTML = ""; // avoid duplicates

  memories.forEach(mem => {
    const btn = document.createElement("button");
    btn.innerText = mem.title;
    btn.onclick = () => openMemory(mem.folder);
    buttonsContainer.appendChild(btn);
  });

  /* =========================
     🎵 MUSIC SYSTEM
  ========================= */

  if (player) {

    document.addEventListener("click", () => {
      player.src = songs[currentSong];
      player.play().catch(()=>{});
    }, { once: true });

    player.addEventListener("ended", () => {
      currentSong = (currentSong + 1) % songs.length;
      player.src = songs[currentSong];
      player.play().catch(()=>{});
    });
  }

  /* =========================
     📸 OPEN MEMORY
  ========================= */
  window.openMemory = function(folder) {

    stack.innerHTML = "";
    viewer.classList.remove("hidden");

    const memory = memories.find(m => m.folder === folder);

    for (let i = 1; i <= 12; i++) {

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

    /* 🎵 SWITCH MUSIC */
    if (player) {
      currentSong = memoryMusicMap[folder] ?? 0;
      player.src = songs[currentSong];
      player.play().catch(()=>{});
    }
  };

  /* =========================
     🧠 STACK LOGIC
  ========================= */
  function setupStack() {

    const cards = Array.from(document.querySelectorAll(".polaroid-card"));
    let current = 0;

    cards.forEach((card, i) => {
      card.style.zIndex = cards.length - i;
    });

    cards.forEach((card, index) => {

      card.addEventListener("click", () => {

        if (index !== current) return;

        card.classList.add("active");

        setTimeout(() => {

          card.style.zIndex = 0;
          card.classList.remove("active");

          current++;

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
  window.closeViewer = function() {
    viewer.classList.add("hidden");
  };

  /* =========================
     🏠 HOME
  ========================= */
  window.goHome = function() {
    window.location.href = "index.html";
  };

});
