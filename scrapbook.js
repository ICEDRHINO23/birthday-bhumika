document.addEventListener("DOMContentLoaded", () => {

  const book = document.getElementById("book");
  const container = document.getElementById("pagesContainer");

  let current = 0;

  /* =========================
     DATA
  ========================= */
  const pages = [
    { type: "image", src: "./scrapbook/1.jpg" },
    { type: "image", src: "./scrapbook/2.jpg" },
    { type: "image", src: "./scrapbook/3.jpg" },
    { type: "video", src: "./scrapbook/4.mp4" },
    { type: "image", src: "./scrapbook/5.jpg" }
  ];

  const texts = [
    "There are people who enter quietly… but slowly become part of everything. You became that comfort without even trying.",

    "Our conversations were never planned… but they always felt real. And in a world full of noise, that meant everything.",

    "Some friendships don’t need daily talks… they stay strong silently. And that’s exactly what makes them special.",

    "We never gave this a name… but somewhere between laughs and random talks, it became something meaningful.",

    "Not everything needs words… some things are just felt. And whatever this is, it’s something I truly value. Maybe this isn’t the end… just something waiting ahead."
  ];

  /* =========================
     CREATE PAGES (STACK)
  ========================= */
  pages.forEach((p, i) => {

    const page = document.createElement("div");
    page.className = "page";
    page.style.zIndex = pages.length - i;

    page.innerHTML = `
      <div class="front">

        <div class="left">
          ${
            p.type === "video"
              ? `<video src="${p.src}" autoplay muted loop controls></video>`
              : `<img src="${p.src}" />`
          }
        </div>

        <div class="right">
          ${
            i === pages.length - 1
              ? `<h2>Wait for the real gifts 🎁✨</h2><p>${texts[i]}</p>`
              : `<p>${texts[i]}</p>`
          }
        </div>

      </div>
    `;

    container.appendChild(page);
  });

  const allPages = document.querySelectorAll(".page");

  /* =========================
     COVER CLICK
  ========================= */
  const cover = document.getElementById("cover");

  cover.addEventListener("click", () => {
    cover.classList.add("flipped");
    current = 0;
  });

  /* =========================
     NEXT
  ========================= */
  window.nextPage = function () {

    if (current < allPages.length) {
      allPages[current].classList.add("flipped");
      current++;
    }
  };

  /* =========================
     PREV
  ========================= */
  window.prevPage = function () {

    if (current > 0) {
      current--;
      allPages[current].classList.remove("flipped");
    } else {
      cover.classList.remove("flipped");
    }
  };

  /* =========================
     BACK
  ========================= */
  window.goHome = function () {
    window.location.href = "index.html";
  };

});
