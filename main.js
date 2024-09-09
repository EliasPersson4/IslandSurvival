const bgElement = document.querySelector(".bg")
function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".jpg)"
}

Relocate("deep_forest")