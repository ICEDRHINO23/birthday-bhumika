function addPage() {

  const type = document.getElementById("type").value;
  const file = document.getElementById("fileInput").files[0];
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;

  if (!file) {
    alert("Please select a file ❌");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {

    const src = e.target.result; // base64 image/video

    let data = JSON.parse(localStorage.getItem("scrapbook")) || [];

    data.push({ type, src, title, text });

    localStorage.setItem("scrapbook", JSON.stringify(data));

    alert("Page Added ✅");
  };

  reader.readAsDataURL(file);
}

function setVideo() {

  const file = document.getElementById("videoInput").files[0];

  if (!file) {
    alert("Select a video ❌");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    localStorage.setItem("video", e.target.result);
    alert("Video Saved 🎥");
  };

  reader.readAsDataURL(file);
}
