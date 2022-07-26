window.addEventListener('load', function() {

    let img1 = document.getElementById("img1")
    let img2 = document.getElementById("img2")
    let img3 = document.getElementById("img3")
    let container1 = document.getElementById("gallerycont1")
    let container2 = document.getElementById("gallerycont2")
    let container3 = document.getElementById("gallerycont3")


container1.addEventListener("click", function(){
  img1.style.display = "block"
  img2.style.display = "none"
  img3.style.display = "none" 
  container3.style.border = "solid 1px rgb(238, 235, 235)"
  container2.style.border = "solid 1px rgb(238, 235, 235)"
  container1.style.border ="solid 2px #59359c"
  container1.st
})  

container2.addEventListener("click", function() {
img1.style.display = "none"
img2.style.display = "block"
img3.style.display = "none"
container1.style.border = "solid 1px rgb(238, 235, 235)"
container2.style.border = "solid 2px #59359c"
container3.style.border ="solid 1px rgb(238, 235, 235)"
});

container3.addEventListener("click", function(){
  img1.style.display = "none"
  img2.style.display = "none"
  img3.style.display = "block" 
  container1.style.border = "solid 1px rgb(238, 235, 235)"
  container2.style.border = "solid 1px rgb(238, 235, 235)"
  container3.style.border ="solid 2px #59359c"
})
     
  
  });