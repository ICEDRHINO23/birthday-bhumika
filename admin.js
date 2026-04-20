/* =========================
   CONFIG
========================= */
const TOKEN ="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"; // 🔥 replace
const REPO = "ICEDRHINO23/birthday-bhumika";
const FILE = "data/scrapbook.json";

let editIndex = null;

/* =========================
   ELEMENTS
========================= */
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const list = document.getElementById("list");

/* =========================
   PREVIEW
========================= */
fileInput.onchange = () => {
  const file = fileInput.files[0];
  preview.innerHTML = "";

  if (!file) return;

  const url = URL.createObjectURL(file);

  preview.innerHTML = file.type.startsWith("video")
    ? `<video src="${url}" controls></video>`
    : `<img src="${url}">`;
};

/* =========================
   BASE64
========================= */
function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

/* =========================
   GET DATA FROM GITHUB
========================= */
async function getData() {

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    headers: { Authorization: `token ${TOKEN}` }
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(err);
    alert("❌ GitHub Auth Failed (Check Token)");
    throw new Error("Auth failed");
  }

  return await res.json();
}

/* =========================
   SAVE DATA TO GITHUB
========================= */
async function saveData(data, sha) {

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "update scrapbook",
      content: btoa(JSON.stringify(data, null, 2)),
      sha: sha
    })
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(err);
    alert("❌ Failed to update JSON");
    return false;
  }

  return true;
}

/* =========================
   ADD PAGE
========================= */
addBtn.onclick = async () => {

  const file = fileInput.files[0];
  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (!file || !title || !text) {
    alert("Fill all fields ❌");
    return;
  }

  try {

    const base64 = await toBase64(file);
    const filePath = `scrapbook/${Date.now()}-${file.name}`;

    /* UPLOAD MEDIA */
    const uploadRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "upload media",
        content: base64.split(",")[1]
      })
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.json();
      console.error(err);
      alert("❌ Media upload failed");
      return;
    }

    /* GET EXISTING JSON */
    const fileData = await getData();

    let data = [];

    try {
      data = JSON.parse(atob(fileData.content));
    } catch {
      data = [];
    }

    /* ADD NEW */
    data.push({
      type: file.type.startsWith("video") ? "video" : "image",
      src: `./${filePath}`,
      title,
      text
    });

    const success = await saveData(data, fileData.sha);

    if (success) {
      alert("Added ✅");
      location.reload();
    }

  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }
};

/* =========================
   LOAD LIST
========================= */
async function loadList() {

  try {

    const fileData = await getData();

    let data = [];

    try {
      data = JSON.parse(atob(fileData.content));
    } catch {
      data = [];
    }

    list.innerHTML = "";

    data.forEach((item, i) => {

      list.innerHTML += `
        <div>
          <b>${item.title}</b><br>
          <button onclick="editPage(${i})">Edit</button>
          <button onclick="deletePage(${i})">Delete</button>
          <hr>
        </div>
      `;

    });

  } catch (err) {
    console.error(err);
  }
}

loadList();

/* =========================
   EDIT
========================= */
window.editPage = async (i) => {

  const fileData = await getData();
  const data = JSON.parse(atob(fileData.content));

  const item = data[i];

  titleInput.value = item.title;
  textInput.value = item.text;

  preview.innerHTML = item.type === "video"
    ? `<video src="${item.src}" controls></video>`
    : `<img src="${item.src}">`;

  editIndex = i;

  alert("Now click UPDATE ✏️");
};

/* =========================
   UPDATE
========================= */
updateBtn.onclick = async () => {

  if (editIndex === null) {
    alert("Select page first ❌");
    return;
  }

  const fileData = await getData();
  let data = JSON.parse(atob(fileData.content));

  data[editIndex].title = titleInput.value.trim();
  data[editIndex].text = textInput.value.trim();

  const success = await saveData(data, fileData.sha);

  if (success) {
    alert("Updated ✅");
    location.reload();
  }
};

/* =========================
   DELETE
========================= */
window.deletePage = async (i) => {

  if (!confirm("Delete this page?")) return;

  const fileData = await getData();
  let data = JSON.parse(atob(fileData.content));

  data.splice(i, 1);

  const success = await saveData(data, fileData.sha);

  if (success) {
    alert("Deleted 🗑️");
    location.reload();
  }
};

/* =========================
   LOGOUT
========================= */
function logout() {
  window.location.href = "index.html";
}
