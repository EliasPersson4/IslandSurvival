const bgElement: HTMLElement = document.querySelector(".bg")!;

const healthElement: HTMLElement = document.querySelector(".health")!;
let health: number = 90;
const foodElement: HTMLElement = document.querySelector(".food")!;
let food: number = 105;
const waterElement: HTMLElement = document.querySelector(".water")!;
let water: number = 70;
const actionsElement: HTMLElement = document.querySelector(".actions")!
let actions : number = 7

const travelElement: HTMLElement = document.querySelector(".travel-menu")!;
const locationElement: HTMLElement = document.querySelector(".location")!;
const audioElement: HTMLAudioElement = document.querySelector(".music")!;
const interactElement: HTMLElement = document.querySelector(".interact-menu")!;
const huntGatherElement: HTMLElement = document.querySelector(".hunt-gather-menu")!;
const dialogElement: HTMLElement = document.querySelector(".main-dialoge")!
const itemElement: HTMLElement = document.querySelector(".items")!

let visited: string[] = []

let currentLocation: string = "beach";

let inventory: string[] = []

function Relocate(location: string): void {
    if(!actions)
        return
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
    food -= 5
    water -= 10
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
    const activityIds = data.activities.map(activity => activity.id);
    PopulateDropdown(huntGatherElement, activityIds, "hunt-gather-btn")
    document.querySelectorAll(".hunt-gather-btn").forEach(element => {
        element.addEventListener("click", function(){
            updateDialogWithActivity(element.textContent!.replace(" ", "_"));
        })
    })
    const interactIds = data.interact.map(interact => interact.id);
    PopulateDropdown(interactElement, interactIds, "interact-btn");
    document.querySelectorAll(".interact-btn").forEach(element => {
        element.addEventListener("click", function(){
            updateDialogWithInteract(element.textContent!.replace(" ", "_"));
        })
    })

    if (!inventory.includes("Stone Axe")) {
        let aTags: NodeListOf<Element> = document.querySelectorAll(".hunt-gather-btn");
        let searchText: string = "planks";
        let found
    
        for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
            found = aTags[i];
            break;
        }
        }
        found.disabled = true
        
    }
}

function updateDialogWithActivity(activityId: string): void {
    if(!actions)
        return
    fetch("./locations.json")
        .then(response => response.json())
        .then(json => {
            const data = json[currentLocation];
            const activity = data.activities.find(act => act.id === activityId);
            let rng: number
            let returnString: string = ""
            switch(activityId){
                case "fish":
                    returnString += activity.text.split("|")[0]
                    rng = randInt(1,100)
                    
                    if (rng > 50) {
                        returnString += activity.text.split("|")[1]
                        getItem(activityId.replace("_", " "));
                    }   
                    else{
                        returnString += activity.text.split("|")[2]
                    }

                    break;
                case "hunt":
                    returnString += activity.text.split("|")[0]
                    rng = randInt(1,100)
                    
                    if (rng > 70) {
                        returnString += activity.text.split("|")[1]
                        getItem("raw_food".replace("_", " "));
                    }   
                    else{
                        returnString += activity.text.split("|")[2]
                    }
                    break;
                    case "sticks":
                    case "twine":
                        let amount: number = randInt(1,3)
                        for (let i = 0; i < amount; i++) {
                            getItem(activityId.trim())
                        }
                        returnString = activity.text.replace("x", amount)
                        break;
                default:
                    getItem(activityId.trim())
                    returnString = activity.text
                    break;


            }

            if (dialogElement && activity?.text) {
                dialogElement.innerHTML = returnString;
            }
            actions -= 1
            food -= 10
            water -= 5
            UpdateStats()
        });
}

function updateDialogWithInteract(interactId: string): void {
    if(!actions)
        return
    fetch("./locations.json")
        .then(response => response.json())
        .then(json => {
            const data = json[currentLocation];
            const interact = data.interact.find(inter => inter.id === interactId);
            if (dialogElement && interact?.text) {
                dialogElement.innerHTML = interact.text;
            }
        });
}

function getItem(string:string): void{
    if(inventory.length < 7){
        inventory.push(string.replace("_", " "))
    }
    UpdateStats()
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
    if (itemElement) {
        itemElement.innerHTML = ""
        const counter = {};

        inventory.forEach(ele => {
            if (counter[ele]) {
                counter[ele] += 1;
            } else {
                counter[ele] = 1;
            }
        });
        
        const result = Object.entries(counter).map(([key, value]) => `${key}: ${value}`).join(', ');
        itemElement.innerHTML = result
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



  