/* =========================
   CONFIG
========================= */
const TOKEN = "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";   // 🔥 your new token
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
const updateBtn = document.getElementById("updateBtn");

let editIndex = null;

/* =========================
   PREVIEW
========================= */
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  preview.innerHTML = "";

  if (!file) return;

  const url = URL.createObjectURL(file);

  preview.innerHTML = file.type.startsWith("video")
    ? `<video src="${url}" controls></video>`
    : `<img src="${url}">`;
});

/* =========================
   GET FILE FROM GITHUB
========================= */
async function getFileData(){
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `token ${TOKEN}` } }
  );

  if(!res.ok) throw new Error("Fetch failed");

  return res.json();
}

/* =========================
   SAVE FILE TO GITHUB
========================= */
async function saveFile(json, sha){

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Updated scrapbook",
        content: btoa(JSON.stringify(json, null, 2)),
        sha: sha,
        branch: BRANCH
      })
    }
  );

  if(!res.ok){
    console.error(await res.json());
    alert("GitHub update failed ❌");
    return false;
  }

  return true;
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

  const reader = new FileReader();

  reader.onload = async function(e){

    const fileData = await getFileData();
    let json = JSON.parse(atob(fileData.content));

    json.push({
      type: file.type.startsWith("video") ? "video" : "image",
      src: e.target.result,
      title,
      text
    });

    const success = await saveFile(json, fileData.sha);

    if(success){
      alert("Added ✅");
      location.reload();
    }

  };

  reader.readAsDataURL(file);

});

/* =========================
   LOAD EXISTING DATA (FOR EDIT)
========================= */
async function loadData(){

  const fileData = await getFileData();
  const json = JSON.parse(atob(fileData.content));

  const list = document.getElementById("list");
  list.innerHTML = "";

  json.forEach((item, index)=>{

    const div = document.createElement("div");

    div.innerHTML = `
      <b>${item.title}</b><br>
      <button onclick="editPage(${index})">Edit</button>
      <button onclick="deletePage(${index})">Delete</button>
      <hr>
    `;

    list.appendChild(div);

  });

}

window.onload = loadData;

/* =========================
   EDIT PAGE
========================= */
window.editPage = async function(index){

  const fileData = await getFileData();
  const json = JSON.parse(atob(fileData.content));

  const item = json[index];

  titleInput.value = item.title;
  textInput.value = item.text;

  preview.innerHTML = item.type === "video"
    ? `<video src="${item.src}" controls></video>`
    : `<img src="${item.src}">`;

  editIndex = index;

  alert("Now click UPDATE button ✏️");
};

/* =========================
   UPDATE PAGE
========================= */
updateBtn.addEventListener("click", async () => {

  if(editIndex === null){
    alert("Select page first ❌");
    return;
  }

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  const fileData = await getFileData();
  let json = JSON.parse(atob(fileData.content));

  json[editIndex].title = title;
  json[editIndex].text = text;

  const success = await saveFile(json, fileData.sha);

  if(success){
    alert("Updated ✅");
    location.reload();
  }

});

/* =========================
   DELETE PAGE
========================= */
window.deletePage = async function(index){

  if(!confirm("Delete this page? ❌")) return;

  const fileData = await getFileData();
  let json = JSON.parse(atob(fileData.content));

  json.splice(index,1);

  const success = await saveFile(json, fileData.sha);

  if(success){
    alert("Deleted 🗑️");
    location.reload();
  }

};
