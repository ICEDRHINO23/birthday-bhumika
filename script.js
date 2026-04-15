body {
    margin: 0;
    overflow: hidden;
    font-family: Arial;
    background: #0f0f1a;
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
    font-size: 32px;
    z-index: 10;
    animation: fadeOut 3s forwards 2s;
}

@keyframes fadeOut {
    to {
        opacity: 0;
        visibility: hidden;
    }
}

/* 🎉 FLOATING ITEMS */
.bg span {
    position: absolute;
    font-size: 30px;
    animation: floatUp linear infinite;
    opacity: 0.7;
}

@keyframes floatUp {
    from { transform: translateY(100vh); }
    to { transform: translateY(-120vh); }
}

/* 🎁 GIFT */
#gift {
    width: 140px;
    height: 140px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 5;
}

/* box */
.box {
    width: 100%;
    height: 100%;
    background: #ff4d6d;
    border-radius: 8px;
}

/* ribbon */
.box::before {
    content: "";
    width: 20px;
    height: 100%;
    background: gold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.box::after {
    content: "";
    height: 20px;
    width: 100%;
    background: gold;
    position: absolute;
    top: 50%;
}

/* lid */
.lid {
    width: 100%;
    height: 35px;
    background: #c9184a;
    position: absolute;
    top: -35px;
    transition: 0.5s;
}

/* open */
.open .lid {
    transform: rotateX(120deg);
}

/* 😂 TEXT */
#funText {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4d6d;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 16px;
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
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    background: white;
    border-radius: 10px;
}

.left, .right {
    width: 50%;
    padding: 10px;
}

img, video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.page.flipped {
    transform: rotateY(-150deg);body {
    margin: 0;
    overflow: hidden;
    font-family: Arial;
    background: #0f0f1a;
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
    font-size: 32px;
    z-index: 10;
    animation: fadeOut 3s forwards 2s;
}

@keyframes fadeOut {
    to {
        opacity: 0;
        visibility: hidden;
    }
}

/* 🎉 FLOATING ITEMS */
.bg span {
    position: absolute;
    font-size: 30px;
    animation: floatUp linear infinite;
    opacity: 0.7;
}

@keyframes floatUp {
    from { transform: translateY(100vh); }
    to { transform: translateY(-120vh); }
}

/* 🎁 GIFT */
#gift {
    width: 140px;
    height: 140px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 5;
}

/* box */
.box {
    width: 100%;
    height: 100%;
    background: #ff4d6d;
    border-radius: 8px;
}

/* ribbon */
.box::before {
    content: "";
    width: 20px;
    height: 100%;
    background: gold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.box::after {
    content: "";
    height: 20px;
    width: 100%;
    background: gold;
    position: absolute;
    top: 50%;
}

/* lid */
.lid {
    width: 100%;
    height: 35px;
    background: #c9184a;
    position: absolute;
    top: -35px;
    transition: 0.5s;
}

/* open */
.open .lid {
    transform: rotateX(120deg);
}

/* 😂 TEXT */
#funText {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4d6d;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 16px;
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
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    background: white;
    border-radius: 10px;
}

.left, .right {
    width: 50%;
    padding: 10px;
}

img, video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.page.flipped {
    transform: rotateY(-150deg);
}

/* 💌 FINAL */
#final {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
    color: white;
}
}

/* 💌 FINAL */
#final {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
    color: white;
}
