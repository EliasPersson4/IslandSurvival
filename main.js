const bgElement = document.querySelector(".bg")
function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".png)"
}

Relocate("deep_forest")