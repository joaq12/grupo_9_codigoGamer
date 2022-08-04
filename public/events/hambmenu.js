


const hambMenu = document.querySelector("#hamb__lines")
const span1 = document.querySelector("span#line1")
const span3 = document.querySelector("span#line3")
let menu = document.getElementById("menu__items")
menu.style.display="none"


hambMenu.addEventListener("click", ()=>{
    hambMenu.classList.toggle("active");
    menu.style.display="block"

menu.addEventListener("mouseover", ()=>{
    menu.style.display="block"
    hambMenu.classList.add("active")
})

menu.addEventListener("mouseout", ()=>{
    hambMenu.classList.remove("active");
    menu.style.display="none"
})






})