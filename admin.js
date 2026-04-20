/* =========================
   CONFIG (VERY IMPORTANT)
========================= */
const TOKEN = "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"; // ⚠️ required
const REPO = "ICEDRHINO23/birthday-bhumika";
const FILE_PATH = "data/scrapbook.json";
const BRANCH = "main";

/* =========================
   ELEMENTS
========================= */
const fileInput = document.getElementById("fileInput");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const preview = document.getElementById("preview");
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
   GET EXISTING FILE (WITH SHA)
========================= */
async function getFile() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `token ${TOKEN}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch file");

  return res.json();
}

/* =========================
   ADD PAGE
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

    /* 1️⃣ READ FILE */
    const reader = new FileReader();

    reader.onload = async function (e) {

      const base64Media = e.target.result;

      /* 2️⃣ GET EXISTING JSON */
      const fileData = await getFile();

      const content = atob(fileData.content);
      let json = JSON.parse(content);

      /* 3️⃣ ADD NEW PAGE */
      json.push({
        type: file.type.startsWith("video") ? "video" : "image",
        src: base64Media,
        title: title,
        text: text
      });

      /* 4️⃣ UPDATE FILE */
      const updateRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: "Added scrapbook page",
            content: btoa(JSON.stringify(json, null, 2)),
            sha: fileData.sha,
            branch: BRANCH
          })
        }
      );

      if (updateRes.ok) {
        alert("Uploaded successfully ✅");
        location.reload();
      } else {
        alert("Upload failed ❌");
        console.error(await updateRes.json());
      }

    };

    reader.readAsDataURL(file);

  } catch (err) {
    console.error(err);
    alert("Error ❌");
  }

});

/* =========================
   LOGOUT
========================= */
function logout() {
  window.location.href = "index.html";
}
