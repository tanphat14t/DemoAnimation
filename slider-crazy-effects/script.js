console.log("running");
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carouselDom = document.querySelector(".carousel");
let listItemDom = document.querySelector(".carousel .list");
let thumbnailDom = document.querySelector(".carousel .thumbnail");

nextDom.onclick = function () {
  showSlider("next");
};
prevDom.onclick = function () {
  showSlider("prev");
};
let timingRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
  nextDom.click();
}, timeAutoNext);
function showSlider(type) {
  let itemSlider = document.querySelectorAll(".carousel .list .item");
  let thumbnailSlider = document.querySelectorAll(".carousel .thumbnail .item");
  if (type == "next") {
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(thumbnailSlider[0]);
    carouselDom.classList.add("next");
  } else {
    let positionLast = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[positionLast]);
    thumbnailDom.prepend(thumbnailSlider[positionLast]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timingRunning);
  clearTimeout(runAutoRun);
  runAutoRun = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}
