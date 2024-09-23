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
const huntGatherElement: HTMLElement = document.querySelector(".hunt-gather-menu")!;
const dialogElement: HTMLElement = document.querySelector(".main-dialoge")!;
const itemElement: HTMLElement = document.querySelector(".items")!;
const transitionElement: HTMLElement = document.querySelector(".transition")!;
const discardElement: HTMLElement = document.querySelector(".discard-menu")!;
const eatElement: HTMLElement = document.querySelector(".eat-menu")!;
const drinkElement: HTMLElement = document.querySelector(".drink-menu")!;
const transHideElement = document.querySelectorAll(".trans-hidden");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let visited: string[] = [];

let currentLocation: string = "beach";

let inventory: string[] = ["Campfire", "Stone Axe"];

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

async function goToSleep(
  text: string,
  textElement: HTMLElement
): Promise<void> {
  for (let i = 0; i < 100; i += 5) {
    await sleep(30);
    transitionElement.style.opacity = `${i / 100}`;
    transHideElement.forEach((element) => {
      element.style.opacity = `${1 - i / 100}`;
    });
  }

  if (inventory.includes("sleeping bag")) {
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
        case "Fish":
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
            getItem(activityId.trim());
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
        default:
          getItem(activityId.trim());
          returnString = activity.text;
          break;
      }

      if (dialogElement && activity?.text) {
        dialogElement.innerHTML = returnString;
      }
      actions -= 1;
      food -= 10;
      water -= 5;
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
        default:
          returnString = interact.text;
          actions -= 1;
      }

      if (dialogElement && interact?.text && !(interactId == "sleep")) {
        dialogElement.innerHTML = returnString;
      }
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

      listElement.appendChild(buttonElement);
      parent.appendChild(listElement);
    });
  }
}
Relocate("beach");

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
