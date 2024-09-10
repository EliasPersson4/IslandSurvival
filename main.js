const bgElement = document.querySelector(".bg")
const travelElement = document.querySelector(".travel-menu")
const locationElement = document.querySelector(".location")
const locations = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"]

function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".png)"
}

locations.forEach(element => {
    let listElement = document.createElement("li")
    listElement.className = "dropdown-item"

    let buttonElement = document.createElement("button")
    buttonElement.textContent = element
    buttonElement.className = "btn btn-secondary travel-btn w-100"
    buttonElement.addEventListener("click", function(){
        Relocate(buttonElement.textContent)
        locationElement.innerHTML = buttonElement.textContent.replace("_", " ")
    })
    
    listElement.appendChild(buttonElement)
    travelElement.appendChild(listElement)
});