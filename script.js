<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Happy Birthday Bhoomika 🎂</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div id="intro">✨ Loading Surprise... ✨</div>

<button id="adminBtn">☰ My Space</button>

<div id="adminPanel">
  <h3>Login 🔐</h3>
  <input id="user" placeholder="Username">
  <input id="pass" type="password">
  <button id="loginBtn">Enter</button>
</div>

<audio id="bgMusic" src="./audio/music.mp3" loop></audio>

<div id="main">

  <img id="profilePic" src="./image/bhoomika.jpg">

  <h1>Happy Birthday Bhoomika 🎂</h1>

  <!-- 🎮 GAME -->
  <div id="gameBox">
    <h3>🎯 Tap 5 times to unlock surprise</h3>
    <button id="tapBtn">Tap Me</button>
    <p id="tapCount"></p>
  </div>

  <!-- 🎁 GIFT -->
  <div id="giftContainer" class="hidden">
    <img id="giftImage" src="./image/gift-closed.PNG">
  </div>

  <!-- 😂 FUN -->
  <div id="funSection" class="hidden">
    <p id="funText"></p>
    <button onclick="continueAfterFun()">Continue 👉</button>
  </div>

  <!-- MENU -->
  <div id="menu" class="hidden">
    <button onclick="openScrapbook()">📖 Scrapbook</button>
    <button onclick="openVideo()">🎥 Special Video</button>
  </div>

</div>

<script src="script.js"></script>

</body>
</html>
