const locationData = {
    "beach": [
      {
        "id": 1,
        "description": "You awaken at a beach, you have nothing but your clothes and a need to survive, what are you going to do? Last thing you remember is your boat crashing, maybe there are other survivors?"
      },
      {
        "id": 2,
        "description": "The beach looks just as barren as the last time you were here. The wreckage remains scattered, and the endless horizon still offers no hope of rescue."
      },
      {
        "id": 3,
        "description": "You've returned to the same stretch of sand where you first washed ashore. Every step feels heavier now, knowing how little this place has to offer."
      },
      {
        "id": 4,
        "description": "The sand feels even hotter beneath your feet this time. Despite the familiarity, each glance at the wreckage sends a rush of despair through you."
      }
    ],
    "shipwreck": [
      {
        "id": 1,
        "description": "You arrive at the shipwreck, no one else made it, you are the sole survivor, now it's time to do just that; Survive."
      },
      {
        "id": 2,
        "description": "The shipwreck looks even worse than when you first found it. There's nothing new here—just the sad remains of the boat that failed to keep you safe."
      },
      {
        "id": 3,
        "description": "Back at the wreckage, you're reminded of the night of the storm. It hasn't gotten any easier to look at, but maybe there's still something useful you missed before."
      },
      {
        "id": 4,
        "description": "The wreck still sits there, as silent and haunting as ever. It's hard to believe that the ship once carried hope and dreams."
      }
    ],
    "forest": [
      {
        "id": 1,
        "description": "A huge forest stands before you, the sound of birds singing and rabbits scurrying is almost soothing. You see berries and mushrooms growing along the ground."
      },
      {
        "id": 2,
        "description": "The river flows as it always has, clear and steady. You've been here before, but each return brings the same calm that's too fleeting in this place."
      },
      {
        "id": 3,
        "description": "The water sparkles, but you've come to know its rhythm well. The fish are fewer now, and the animals seem to sense your presence before you even arrive."
      },
      {
        "id": 4,
        "description": "The deeper you go into the forest, the more you realize how silent it can be. It feels like nature itself is holding its breath, watching your every move."
      }
    ],
    "river": [
      {
        "id": 1,
        "description": "Before you runs a small river, within it there are fish swimming and to the side there are animals bathing or drinking the river water."
      },
      {
        "id": 2,
        "description": "The river flows swiftly, its clear waters teeming with life. You can see fish darting below the surface and hear the gentle rustle of animals nearby."
      },
      {
        "id": 3,
        "description": "Standing by the riverbank, you watch as creatures come to drink. The sound of flowing water provides a sense of calm amidst the uncertainty of your situation."
      },
      {
        "id": 4,
        "description": "The familiar rush of the river greets you again, but this time, you notice fewer animals. The wilderness feels emptier, as if it's retreating from your presence."
      }
    ],
    "lake": [
      {
        "id": 1,
        "description": "As you followed the river you now stand before a huge lake, the wildlife is abundant."
      },
      {
        "id": 2,
        "description": "The lake is as tranquil as before, though now you can sense the changes in the wildlife around it. The once plentiful animals seem warier of you."
      },
      {
        "id": 3,
        "description": "You stand at the lake again, but it feels different. The wildlife has grown quieter, and the water, though still beautiful, holds an underlying sense of foreboding."
      },
      {
        "id": 4,
        "description": "The surface of the lake is still, almost too still. The usual sounds of nature seem to have disappeared, leaving you with an eerie silence."
      }
    ],
    "deep_forest": [
      {
        "id": 1,
        "description": "Going deeper into the forest reveals more of nature's bounty, but in the distance you hear wolves howling, you feel uneasy."
      },
      {
        "id": 2,
        "description": "You've ventured this far before, and the sense of unease returns with every step. The howls are louder now, and you can't shake the feeling that something is watching you."
      },
      {
        "id": 3,
        "description": "You push further into the forest again, knowing full well the dangers that lurk here. The wolves sound closer this time, and the unease grows stronger with each visit."
      },
      {
        "id": 4,
        "description": "Every return to the deep forest fills you with dread. The howls are no longer distant—they're surrounding you, closing in with every step you take."
      }
    ],
    "volcano": [
      {
        "id": 1,
        "description": "You've arrived at the centerpiece of the island, the volcano. You don't know why but you feel like it's dangerous to be here."
      },
      {
        "id": 2,
        "description": "The volcano looms just as ominously as before. The ground trembles more frequently now, and you can feel the heat rising—something is changing here."
      },
      {
        "id": 3,
        "description": "You return to the volcano's base, and the tension in the air is palpable. Every time you come here, the island feels closer to erupting, as if time is running out."
      },
      {
        "id": 4,
        "description": "The volcano's rumble is deeper this time. You can't help but think it's a warning, a signal that this place won't remain dormant much longer."
      },
      {
        "id": 5,
        "description": "The air around the volcano is thick with heat and ash. It's as if the island itself is breathing, preparing for something catastrophic."
      }
    ],
    "hotspring": [
      {
        "id": 1,
        "description": "After walking around the volcano you stumble across this natural hotspring, taking a bath here would most certainly soothe your nerves."
      },
      {
        "id": 2,
        "description": "You've been to the hotsprings before, and the warmth is just as comforting. But you can't shake the thought that every moment spent here is time wasted."
      },
      {
        "id": 3,
        "description": "You slip into the warm waters of the hotspring once more, but the comfort is fleeting. With the volcano nearby, the peace of this place feels more fragile with each visit."
      },
      {
        "id": 4,
        "description": "The steam rising from the hotspring is as inviting as ever, but the weight of survival pulls at you. There's no time for luxury, not anymore."
      }
    ],
    "ruins": [
      {
        "id": 1,
        "description": "After following the hidden stone path you find yourself standing before ancient ruins, you don't know why but your gut is telling you to investigate further."
      },
      {
        "id": 2,
        "description": "The ruins seem more mysterious each time you visit. The carvings you noticed before seem to have shifted, or perhaps it's just your mind playing tricks on you."
      },
      {
        "id": 3,
        "description": "Standing among the crumbling stone of the ruins, you sense there are still secrets buried here. Every visit only scratches the surface of what this place holds."
      },
      {
        "id": 4,
        "description": "The ruins have an ancient weight to them, a silent history you can almost feel pressing down on you. Every time you return, it feels as though they are waiting for something."
      }
    ]
  }

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
const dialogElement: HTMLElement | null = document.querySelector(".main-dialoge")

const locations: string[] = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"];
let visited: string[] = []
const interactions: string[] = ["sleep", "investigate", "stroke_yo_bone"];
const huntGather: string[] = ["Hunt", "Fish", "Gather"];

//import locationData from "./locations.json";

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
    
    getText(location.replace(" ", "_"))
    
    visited.push(location.replace(" ", "_"))
    
}

function randInt(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getText(location: string) : void {
    const data = locationData[location]
    let id: number

    if(visited.includes(location)){
        id = randInt(2,4)
    }
    else{
        id = 1
    }

    const entry = data.find(item => item.id === id)
    
    if (dialogElement && entry?.description) {
        dialogElement.innerHTML = entry.description;
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
Relocate("beach")
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



  