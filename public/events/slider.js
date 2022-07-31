const slider = document.getElementById("slider");
let sliderSection = document.querySelectorAll(".slider_section");
let sliderSectionLast = sliderSection[sliderSection.length-1];

const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

slider.insertAdjacentElement("afterbegin", sliderSectionLast)

function next() {
    let sliderSectionFirst = document.querySelectorAll(".slider_section")[0]
    slider.style.marginLeft = "-200%"
    slider.style.transition = "all .8s"
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft = "-100%"
    },800);

}

btnRight.addEventListener("click", ()=>{
    next()
})


function prev() {
    let sliderSection = document.querySelectorAll(".slider_section");
    let sliderSectionLast = sliderSection[sliderSection.length-1];
    slider.style.marginLeft = "0%"
    slider.style.transition = "all .8s"
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast)        
        slider.style.marginLeft = "-100%"
    },800);

}

btnLeft.addEventListener("click", ()=>{
    prev()
})

setInterval(function(){
    next()},
    4000);
