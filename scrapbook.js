let current=0;
const pages=document.querySelectorAll(".page");

function nextPage(){
if(current<pages.length){
pages[current].classList.add("flipped");
current++;
}
}

function prevPage(){
if(current>0){
current--;
pages[current].classList.remove("flipped");
}
}

function goHome(){
window.location.href="index.html";
}
