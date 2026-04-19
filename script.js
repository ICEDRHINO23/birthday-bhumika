/* 🌌 BASE */
body {
  margin: 0;
  overflow: hidden;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: radial-gradient(circle at top, #1a1a2e, #0f0f1a 70%);
}

/* ✨ STAR CANVAS */
#stars {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 🖱 CURSOR GLOW */
#cursorGlow {
  position: fixed;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255,77,109,0.4), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 20;
  transform: translate(-50%, -50%);
}

/* 🎬 INTRO */
#intro {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #0f0f1a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  z-index: 25;
}

/* 😂 TEXT */
#funText {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d6d;
  padding: 10px;
  border-radius: 10px;
  z-index: 15;
}

/* 🎁 3D GIFT */
#gift {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotateX(15deg);
  cursor: pointer;
}

.box {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #ff4d6d, #ff2e55);
  transform: translateZ(20px);
  border-radius: 12px;
}

.lid {
  width: 100%;
  height: 35px;
  background: #c9184a;
  position: absolute;
  top: -35px;
  transform-origin: top;
  transform: translateZ(25px);
  border-radius: 10px;
}

/* 👑 GLASS UI */
#menu,
#timerPage,
#videoPage {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) perspective(1000px) rotateX(5deg);
  padding: 35px;
  border-radius: 20px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  z-index: 10;
  text-align: center;
}

/* BUTTON */
button {
  padding: 12px 22px;
  margin: 10px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg,#ff4d6d,#ff758f);
  color: white;
  cursor: pointer;
}

/* TIMER */
#bigTimer {
  font-size: 40px;
  color: gold;
  text-shadow: 0 0 20px gold;
}

/* 📖 BOOK */
#book {
  display: none;
  width: 800px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 2000px;
}

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  border-radius: 14px;
}

/* FINAL */
#final {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 14px;
}
