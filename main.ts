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

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let visited: string[] = [];

let currentLocation: string = "beach";

let inventory: string[] = [];

async function fadeIn() {
  transitionElement.style.opacity = "1"
  transHideElement.forEach(element => {
    element.style.opacity = "0"
  });
  Relocate("beach")
  await sleep(300)
  for (let j = 100; j > 0; j -= 5) {
    await sleep(40);
    transitionElement.style.opacity = `${j / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - j / 100}`;
    });
  }
}
fadeIn()
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

  currentLocation = location;

  getText(location.replace(" ", "_"));
  if (visited.length) {
    actions -= 1;
    food -= 5;
    water -= 10;
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
          poisoned = randInt(1, 100) > 70;
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
            water += 40
            break;
        case "Dirty Water":
            water += 15
            poisoned = true
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
  } else {
    document.querySelector(
      ".main-dialoge"
    )!.textContent = `You don't have the necessary materials to craft a ${itemName}.`;
  }
}

function CapitalizeCase(input: string): string{
    let string: string = ""
    input = input.replace("_", " ")
    for (let i = 0; i < input.length; i++) {
        if (input[i-1] == " " || i == 0)
            string += input[i].toUpperCase()
        else
            string += input[i]
    }
    return string
}

console.log(CapitalizeCase("deep_forest"))

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

  const entry = data.description.find((item) => item.id === id);

  if (dialogElement && entry?.description) {
    dialogElement.innerHTML = entry.description;
  }
  PopulateDropdown(travelElement, data.connections, "travel-btn");
  document.querySelectorAll(".travel-btn").forEach((element) => {
    element.addEventListener("click", function () {
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
  if (!inventory.includes("Campfire")) {
    let bTags: NodeListOf<Element> = document.querySelectorAll(".interact-btn");
    let searchText2: string = "campfire";
    let found2;

    bTags.forEach((element2) => {
      if (element2.textContent == searchText2) {
        found2 = element2;
        found2.disabled = true;
      }
    });
  }
  if (!inventory.includes("Stone Axe")) {
    let aTags: NodeListOf<Element> =
      document.querySelectorAll(".hunt-gather-btn");
    let searchText: string = "planks";
    let found;

    aTags.forEach((element) => {
      if (element.textContent == searchText) {
        found = element;
        found.disabled = true;
      }
    });
  }
}

function updateDialogWithActivity(activityId: string): void {
  if (!actions) return;
  fetch("./locations.json")
    .then((response) => response.json())
    .then((json) => {
      const data = json[currentLocation];
      const activity = data.activities.find((act) => act.id === activityId);
      let rng: number;
      let returnString: string = "";

      switch (activityId) {
        case "foraging":
        returnString = activity.text    
        let type = randInt(0,1)
            if (type) {
                returnString = returnString.replace("y,", "berries,")
                getItem("Berries")
            }    
            else{
                returnString = returnString.replace("y,", "mushroom,")
                getItem("Mushroom")
            }
        break
        case "fish":
          returnString += activity.text.split("|")[0];
          rng = randInt(1, 100);

          if (rng > 50) {
            returnString += activity.text.split("|")[1];
            getItem(("Raw_" + activityId).replace("_", " "));
          } else {
            returnString += activity.text.split("|")[2];
          }

          break;
        case "hunt":
          returnString += activity.text.split("|")[0];
          rng = randInt(1, 100);

          if (rng > 70) {
            returnString += activity.text.split("|")[1];
            getItem("Raw_Meat".replace("_", " "));
          } else {
            returnString += activity.text.split("|")[2];
          }
          break;
        case "sticks":
        case "twine":
          let amount: number = randInt(1, 3);
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
          document.querySelector(
            ".main-dialoge"
          )!.textContent = `While gathering you encounterd a wolf, you managed to escape but was badly hurt.`;
          health -= 50;
        }
      }
      if (dialogElement && activity?.text) {
        dialogElement.innerHTML = returnString;
      }
      actions -= 1;
      food -= 10;
      water -= 5;
      if (poisoned) {
        health -= 5;
      }
      UpdateStats();
    });
}

function updateDialogWithInteract(interactId: string): void {
  if (!actions && interactId != "sleep") return;
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
          case "investegate":
            if (currentLocation === "forest") {
              let ruins = randInt(0, 1);
              if (ruins) {
                ruinsFound = true
              }
  
              
            }
            returnString = interact.text;
            break;
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
        buttonElement.hidden = true
      }
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
