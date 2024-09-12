const bgElement: HTMLElement | null = document.querySelector(".bg");

const healthElement: HTMLElement | null = document.querySelector(".health");
let health: number = 90;
const foodElement: HTMLElement | null = document.querySelector(".food");
let food: number = 100;
const waterElement: HTMLElement | null = document.querySelector(".water");
let water: number = 60;

const travelElement: HTMLElement | null = document.querySelector(".travel-menu");
const locationElement: HTMLElement | null = document.querySelector(".location");
const audioElement: HTMLAudioElement | null = document.querySelector(".music");
const interactElement: HTMLElement | null = document.querySelector(".interact-menu");
const huntGatherElement: HTMLElement | null = document.querySelector(".hunt-gather-menu");

const locations: string[] = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"];
const interactions: string[] = ["sleep", "investigate", "stroke_yo_bone"];
const huntGather: string[] = ["Hunt", "Fish", "Gather"];

let currentLocation: string = "beach";

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
}


function PopulateDropdown(parent: HTMLElement | null, array: string[], ...extraCss: string[]): void {
    if (parent) {
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

UpdateStats();
PopulateDropdown(interactElement, interactions, "interact-btn");
PopulateDropdown(travelElement, locations, "travel-btn");
PopulateDropdown(huntGatherElement, huntGather, "hunt-gather-btn");

document.querySelectorAll(".travel-btn").forEach(element => {
    element.addEventListener("click", function () {
        Relocate(element.textContent!.trim());
    });
});

let isPlaying: boolean = !audioElement?.muted;

function togglePlay(): void {
    if (audioElement) {
        audioElement.muted = isPlaying;
    }
    isPlaying = !isPlaying;
}

document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", function () {
        const audio: HTMLAudioElement = new Audio(`mp3/sfx/button${1 + Math.floor(Math.random() * 3)}.mp3`);
        audio.play();
    });
});

document.querySelector(".music-toggle")?.addEventListener("click", togglePlay);
