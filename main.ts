const bgElement: HTMLElement = document.querySelector(".bg")!;

const healthElement: HTMLElement = document.querySelector(".health")!;
let health: number = 90;
const foodElement: HTMLElement = document.querySelector(".food")!;
let food: number = 100;
const waterElement: HTMLElement = document.querySelector(".water")!;
let water: number = 60;
const actionsElement: HTMLElement = document.querySelector(".actions")!;
let actions: number = 6;
const poisonElement: HTMLElement = document.querySelector(".poisoned")!;
let poisoned: boolean = false;

const travelElement: HTMLElement = document.querySelector(".travel-menu")!;
const locationElement: HTMLElement = document.querySelector(".location")!;
const audioElement: HTMLAudioElement = document.querySelector(".music")!;
const interactElement: HTMLElement = document.querySelector(".interact-menu")!;
const huntGatherElement: HTMLElement =
  document.querySelector(".hunt-gather-menu")!;
const dialogElement: HTMLElement = document.querySelector(".main-dialoge")!;
const itemElement: HTMLElement = document.querySelector(".items")!;
const transitionElement: HTMLElement = document.querySelector(".transition")!;
const discardElement: HTMLElement = document.querySelector(".discard-menu")!;
const eatElement: HTMLElement = document.querySelector(".eat-menu")!;
const drinkElement: HTMLElement = document.querySelector(".drink-menu")!;
const transHideElement = document.querySelectorAll(".trans-hidden");
let ruinsFound: boolean = false

let outdoorsman: boolean = false;
let gatherer: boolean = false;
let hunter: boolean = false;
let explorer: boolean = false;

let volcanoTimer: number = 2

let repairProgress: number = 0;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let visited: string[] = [];

let currentLocation: string = "beach";

let inventory: string[] = [];

function GameOver(type:string) {
  switch(type){
    case "eruption":
      dialogElement.innerHTML = "As you were sleeping the volcano erupted, but alas, it is too late for you, you die just seconds after waking up, barely realizing what happened. Game Over"
      break
    case "health":
      dialogElement.innerHTML = "Your body cannot take the burden of living anymore the damages you have accumulated are too grave to heal, you collapse on the ground just in time to see the sunset one last time, you die. Game Over"
      break
    case "monster":
      dialogElement.innerHTML = "The beast overpowers you and crushes your spine with its jaw, you die instantly. Game over"  
    break
    case "escape":
    dialogElement.innerHTML = "You repaied the boat and now you're cruising home leaving the island behind you, soon this will all be a bad memory, you have survived"  
    break
    }
}

async function fadeIn() {
  transitionElement.style.opacity = "1";
  transHideElement.forEach((element) => {
    element.style.opacity = "0";
  });
  Relocate(currentLocation);
  await sleep(300);
  for (let j = 100; j > 0; j -= 5) {
    await sleep(40);
    transitionElement.style.opacity = `${j / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - j / 100}`;
    });
  }
}
//fadeIn();
Relocate("beach")
async function transition(location: string): Promise<void> {
  for (let i = 0; i < 100; i += 5) {
    await sleep(30);
    transitionElement.style.opacity = `${i / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - i / 100}`;
    });
  }
  Relocate(location);
  await sleep(200);

  for (let j = 100; j > 0; j -= 5) {
    await sleep(30);
    transitionElement.style.opacity = `${j / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - j / 100}`;
    });
  }
}

function canCraft(recipe: string[]): boolean {
  recipe.forEach((element) => {
    if (!inventory.includes(element)) {
      return false;
    }
  });
  return true;
}

document.querySelectorAll(".perk")!.forEach((element) => {
  element.addEventListener("click", function() {
    if (element.innerHTML.trim() == "Outdoorsman") {
      outdoorsman = true
    }
    if (element.innerHTML.trim() == "Gatherer") {
      gatherer = true
    }
    if (element.innerHTML.trim() == "Hunter") {
      hunter = true
    }
    if (element.innerHTML.trim() == "Explorer") {
      explorer = true
    }
    visited = []
    document.querySelector(".start-menu")!.style.visibility = "hidden"
    fadeIn();
  });
});

async function goToSleep(
  text: string,
  textElement: HTMLElement
): Promise<void> {
  const audio: HTMLAudioElement = new Audio(`mp3/sfx/sleep.mp3`);
  audio.play();
  for (let i = 0; i < 100; i += 5) {
    await sleep(30);
    transitionElement.style.opacity = `${i / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - i / 100}`;
    });
  }

  if (inventory.includes("Sleeping Bag")) {
    actions = 6;
    text = text.replace("x", "all of your");
  } else {
    let recovered = randInt(2, 4);
    actions += recovered;
    text = text.replace("x", recovered.toString());

    if (actions >= 6) {
      text = text.replace(recovered.toString(), "all of your");
      actions = 6;
    }
  }
  textElement.innerHTML = text;
  if (volcanoTimer != 5) {
    volcanoTimer += randInt(1,100) > 70 ? 1 : 0
  }
  else
    if(randInt(1,100) > 70){
      GameOver("eruption")
    }

  UpdateStats();

  for (let j = 100; j > 0; j -= 5) {
    await sleep(30);
    transitionElement.style.opacity = `${j / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - j / 100}`;
    });
  }
}

function Relocate(location: string): void {
  if (!actions) return;
  if (bgElement) {
    bgElement.style.backgroundImage = `url(img/${location.replace(
      " ",
      "_"
    )}.png)`;
  }

  if (audioElement) {
    audioElement.setAttribute(
      "src",
      `mp3/music/${location.replace(" ", "_")}.mp3`
    );
  }
  if (locationElement) {
    locationElement.textContent = location;
  }

  currentLocation = location.replace(" ", "_");

  getText(location.replace(" ", "_"));
  if (visited.length) {
    if (randInt(1,100) > 70 && explorer) {
      
    }
    else{
      actions -= 1;
    }
    food -= 5;
    if(food >= 0)
      food = 0
    water -= 10;
    if(water >= 0)
      water = 0
  }
  UpdateStats();
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupDiscardButtons() {
  document.querySelectorAll(".discard-btn").forEach((element) => {
    element.addEventListener("click", function () {
      let index = inventory.indexOf(element.innerHTML);
      if (index > -1) {
        inventory.splice(index, 1);
      }

      UpdateStats();

      if (inventory.length) {
        PopulateDropdown(discardElement, inventory, "discard-btn");
        setupDiscardButtons();
      }
    });
  });
}

function setupEatButtons() {
  document.querySelectorAll(".eat-btn").forEach((element) => {
    element.addEventListener("click", function () {
      let index = inventory.indexOf(element.innerHTML);
      if (index > -1) {
        inventory.splice(index, 1);
      }
      switch (element.innerHTML) {
        case "Raw Fish":
          food += 15;
        case "Raw Meat":
          food += 20;
          poisoned = true;
          break;
        case "Cooked Meat":
          food += 60;
          break;
        case "Cooked Fish":
          food += 50;
          break;
        case "Mushroom":
          food += 35;
        case "Berry":
          food += 25;
          if (!outdoorsman) {
            poisoned = randInt(1, 100) > 70;
          }
          break;

        default:
          break;
      }
      UpdateStats();
      let foodItems = getFoodItems(inventory);

      if (foodItems.length) {
        setupEatButtons();
      }
    });
  });
}
function setupDrinkButtons() {
  document.querySelectorAll(".drink-btn").forEach((element) => {
    element.addEventListener("click", function () {
      let index = inventory.indexOf(element.innerHTML);
      if (index > -1) {
        inventory.splice(index, 1);
      }
      switch (element.innerHTML) {
        case "Water":
          water += 40;
          break;
        case "Dirty Water":
          water += 15;
          poisoned = true;
        default:
          break;
      }
      UpdateStats();
      let drinkItems = getDrinkItems(inventory);

      if (drinkItems.length) {
        setupEatButtons();
      }
    });
  });
}

function isFood(item) {
  switch (item) {
    case "Raw Meat":
    case "Raw Fish":
    case "Cooked Meat":
    case "Cooked Fish":
    case "Mushroom":
    case "Berry":
      return true;
    default:
      return false;
  }
}
function getFoodItems(inventory) {
  return inventory.filter(isFood);
}

function isDrink(item) {
  switch (item) {
    case "Water":
    case "Dirty Water":
      return true;
    default:
      return false;
  }
}
function getDrinkItems(inventory) {
  return inventory.filter(isDrink);
}

const recipes = {
  Spear: ["Sticks", "Stone", "Twine"],
  "Fishing Rod": ["Sticks", "Twine"],
  "Stone Axe": ["Sticks", "Stone"],
  Campfire: ["Sticks", "Stone"],
  "Sleeping Bag": ["Twine", "Leather"],
};

document.querySelectorAll(".crafting")!.forEach((element) => {
  element.addEventListener("click", function () {
    craftItem(element.innerHTML);
  });
});

function craftItem(itemName) {
  const recipe = recipes[itemName];

  if (canCraft(recipe)) {
    recipe.forEach((material) => inventory.splice(inventory.indexOf(material)));

    getItem(itemName);

    document.querySelector(
      ".main-dialoge"
    )!.textContent = `You have crafted a ${itemName}!`;
    checkForItems()
  } else {
    document.querySelector(
      ".main-dialoge"
    )!.textContent = `You don't have the necessary materials to craft a ${itemName}.`;
  }
}

function CapitalizeCase(input: string): string {
  let string: string = "";
  input = input.replace("_", " ");
  for (let i = 0; i < input.length; i++) {
    if (input[i - 1] == " " || i == 0) string += input[i].toUpperCase();
    else string += input[i];
  }
  return string;
}

async function getText(location: string): Promise<void> {
  let data;
  await fetch("./locations.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      data = json[location];
    });
  let id: number;

  if (visited.includes(location)) {
    id = randInt(2, 4);
  } else {
    id = 1;
    visited.push(location.replace(" ", "_"));
  }
  if (location == "volcano" && visited.includes("volcano")) {
    id = volcanoTimer
  }

  const entry = data.description.find((item) => item.id === id);

  if (dialogElement && entry?.description) {
    dialogElement.innerHTML = entry.description;
  }
  PopulateDropdown(travelElement, data.connections, "travel-btn");
  document.querySelectorAll(".travel-btn").forEach((element) => {
    element.addEventListener("click", function () {
      if(!actions){
        dialogElement.innerHTML = "Not enough actions"
        return;
      }
      transition(element.textContent!.trim());
    });
  });
  const activityIds = data.activities.map((activity) => activity.id);
  PopulateDropdown(huntGatherElement, activityIds, "hunt-gather-btn");
  document.querySelectorAll(".hunt-gather-btn").forEach((element) => {
    element.addEventListener("click", function () {
      updateDialogWithActivity(element.textContent!.replace(" ", "_"));
    });
  });
  const interactIds = data.interact.map((interact) => interact.id);
  PopulateDropdown(interactElement, interactIds, "interact-btn");
  document.querySelectorAll(".interact-btn").forEach((element) => {
    element.addEventListener("click", function () {
      updateDialogWithInteract(element.textContent!.replace(" ", "_"));
    });
  });
  if (poisoned) {
    health -= 5;
  }
  UpdateStats();
}

function checkForItems() {
    let bTags: NodeListOf<Element> = document.querySelectorAll(".interact-btn");
    let searchText2: string = "campfire";
    let found2;

    bTags.forEach((element2) => {
      if (element2.textContent == searchText2) {
        found2 = element2;
        found2.disabled = !inventory.includes("Campfire");
      }
    });

    let aTags: NodeListOf<Element> =
      document.querySelectorAll(".hunt-gather-btn");
    let searchText: string = "planks";
    let found;

    aTags.forEach((element) => {
      if (element.textContent == searchText) {
        found = element;
        found.disabled = !inventory.includes("Stone Axe");
      }
    });
  }

function updateDialogWithActivity(activityId: string): void {
  if (!actions){
    dialogElement.innerHTML = "Not enough actions"
    return;
  } 
  fetch("./locations.json")
    .then((response) => response.json())
    .then((json) => {
      const data = json[currentLocation];
      const activity = data.activities.find((act) => act.id === activityId);
      let rng: number;
      let returnString: string = "";
      let hasSpear: number = inventory.includes("Spear") ? 20 : 0
      let isHunter: number = hunter ? 20 : 0
      switch (activityId) {
        case "foraging":
          returnString = activity.text;
          let type = randInt(0, 1);
          if (type) {
            returnString = returnString.replace("y,", "berries,");
            getItem("Berries");
          } else {
            returnString = returnString.replace("y,", "mushroom,");
            getItem("Mushroom");
          }
          break;
        case "fish":
          returnString += activity.text.split("|")[0];
          rng = randInt(1, 100);
          if (rng > 50 - hasSpear - isHunter) {
            returnString += activity.text.split("|")[1];
            getItem("Raw Fish");
          } else {
            returnString += activity.text.split("|")[2];
          }

          break;
        case "hunt":
          returnString += activity.text.split("|")[0];
          rng = randInt(1, 100);

          if (rng > 70 - hasSpear - isHunter) {
            returnString += activity.text.split("|")[1];
            getItem("Raw Meat");
          } else {
            returnString += activity.text.split("|")[2];
          }
          break;
        case "sticks":
        case "twine":
          let amount: number = randInt(1, 3);
          if (gatherer) {
            amount + 1
          }
          for (let i = 0; i < amount; i++) {
            getItem(CapitalizeCase(activityId).trim());
          }
          returnString = activity.text.replace("x", amount);
          break;
        case "food":
          returnString += activity.text.split("|")[0];
          if (randInt(1, 100) > 70) {
            returnString += activity.text.split("|")[1];
            getItem("flare");
          }
          getItem("Cooked_Meat".replace("_", " "));
          getItem("Water");
          break;
        case "stone":
          getItem("Stone");
          returnString = activity.text;
          break;
        default:
          getItem(CapitalizeCase(activityId).trim());
          returnString = activity.text;
          break;
      }
      const audio: HTMLAudioElement = new Audio(`mp3/sfx/${activityId}.mp3`);
      audio.play();
      if (currentLocation == "deep_forest") {
        rng = randInt(1, 100);
        if (rng > 70) {
          const audio: HTMLAudioElement = new Audio(`mp3/sfx/enemy.mp3`);
          audio.play();
          returnString += ` While gathering you encounterd a wolf, you managed to escape but was badly hurt.`;
          health -= 50;
        }
      }
      if (dialogElement && activity?.text) {
        dialogElement.innerHTML = returnString;
      }
      actions -= 1;
      food -= 10;
      if(food <= 0)
        food = 0
      water -= 5;
      if(water <= 0)
        water = 0
      if (poisoned) {
        health -= 5;
      }
      UpdateStats();
    });
}

function updateDialogWithInteract(interactId: string): void {
  if (!actions && interactId != "sleep"){
      dialogElement.innerHTML = "Not enough actions"
      return;
    } 
  fetch("./locations.json")
    .then((response) => response.json())
    .then(async (json) => {
      const data = json[currentLocation];
      const interact = data.interact.find((inter) => inter.id === interactId);
      let returnString;
      switch (interactId) {
        case "sleep":
          goToSleep(interact.text, dialogElement);
          break;
          case"campfire":
          for (let index = 0; index < inventory.length; index++) {
            const element = inventory[index];
            element.replace("raw", "cooked")
            element.replace("dirty", "")
          }
          ;
        case "investegate":
          returnString = interact.text;
          if (currentLocation === "forest") {
            actions -= 1
            let ruins = randInt(0, 1);
            if (ruins) {
              ruinsFound = true;
              PopulateDropdown(travelElement, data.connections, "travel-btn");
              document.querySelectorAll(".travel-btn").forEach((element) => {
                element.addEventListener("click", function () {
                  transition(element.textContent!.trim());
                });
              });
              returnString =
                "While investegating you found a hidden stone path";
            } else {
              returnString = interact.text;
            }
          }
          if (currentLocation === "ruins") {
            let machete = randInt(0, 1);
            let monster = randInt(0, 1);
            if (machete) {
              getItem("Machete");
              returnString =
                "While locking for somthing intresting you came acros a old machete. I can use this to defend myself";
            }
            if (monster) {
              const audio: HTMLAudioElement = new Audio(`mp3/sfx/enemy.mp3`);
              audio.play();
              if (inventory.includes("Machete")) {
                returnString =
                  "While locking for somthing intresting you encounterd monster, you managed to escape thanks to the machete but was badly hurt.";
                health = 5;
              } else {
                returnString = "You died";
                health = 0;
              }
            }
          }
          break;
          case "repair":
            returnString = interact.text;
            if (inventory.includes("Planks")) {
              let index = inventory.indexOf("Planks")
              inventory.splice(index, 1)
              repairProgress += 1
              returnString = `You have repaired a part of the boat, you only need to repair ${10 - repairProgress} parts to have it fully repaired`;

            }
            if (repairProgress == 10) {
              returnString = "You have repaired the boat, finely you can go home";
              const interactIds = data.interact.map((interact) => interact.id);
  PopulateDropdown(interactElement, interactIds, "interact-btn");
  document.querySelectorAll(".interact-btn").forEach((element) => {
    element.addEventListener("click", function () {
      updateDialogWithInteract(element.textContent!.replace(" ", "_"));
    });
  });
            }
            break;
            case "escape":
              Relocate("victory!")
              GameOver("escape")
              break;
              case "bath":
                returnString = interact.text
                if (currentLocation == "hotspring") {
                  health += 20
                  poisoned = false
                }  
              break
        default:
          returnString = interact.text;
          actions -= 1;
      }

      if (dialogElement && interact?.text && !(interactId == "sleep")) {
        dialogElement.innerHTML = returnString;
      }
      if (poisoned) {
        health -= 5;
      }
      const audio: HTMLAudioElement = new Audio(`mp3/sfx/${interactId}.mp3`);
      audio.play();
      food -= 10;
      if(food <= 0)
        food = 0
      water -= 5;
      if(water <= 0)
        water = 0
      UpdateStats();
    });
}

function getItem(string: string): void {
  if (inventory.length < 7) {
    inventory.push(string.replace("_", " "));
  }
  UpdateStats();
}

function UpdateStats(): void {
  health -= (food == 0) ? 5 : 0
  health -= (water == 0) ? 10 : 0

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
    actionsElement.innerHTML = `${actions}`;
  }
  if (itemElement) {
    itemElement.innerHTML = "";
    const counter = {};

    inventory.forEach((ele) => {
      if (counter[ele]) {
        counter[ele] += 1;
      } else {
        counter[ele] = 1;
      }
    });

    const result = Object.entries(counter)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    itemElement.innerHTML = result;
    poisonElement.hidden = !poisoned;
    PopulateDropdown(eatElement, getFoodItems(inventory), "eat-btn");
    PopulateDropdown(drinkElement, getDrinkItems(inventory), "drink-btn");
    PopulateDropdown(discardElement, inventory, "discard-btn");
    checkForItems();
    setupDiscardButtons();
    setupEatButtons();
    setupDrinkButtons();
    if (health <= 0) {
      GameOver("health")
    }
  }
}

function PopulateDropdown(
  parent: HTMLElement | null,
  array: string[],
  ...extraCss: string[]
): void {
  parent!.replaceChildren();
  if (parent && array.length) {
    array.forEach((element) => {
      let listElement: HTMLElement = document.createElement("li");
      listElement.className = "dropdown-item";

      let buttonElement: HTMLButtonElement = document.createElement("button");
      buttonElement.textContent = element.replace("_", " ");
      buttonElement.className = `btn btn-secondary w-100 ${extraCss.join(" ")}`;
      if (buttonElement.textContent == "ruins" && !ruinsFound) {
        buttonElement.hidden = true;
      }
      if (buttonElement.textContent == "escape" && repairProgress!==10) {
        buttonElement.hidden = true;
      }
      buttonElement.addEventListener("click", function () {
        const audio: HTMLAudioElement = new Audio(
          `mp3/sfx/button${1 + Math.floor(Math.random() * 3)}.mp3`
        );
        audio.play();
      })
      listElement.appendChild(buttonElement);
      parent.appendChild(listElement);
    });
  }
}
function togglePlay(): void {
  if (audioElement) {
    audioElement.muted = !audioElement.muted;
  }
}

document.querySelectorAll("button").forEach((element) => {
  element.addEventListener("click", function () {
    const audio: HTMLAudioElement = new Audio(
      `mp3/sfx/button${1 + Math.floor(Math.random() * 3)}.mp3`
    );
    audio.play();
  });
});

document.querySelector(".music-toggle")?.addEventListener("click", togglePlay);

interface GameState {
  ruinsFound: boolean;
  outdoorsman: boolean;
  gatherer: boolean;
  hunter: boolean;
  explorer: boolean;
  volcanoTimer: number;
  repairProgress: number;
  visited: string[];
  currentLocation: string;
  inventory: string[];
  actions: number;
  health: number;
  food: number;
  water: number;
  poisoned: boolean;
}
let gameState: GameState
document.querySelector(".save")?.addEventListener("click", function(){
   gameState = {
    ruinsFound: ruinsFound,
    outdoorsman: outdoorsman,
    gatherer: gatherer,
    hunter: hunter,
    explorer: explorer,
    volcanoTimer: volcanoTimer,
    repairProgress: repairProgress,
    visited: visited,
    currentLocation: currentLocation,
    inventory: inventory,
    actions: actions,
    health: health,
    food: food,
    water: water,
    poisoned: poisoned
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
});

document.querySelectorAll(".load")?.forEach((element) => {
  element.addEventListener("click", function(){
    const savedGameState = localStorage.getItem('gameState');
      if (savedGameState) {
         gameState = JSON.parse(savedGameState) as GameState;
  
         ruinsFound = gameState.ruinsFound;
         outdoorsman = gameState.outdoorsman;
         gatherer = gameState.gatherer;
         hunter = gameState.hunter;
         explorer = gameState.explorer;
         volcanoTimer = gameState.volcanoTimer;
         repairProgress = gameState.repairProgress;
         currentLocation = gameState.currentLocation;
         inventory = gameState.inventory;
         visited = gameState.visited;
         actions = gameState.actions+1;
         health = gameState.health;
         food = gameState.food;
         water = gameState.water;
         poisoned = gameState.poisoned;
        
         document.querySelector(".start-menu")!.style.visibility = "hidden"
         fadeIn();
         UpdateStats();
  
  
         console.log('Game state loaded:', gameState);
      } else {
          console.log('No saved game state found.');
      }
  });
})

