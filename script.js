/* =========================
   CONFIG
========================= */
const TOKEN = "YOUR_GITHUB_TOKEN"; // 🔥 replace
const REPO = "ICEDRHINO23/birthday-bhumika";
const BRANCH = "main";
const DATA_FILE = "data/scrapbook.json";

/* =========================
   LOAD SCRAPBOOK FROM GITHUB
========================= */
async function loadScrapbook() {

  const container = document.getElementById("pagesContainer");
  if (!container) return;

  container.innerHTML = "Loading...";

  try {

    let res = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${DATA_FILE}`);
    let data = await res.json();

    console.log("Scrapbook Data:", data);

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<h2>No memories yet 💔</h2>";
      return;
    }

    data.forEach((item, index) => {

      const page = document.createElement("div");
      page.className = "spread";

      let media = item.type === "image"
        ? `<img src="${item.src}" class="media">`
        : `<video src="${item.src}" controls class="media"></video>`;

      page.innerHTML = `
        <div class="left">${media}</div>

        <div class="right">
          <h2>${item.title}</h2>
          <p>${item.text}</p>

          <div class="actions">
            <button onclick="editPage(${index})">✏️ Edit</button>
            <button onclick="deletePage(${index})">🗑 Delete</button>
          </div>
        </div>
      `;

      container.appendChild(page);
    });

    showPage(0);

  } catch (err) {
    console.error(err);
    container.innerHTML = "Failed to load 💔";
  }
}

/* =========================
   DELETE
========================= */
async function deletePage(index) {

  if (!confirm("Delete this memory? 💔")) return;

  let data = await getData();

  data.splice(index, 1);

  await updateGitHubJSON(data);

  location.reload();
}

/* =========================
   EDIT
========================= */
async function editPage(index) {

  let data = await getData();

  let newTitle = prompt("Edit Title", data[index].title);
  let newText = prompt("Edit Text", data[index].text);

  if (!newTitle || !newText) return;

  data[index].title = newTitle;
  data[index].text = newText;

  await updateGitHubJSON(data);

  location.reload();
}

/* =========================
   GET DATA
========================= */
async function getData() {

  let res = await fetch(`https://api.github.com/repos/${REPO}/contents/${DATA_FILE}`);
  let file = await res.json();

  return JSON.parse(atob(file.content));
}

/* =========================
   UPDATE GITHUB JSON
========================= */
async function updateGitHubJSON(data) {

  let res = await fetch(`https://api.github.com/repos/${REPO}/contents/${DATA_FILE}`);
  let file = await res.json();

  await fetch(`https://api.github.com/repos/${REPO}/contents/${DATA_FILE}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "update scrapbook",
      content: btoa(JSON.stringify(data, null, 2)),
      sha: file.sha
    })
  });
}

/* =========================
   BOOK NAVIGATION
========================= */
let current = 0;

function showPage(i) {

  const pages = document.querySelectorAll(".spread");

  pages.forEach((p, index) => {
    p.classList.remove("active", "flip");

    if (index < i) p.classList.add("flip");
  });

  if (pages[i]) pages[i].classList.add("active");

  current = i;
}

function nextPage() {
  const pages = document.querySelectorAll(".spread");

  if (current < pages.length - 1) {
    showPage(current + 1);
  }
}

function prevPage() {
  if (current > 0) {
    showPage(current - 1);
  }
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", loadScrapbook);
