const bgElement = document.querySelector(".bg")
const travelElement = document.querySelector(".travel")

function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".png)"
}
const locations = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"]
Relocate("deep_forest")
