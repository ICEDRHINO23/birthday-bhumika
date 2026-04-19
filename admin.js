/* =========================
   PREVIEW HANDLING
========================= */
const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const previewVideo = document.getElementById("previewVideo");

fileInput.addEventListener("change", () => {

  const file = fileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  if (file.type.startsWith("image")) {
    previewImg.src = url;
    previewImg.style.display = "block";
    previewVideo.style.display = "none";
  } else {
    previewVideo.src = url;
    previewVideo.style.display = "block";
    previewImg.style.display = "none";
  }
});

/* =========================
   ADD SCRAPBOOK PAGE
========================= */
function addPage() {

  const type = document.getElementById("type").value;
  const file = fileInput.files[0];
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;

  if (!file) return alert("Select file ❌");

  const reader = new FileReader();

  reader.onload = function(e) {

    let data = JSON.parse(localStorage.getItem("scrapbook")) || [];

    data.push({
      type,
      src: e.target.result,
      title,
      text
    });

    localStorage.setItem("scrapbook", JSON.stringify(data));

    alert("Page Added ✅");

    location.reload();
  };

  reader.readAsDataURL(file);
}

/* =========================
   VIDEO PREVIEW
========================= */
const videoInput = document.getElementById("videoInput");
const videoPreview = document.getElementById("videoPreview");

videoInput.addEventListener("change", () => {

  const file = videoInput.files[0];
  if (!file) return;

  videoPreview.src = URL.createObjectURL(file);
  videoPreview.style.display = "block";
});

/* =========================
   SAVE VIDEO
========================= */
function setVideo() {

  const file = videoInput.files[0];

  if (!file) return alert("Select video ❌");

  const reader = new FileReader();

  reader.onload = function(e) {
    localStorage.setItem("video", e.target.result);
    alert("Video Saved 🎥");
  };

  reader.readAsDataURL(file);
}
