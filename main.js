const bgElement = document.querySelector(".bg")

const healthElement = document.querySelector(".health")
let health = 90
const foodElement = document.querySelector(".food")
let food = 100
const waterElement = document.querySelector(".water")
let water = 60

const travelElement = document.querySelector(".travel-menu")
const locationElement = document.querySelector(".location")
const audioElement = document.querySelector(".music")
const locations = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"]
let currentLocation = "beach"

function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".png)"
}

function UpdateStats(){
    healthElement.style.width = health+"%"
    foodElement.style.width = food+"%"
    waterElement.style.width = water+"%"
}

UpdateStats()

locations.forEach(element => {
    let listElement = document.createElement("li")
    listElement.className = "dropdown-item"

    let buttonElement = document.createElement("button")
    buttonElement.textContent = element.replace("_", " ")
    buttonElement.className = "btn btn-secondary travel-btn w-100"
    buttonElement.addEventListener("click", function(){

        Relocate(buttonElement.textContent.replace(" ", "_"))

        audioElement.setAttribute("src", "mp3/"+buttonElement.textContent.replace(" ", "_")+".mp3")
        
        locationElement.innerHTML = buttonElement.textContent
        
        currentLocation = buttonElement.textContent
    })

    listElement.appendChild(buttonElement)
    travelElement.appendChild(listElement)
});

let isPlaying = true;

function togglePlay() {
    isPlaying ? audioElement.muted = true : audioElement.muted = false
    isPlaying = !isPlaying
};

document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", function(){
        var audio = new Audio('mp3/button'+(1+Math.floor(Math.random()*3))+'.mp3');
        audio.play()

    })
});

document.querySelector(".music-toggle").addEventListener("click", togglePlay)