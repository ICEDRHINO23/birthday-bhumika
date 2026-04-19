/* =========================
   GLOBAL
========================= */
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #f8cdda, #f6d365);
  text-align: center;
  overflow-x: hidden;
}

/* =========================
   INTRO
========================= */
#intro {
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* =========================
   TOP TEXT
========================= */
#funText {
  margin-top: 30px;
  display: inline-block;
  padding: 12px 25px;
  background: linear-gradient(135deg,#ff4d6d,#ff758f);
  color: white;
  border-radius: 25px;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

/* =========================
   GIFT
========================= */
#giftContainer {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#giftContainer::after {
  content: "";
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255,215,0,0.6), transparent);
  filter: blur(40px);
  z-index: -1;
}

#giftImage {
  width: 260px;
  max-width: 90%;
  cursor: pointer;
  transition: 0.5s ease;
  mix-blend-mode: multiply;
  filter: drop-shadow(0 10px 25px rgba(0,0,0,0.3));
}

#giftImage:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 30px gold);
}

.opened {
  transform: scale(1.2);
}

/* =========================
   MENU
========================= */
#menu {
  margin-top: 40px;
}

#menu h2 {
  color: #b30059;
  margin-bottom: 15px;
}

/* =========================
   BUTTONS
========================= */
button {
  margin: 10px;
  padding: 12px 22px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg,#ff4d6d,#ff758f);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

/* =========================
   PAGE CARD
========================= */
#timerPage,
#videoPage,
#book {
  margin: 50px auto;
  width: 90%;
  max-width: 900px;
  background: rgba(255,255,255,0.95);
  padding: 30px;
  border-radius: 25px;
  backdrop-filter: blur(10px);

  box-shadow: 
    0 20px 50px rgba(0,0,0,0.25),
    inset 0 0 20px rgba(255,255,255,0.3);
}

/* =========================
   TIMER
========================= */
#bigTimer {
  font-size: 38px;
  font-weight: bold;
  color: #cc0052;
  margin: 20px 0;
}

/* =========================
   VIDEO
========================= */
video {
  width: 100%;
  max-width: 700px;
  border-radius: 15px;
  box-shadow: 
    0 15px 40px rgba(0,0,0,0.5),
    0 0 20px rgba(255,105,180,0.3);
}

/* =========================
   SCRAPBOOK (2 PAGE BOOK)
========================= */
#book {
  perspective: 1200px;
}

/* CONTAINER */
#pagesContainer {
  width: 100%;
  max-width: 900px;
  margin: auto;
}

/* SPREAD (FIXED PROPERLY) */
.spread {
  display: none;   /* ✅ only hidden initially */

  width: 100%;
  height: 450px;

  gap: 10px;

  background: #fff;
  border-radius: 20px;
  overflow: hidden;

  box-shadow: 0 25px 60px rgba(0,0,0,0.3);
}

/* ACTIVE PAGE */
.spread.active {
  display: flex;   /* ✅ only active shows */
}

/* LEFT SIDE (MEDIA) */
.left {
  width: 50%;
  background: black;

  display: flex;
  justify-content: center;
  align-items: center;
}

.left img,
.left video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* RIGHT SIDE (TEXT) */
.right {
  width: 50%;
  padding: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: left;
}

/* TITLE */
.right h2 {
  color: #ff4d6d;
  margin-bottom: 10px;
}

/* TEXT */
.right p {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
}

/* =========================
   BOOK CONTROLS
========================= */
#bookControls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* =========================
   HIDDEN
========================= */
.hidden {
  display: none;
}
