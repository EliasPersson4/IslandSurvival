const bgElement: HTMLElement | null = document.querySelector(".bg");

const healthElement: HTMLElement | null = document.querySelector(".health");
let health: number = 90;
const foodElement: HTMLElement | null = document.querySelector(".food");
let food: number = 100;
const waterElement: HTMLElement | null = document.querySelector(".water");
let water: number = 60;
const actionsElement: HTMLElement | null = document.querySelector(".actions")
let actions : number = 7

const travelElement: HTMLElement | null = document.querySelector(".travel-menu");
const locationElement: HTMLElement | null = document.querySelector(".location");
const audioElement: HTMLAudioElement | null = document.querySelector(".music");
const interactElement: HTMLElement | null = document.querySelector(".interact-menu");
const huntGatherElement: HTMLElement | null = document.querySelector(".hunt-gather-menu");
const dialogElement: HTMLElement | null = document.querySelector(".main-dialoge")

let visited: string[] = []
const interactions: string[] = ["sleep", "investigate", "stroke_yo_bone"];

let currentLocation: string = "beach";

let inventory: string[] = []

function Relocate(location: string): void {
    if (bgElement) {
        bgElement.style.backgroundImage = `url(img/${location.replace(" ", "_")}.png)`;
    }

    if (audioElement) {
        audioElement.setAttribute("src", `mp3/music/${location.replace(" ", "_")}.mp3`);
    }
    if (locationElement) {
        locationElement.textContent = location;
    }

    currentLocation = location;
    
    getText(location.replace(" ", "_"))
    actions -= 1
    UpdateStats();

}

function randInt(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getText(location: string) : Promise<void> {
    let data
    await fetch("./locations.json").then(response =>{
        return response.json()
    }).then(json => {
        data = json[location]
    })
    let id: number

    if(visited.includes(location)){
        id = randInt(2,4)
    }
    else{
        id = 1
        visited.push(location.replace(" ", "_"))
    }

    const entry = data.description.find(item => item.id === id)
    
    if (dialogElement && entry?.description) {
        dialogElement.innerHTML = entry.description;
    } 
    PopulateDropdown(travelElement, data.connections, "travel-btn")
    document.querySelectorAll(".travel-btn").forEach(element => {
        element.addEventListener("click", function () {
            Relocate(element.textContent!.trim());
        });
    });

    PopulateDropdown(huntGatherElement, data.activities, "hunt-gather-btn")
    document.querySelectorAll(".hunt-gather-btn").forEach(element => {
        element.addEventListener("click", function(){
            getItem(element.textContent!)
        })
    })
}

function getItem(string:string): void{
    if(inventory.length < 7){
        inventory.push(string.replace("_", " "))
    }
}

function UpdateStats(): void {
    if (healthElement) {
        healthElement.style.width = `${health}%`;
    }
    if (foodElement) {
        foodElement.style.width = `${food}%`;
    }
    if (waterElement) {
        waterElement.style.width = `${water}%`;
    }
    if (actionsElement) {
        actionsElement.innerHTML = `${actions}`
    }
}

function PopulateDropdown(parent: HTMLElement | null, array: string[], ...extraCss: string[]): void {
    if (parent) {
        parent.replaceChildren()
        array.forEach(element => {
            let listElement: HTMLElement = document.createElement("li");
            listElement.className = "dropdown-item";
            
            let buttonElement: HTMLButtonElement = document.createElement("button");
            buttonElement.textContent = element.replace("_", " ");
            buttonElement.className = `btn btn-secondary w-100 ${extraCss.join(" ")}`;
            
            listElement.appendChild(buttonElement);
            parent.appendChild(listElement);
        });
    }
}
Relocate("beach")
PopulateDropdown(interactElement, interactions, "interact-btn");

function togglePlay(): void {
    if (audioElement) {
        audioElement.muted = !audioElement.muted;
    }
}

document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", function () {
        const audio: HTMLAudioElement = new Audio(`mp3/sfx/button${1 + Math.floor(Math.random() * 3)}.mp3`);
        audio.play();
    });
});

document.querySelector(".music-toggle")?.addEventListener("click", togglePlay);



  