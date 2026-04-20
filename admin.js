/* =========================
   CONFIG
========================= */
const TOKEN = "YOUR_GITHUB_TOKEN"; // 🔥 replace
const REPO = "ICEDRHINO23/birthday-bhumika";
const BRANCH = "main";

const DATA_FILE = "data/scrapbook.json";

/* =========================
   ELEMENTS
========================= */
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const addBtn = document.getElementById("addBtn");

/* =========================
   PREVIEW
========================= */
fileInput.addEventListener("change", () => {

  const file = fileInput.files[0];
  preview.innerHTML = "";

  if (!file) return;

  const url = URL.createObjectURL(file);

  if (file.type.startsWith("video")) {
    preview.innerHTML = `<video src="${url}" controls></video>`;
  } else {
    preview.innerHTML = `<img src="${url}">`;
  }

});

/* =========================
   ADD PAGE (GITHUB ONLY)
========================= */
addBtn.addEventListener("click", async () => {

  const file = fileInput.files[0];
  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (!file || !title || !text) {
    alert("Fill all fields ❌");
    return;
  }

  try {

    // 1️⃣ Convert file
    const base64 = await fileToBase64(file);

    const filePath = `scrapbook/${Date.now()}-${file.name}`;

    // 2️⃣ Upload media
    await uploadFile(filePath, base64.split(",")[1]);

    // 3️⃣ Get JSON
    const { content, sha } = await getFile(DATA_FILE);

    let data = content ? JSON.parse(atob(content)) : [];

    // 4️⃣ Push new item
    data.push({
      type: file.type.startsWith("video") ? "video" : "image",
      src: `./${filePath}`,
      title: title,
      text: text
    });

    // 5️⃣ Update JSON
    await updateJSON(data, sha);

    alert("Uploaded to GitHub ✅");

  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }

});

/* =========================
   HELPERS
========================= */

function fileToBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function getFile(path) {

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: { Authorization: `token ${TOKEN}` } }
  );

  if (res.status === 404) {
    return { content: null, sha: null };
  }

  const data = await res.json();

  return {
    content: data.content,
    sha: data.sha
  };
}

async function uploadFile(path, content) {

  await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "upload media",
      content: content,
      branch: BRANCH
    })
  });
}

async function updateJSON(data, sha) {

  await fetch(`https://api.github.com/repos/${REPO}/contents/${DATA_FILE}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "update scrapbook",
      content: btoa(JSON.stringify(data, null, 2)),
      sha: sha,
      branch: BRANCH
    })
  });
}
