/* =========================
   CONFIG
========================= */
const TOKEN = "YOUR_GITHUB_TOKEN"; // 🔥 replace this
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
   FILE PREVIEW
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
   ADD PAGE (UPLOAD TO GITHUB)
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

    /* 1️⃣ Convert to base64 */
    const base64 = await fileToBase64(file);

    /* 2️⃣ Create unique file path */
    const filePath = `scrapbook/${Date.now()}-${file.name}`;

    /* 3️⃣ Upload media file */
    await uploadToGitHub(filePath, base64.split(",")[1], "upload media");

    /* 4️⃣ Get existing JSON */
    const { content, sha } = await getFile(DATA_FILE);

    let data = content ? JSON.parse(atob(content)) : [];

    /* 5️⃣ Add new entry */
    data.push({
      type: file.type.startsWith("video") ? "video" : "image",
      src: `./${filePath}`,
      title: title,
      text: text
    });

    /* 6️⃣ Update JSON file */
    await uploadToGitHub(
      DATA_FILE,
      btoa(JSON.stringify(data, null, 2)),
      "update scrapbook data",
      sha
    );

    alert("Uploaded to GitHub ✅");

    /* CLEAR FORM */
    fileInput.value = "";
    titleInput.value = "";
    textInput.value = "";
    preview.innerHTML = "";

  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }

});

/* =========================
   HELPERS
========================= */

/* Convert file to base64 */
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

/* Get file from GitHub */
async function getFile(path) {

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: {
      Authorization: `token ${TOKEN}`
    }
  });

  if (res.status === 404) {
    return { content: null, sha: null };
  }

  const data = await res.json();

  return {
    content: data.content,
    sha: data.sha
  };
}

/* Upload / Update file */
async function uploadToGitHub(path, content, message, sha = null) {

  const body = {
    message: message,
    content: content,
    branch: BRANCH
  };

  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(err);
    throw new Error("GitHub upload failed");
  }
}
