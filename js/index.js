"use strict"

const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", menuSlide);

fetchFunction("https://teaching.maumt.se/apis/SR/v1/?series", "GET");
