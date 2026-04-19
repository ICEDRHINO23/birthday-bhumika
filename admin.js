function addPage() {

  const type = document.getElementById("type").value;
  const src = document.getElementById("src").value;
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;

  let data = JSON.parse(localStorage.getItem("scrapbook")) || [];

  data.push({ type, src, title, text });

  localStorage.setItem("scrapbook", JSON.stringify(data));

  alert("Page Added ✅");
}

function setVideo() {

  const videoSrc = document.getElementById("videoSrc").value;

  localStorage.setItem("video", videoSrc);

  alert("Video Saved 🎥");
}
