let index = 0;

const pages = [
  { type: "cover" },

  { type: "image", src: "scrapbook/1.jpg" },
  { type: "image", src: "scrapbook/2.jpg" },
  { type: "image", src: "scrapbook/3.jpg" },
  { type: "video", src: "scrapbook/4.mp4" },
  { type: "end" }
];

const texts = [
  "",
  "Some people don’t enter life loudly… they just slowly become important. That’s how this started — quietly, naturally, without effort.",
  
  "Not every friendship brings peace… but this one did. There was always comfort, even in silence, even without trying.",
  
  "There were moments that didn’t feel big then… but now they stay. Small things turned into meaningful memories.",
  
  "Some memories don’t fade… they just settle inside quietly. And no matter what changes, some bonds just remain.",
  
  "Maybe this was never meant to be loud… but it became something meaningful. And that’s enough."
];

const container = document.getElementById("pageContent");

/* ===============================
   RENDER PAGE
=============================== */
function renderPage() {

  const page = pages[index];

  if (!page) return;

  if (page.type === "cover") {
    container.innerHTML = `
      <div class="page">
        <div class="front cover">
          <h2>🎂 Happy Birthday Bhoomika 🎉</h2>
          <p>Something special, just for you 💫</p>
        </div>
      </div>
    `;
    return;
  }

  if (page.type === "end") {
    container.innerHTML = `
      <div class="page">
        <div class="front">
          <div class="left">
            <img src="scrapbook/image.jpg">
          </div>
          <div class="right">
            <p>Wait for the real gifts 🎁✨</p>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      alert("🎁 More surprises are waiting for you...");
    }, 800);

    return;
  }

  container.innerHTML = `
    <div class="page">
      <div class="front">

        <div class="left">
          ${
            page.type === "video"
            ? `<video src="${page.src}" controls muted></video>`
            : `<img src="${page.src}" onerror="this.src='image/bhoomika.jpg'">`
          }
        </div>

        <div class="right">
          <p>${texts[index]}</p>
        </div>

      </div>
    </div>
  `;
}

/* ===============================
   NAVIGATION
=============================== */
function nextPage() {
  if (index < pages.length - 1) {
    index++;
    renderPage();
  }
}

function prevPage() {
  if (index > 0) {
    index--;
    renderPage();
  }
}

function goHome() {
  window.location.href = "index.html";
}

/* ===============================
   INIT
=============================== */
renderPage();
