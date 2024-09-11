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
const interactElement = document.querySelector(".interact-menu")
const hunt_gatherElement = document.querySelector(".hunt-gather-menu")
const locations = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"]
const interactions = ["sleep", "investigate", "stroke_yo_bone"]
const hunt_gather = ["Hunt", "Fish", "Gather"]
let currentLocation = "beach"

function Relocate(location){
    bgElement.style.backgroundImage = "url(img/"+location+".png)"

    audioElement.setAttribute("src", "mp3/"+location+".mp3")

    locationElement.innerHTML = location

    currentLocation = location
}

function UpdateStats(){
    healthElement.style.width = health+"%"
    foodElement.style.width = food+"%"
    waterElement.style.width = water+"%"
}

UpdateStats()

function PopulateDropdown(parent, array, ...extraCss){
    array.forEach(element => {
        let listElement = document.createElement("li")
        listElement.className = "dropdown-item"
        
        let buttonElement = document.createElement("button")
        buttonElement.textContent = element.replace("_", " ")
        buttonElement.className = "btn btn-secondary w-100 "+extraCss
        
        listElement.appendChild(buttonElement)
        parent.appendChild(listElement)
    });
}


PopulateDropdown(interactElement, interactions, "interact-btn")
PopulateDropdown(travelElement, locations, "travel-btn")
PopulateDropdown(hunt_gatherElement,)

document.querySelectorAll(".travel-btn").forEach(element => {
    element.addEventListener("click", function(){
            
        Relocate(element.innerHTML)
        
    })
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