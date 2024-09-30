var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var bgElement = document.querySelector(".bg");
var healthElement = document.querySelector(".health");
var health = 90;
var foodElement = document.querySelector(".food");
var food = 100;
var waterElement = document.querySelector(".water");
var water = 60;
var actionsElement = document.querySelector(".actions");
var actions = 6;
var poisonElement = document.querySelector(".poisoned");
var poisoned = false;
var travelElement = document.querySelector(".travel-menu");
var locationElement = document.querySelector(".location");
var audioElement = document.querySelector(".music");
var interactElement = document.querySelector(".interact-menu");
var huntGatherElement = document.querySelector(".hunt-gather-menu");
var dialogElement = document.querySelector(".main-dialoge");
var itemElement = document.querySelector(".items");
var transitionElement = document.querySelector(".transition");
var discardElement = document.querySelector(".discard-menu");
var eatElement = document.querySelector(".eat-menu");
var drinkElement = document.querySelector(".drink-menu");
var transHideElement = document.querySelectorAll(".trans-hidden");
var ruinsFound = false;
var volcanoTimer = 2;
var repairprogres = 0;
var sleep = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var visited = [];
var currentLocation = "beach";
var inventory = [];
function GameOver(type) {
    switch (type) {
        case "eruption":
            dialogElement.innerHTML = "As you were sleeping the volcano erupted, but alas, it is too late for you, you die just seconds after waking up, barely realizing what happened. Game Over";
            break;
        case "health":
            dialogElement.innerHTML = "Your body cannot take the burden of living anymore the damages you have accumulated are too grave to heal, you collapse on the ground just in time to see the sunset one last time, you die. Game Over";
            break;
        case "monster":
            dialogElement.innerHTML = "The beast overpowers you and crushes your spine with its jaw, you die instantly. Game over";
            break;
        case "escape":
            dialogElement.innerHTML = "You repaied the boat and now you're cruising home leaving the island behind you, soon this will all be a bad memory, you have survived";
            break;
    }
}
function fadeIn() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transitionElement.style.opacity = "1";
                    transHideElement.forEach(function (element) {
                        element.style.opacity = "0";
                    });
                    Relocate("beach");
                    return [4 /*yield*/, sleep(300)];
                case 1:
                    _a.sent();
                    _loop_1 = function (j) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, sleep(40)];
                                case 1:
                                    _b.sent();
                                    transitionElement.style.opacity = "".concat(j / 100);
                                    transHideElement.forEach(function (element) {
                                        element.style.opacity = "".concat(1 - j / 100);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    j = 100;
                    _a.label = 2;
                case 2:
                    if (!(j > 0)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(j)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    j -= 5;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
fadeIn();
function transition(location) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_2, i, _loop_3, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_2 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, sleep(30)];
                                case 1:
                                    _b.sent();
                                    transitionElement.style.opacity = "".concat(i / 100);
                                    transHideElement.forEach(function (element) {
                                        element.style.opacity = "".concat(1 - i / 100);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 5;
                    return [3 /*break*/, 1];
                case 4:
                    Relocate(location);
                    return [4 /*yield*/, sleep(200)];
                case 5:
                    _a.sent();
                    _loop_3 = function (j) {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, sleep(30)];
                                case 1:
                                    _c.sent();
                                    transitionElement.style.opacity = "".concat(j / 100);
                                    transHideElement.forEach(function (element) {
                                        element.style.opacity = "".concat(1 - j / 100);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    j = 100;
                    _a.label = 6;
                case 6:
                    if (!(j > 0)) return [3 /*break*/, 9];
                    return [5 /*yield**/, _loop_3(j)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    j -= 5;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function canCraft(recipe) {
    recipe.forEach(function (element) {
        if (!inventory.includes(element)) {
            return false;
        }
    });
    return true;
}
function goToSleep(text, textElement) {
    return __awaiter(this, void 0, void 0, function () {
        var audio, _loop_4, i, recovered, _loop_5, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    audio = new Audio("mp3/sfx/sleep.mp3");
                    audio.play();
                    _loop_4 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, sleep(30)];
                                case 1:
                                    _b.sent();
                                    transitionElement.style.opacity = "".concat(i / 100);
                                    transHideElement.forEach(function (element) {
                                        element.style.opacity = "".concat(1 - i / 100);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_4(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 5;
                    return [3 /*break*/, 1];
                case 4:
                    if (inventory.includes("Sleeping Bag")) {
                        actions = 6;
                        text = text.replace("x", "all of your");
                    }
                    else {
                        recovered = randInt(2, 4);
                        actions += recovered;
                        text = text.replace("x", recovered.toString());
                        if (actions >= 6) {
                            text = text.replace(recovered.toString(), "all of your");
                            actions = 6;
                        }
                    }
                    textElement.innerHTML = text;
                    if (volcanoTimer != 5) {
                        volcanoTimer += randInt(1, 100) > 70 ? 1 : 0;
                    }
                    else if (randInt(1, 100) > 70) {
                        GameOver("eruption");
                    }
                    UpdateStats();
                    _loop_5 = function (j) {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, sleep(30)];
                                case 1:
                                    _c.sent();
                                    transitionElement.style.opacity = "".concat(j / 100);
                                    transHideElement.forEach(function (element) {
                                        element.style.opacity = "".concat(1 - j / 100);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    j = 100;
                    _a.label = 5;
                case 5:
                    if (!(j > 0)) return [3 /*break*/, 8];
                    return [5 /*yield**/, _loop_5(j)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    j -= 5;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function Relocate(location) {
    if (!actions)
        return;
    if (bgElement) {
        bgElement.style.backgroundImage = "url(img/".concat(location.replace(" ", "_"), ".png)");
    }
    if (audioElement) {
        audioElement.setAttribute("src", "mp3/music/".concat(location.replace(" ", "_"), ".mp3"));
    }
    if (locationElement) {
        locationElement.textContent = location;
    }
    currentLocation = location.replace(" ", "_");
    getText(location.replace(" ", "_"));
    if (visited.length) {
        actions -= 1;
        food -= 5;
        water -= 10;
    }
    UpdateStats();
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setupDiscardButtons() {
    document.querySelectorAll(".discard-btn").forEach(function (element) {
        element.addEventListener("click", function () {
            var index = inventory.indexOf(element.innerHTML);
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
    document.querySelectorAll(".eat-btn").forEach(function (element) {
        element.addEventListener("click", function () {
            var index = inventory.indexOf(element.innerHTML);
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
            var foodItems = getFoodItems(inventory);
            if (foodItems.length) {
                setupEatButtons();
            }
        });
    });
}
function setupDrinkButtons() {
    document.querySelectorAll(".drink-btn").forEach(function (element) {
        element.addEventListener("click", function () {
            var index = inventory.indexOf(element.innerHTML);
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
            var drinkItems = getDrinkItems(inventory);
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
var recipes = {
    Spear: ["Sticks", "Stone", "Twine"],
    "Fishing Rod": ["Sticks", "Twine"],
    "Stone Axe": ["Sticks", "Stone"],
    Campfire: ["Sticks", "Stone"],
    "Sleeping Bag": ["Twine", "Leather"],
};
document.querySelectorAll(".crafting").forEach(function (element) {
    element.addEventListener("click", function () {
        craftItem(element.innerHTML);
    });
});
function craftItem(itemName) {
    var recipe = recipes[itemName];
    if (canCraft(recipe)) {
        recipe.forEach(function (material) { return inventory.splice(inventory.indexOf(material)); });
        getItem(itemName);
        document.querySelector(".main-dialoge").textContent = "You have crafted a ".concat(itemName, "!");
        checkForItems();
    }
    else {
        document.querySelector(".main-dialoge").textContent = "You don't have the necessary materials to craft a ".concat(itemName, ".");
    }
}
function CapitalizeCase(input) {
    var string = "";
    input = input.replace("_", " ");
    for (var i = 0; i < input.length; i++) {
        if (input[i - 1] == " " || i == 0)
            string += input[i].toUpperCase();
        else
            string += input[i];
    }
    return string;
}
function getText(location) {
    return __awaiter(this, void 0, void 0, function () {
        var data, id, entry, activityIds, interactIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./locations.json")
                        .then(function (response) {
                        return response.json();
                    })
                        .then(function (json) {
                        data = json[location];
                    })];
                case 1:
                    _a.sent();
                    if (visited.includes(location)) {
                        id = randInt(2, 4);
                    }
                    else {
                        id = 1;
                        visited.push(location.replace(" ", "_"));
                    }
                    if (location == "volcano") {
                        id = volcanoTimer;
                    }
                    entry = data.description.find(function (item) { return item.id === id; });
                    if (dialogElement && (entry === null || entry === void 0 ? void 0 : entry.description)) {
                        dialogElement.innerHTML = entry.description;
                    }
                    PopulateDropdown(travelElement, data.connections, "travel-btn");
                    document.querySelectorAll(".travel-btn").forEach(function (element) {
                        element.addEventListener("click", function () {
                            transition(element.textContent.trim());
                        });
                    });
                    activityIds = data.activities.map(function (activity) { return activity.id; });
                    PopulateDropdown(huntGatherElement, activityIds, "hunt-gather-btn");
                    document.querySelectorAll(".hunt-gather-btn").forEach(function (element) {
                        element.addEventListener("click", function () {
                            updateDialogWithActivity(element.textContent.replace(" ", "_"));
                        });
                    });
                    interactIds = data.interact.map(function (interact) { return interact.id; });
                    PopulateDropdown(interactElement, interactIds, "interact-btn");
                    document.querySelectorAll(".interact-btn").forEach(function (element) {
                        element.addEventListener("click", function () {
                            updateDialogWithInteract(element.textContent.replace(" ", "_"));
                        });
                    });
                    if (poisoned) {
                        health -= 5;
                    }
                    UpdateStats();
                    return [2 /*return*/];
            }
        });
    });
}
function checkForItems() {
    var bTags = document.querySelectorAll(".interact-btn");
    var searchText2 = "campfire";
    var found2;
    bTags.forEach(function (element2) {
        if (element2.textContent == searchText2) {
            found2 = element2;
            found2.disabled = !inventory.includes("Campfire");
        }
    });
    var aTags = document.querySelectorAll(".hunt-gather-btn");
    var searchText = "planks";
    var found;
    aTags.forEach(function (element) {
        if (element.textContent == searchText) {
            found = element;
            found.disabled = !inventory.includes("Stone Axe");
        }
    });
}
function updateDialogWithActivity(activityId) {
    if (!actions)
        return;
    fetch("./locations.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        var data = json[currentLocation];
        var activity = data.activities.find(function (act) { return act.id === activityId; });
        var rng;
        var returnString = "";
        var hasSpear;
        switch (activityId) {
            case "foraging":
                returnString = activity.text;
                var type = randInt(0, 1);
                if (type) {
                    returnString = returnString.replace("y,", "berries,");
                    getItem("Berries");
                }
                else {
                    returnString = returnString.replace("y,", "mushroom,");
                    getItem("Mushroom");
                }
                break;
            case "fish":
                returnString += activity.text.split("|")[0];
                rng = randInt(1, 100);
                if (rng > 50 - hasSpear) {
                    returnString += activity.text.split("|")[1];
                    getItem("Raw Fish");
                }
                else {
                    returnString += activity.text.split("|")[2];
                }
                break;
            case "hunt":
                returnString += activity.text.split("|")[0];
                rng = randInt(1, 100);
                if (rng > 70 - hasSpear) {
                    returnString += activity.text.split("|")[1];
                    getItem("Raw Meat");
                }
                else {
                    returnString += activity.text.split("|")[2];
                }
                break;
            case "sticks":
            case "twine":
                var amount = randInt(1, 3);
                for (var i = 0; i < amount; i++) {
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
        var audio = new Audio("mp3/sfx/".concat(activityId, ".mp3"));
        audio.play();
        if (currentLocation == "deep_forest") {
            rng = randInt(1, 100);
            if (rng > 70) {
                var audio_1 = new Audio("mp3/sfx/enemy.mp3");
                audio_1.play();
                returnString += " While gathering you encounterd a wolf, you managed to escape but was badly hurt.";
                health -= 50;
            }
        }
        if (dialogElement && (activity === null || activity === void 0 ? void 0 : activity.text)) {
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
function updateDialogWithInteract(interactId) {
    var _this = this;
    if (!actions && interactId != "sleep")
        return;
    fetch("./locations.json")
        .then(function (response) { return response.json(); })
        .then(function (json) { return __awaiter(_this, void 0, void 0, function () {
        var data, interact, returnString, index, element, ruins, machete, monster, audio_2, index, interactIds, audio;
        return __generator(this, function (_a) {
            data = json[currentLocation];
            interact = data.interact.find(function (inter) { return inter.id === interactId; });
            switch (interactId) {
                case "sleep":
                    goToSleep(interact.text, dialogElement);
                    break;
                case "campfire":
                    for (index = 0; index < inventory.length; index++) {
                        element = inventory[index];
                        element.replace("raw", "cooked");
                        element.replace("dirty", "");
                    }
                    ;
                case "investegate":
                    returnString = interact.text;
                    if (currentLocation === "forest") {
                        actions -= 1;
                        ruins = randInt(0, 1);
                        if (ruins) {
                            ruinsFound = true;
                            PopulateDropdown(travelElement, data.connections, "travel-btn");
                            document.querySelectorAll(".travel-btn").forEach(function (element) {
                                element.addEventListener("click", function () {
                                    transition(element.textContent.trim());
                                });
                            });
                            returnString =
                                "While investegating you found a hidden stone path";
                        }
                        else {
                            returnString = interact.text;
                        }
                    }
                    if (currentLocation === "ruins") {
                        machete = randInt(0, 1);
                        monster = randInt(0, 1);
                        if (machete) {
                            getItem("Machete");
                            returnString =
                                "While locking for somthing intresting you came acros a old machete. I can use this to defend myself";
                        }
                        if (monster) {
                            audio_2 = new Audio("mp3/sfx/enemy.mp3");
                            audio_2.play();
                            if (inventory.includes("Machete")) {
                                returnString =
                                    "While locking for somthing intresting you encounterd monster, you managed to escape thanks to the machete but was badly hurt.";
                                health = 5;
                            }
                            else {
                                returnString = "You died";
                                health = 0;
                            }
                        }
                    }
                    break;
                case "repair":
                    returnString = interact.text;
                    if (inventory.includes("Planks")) {
                        index = inventory.indexOf("Planks");
                        inventory.splice(index, 1);
                        repairprogres += 1;
                        returnString = "You have repaired a part of the boat, you only need to repair ".concat(10 - repairprogres, " parts to have it fully repaired");
                    }
                    if (repairprogres == 10) {
                        returnString = "You have repaired the boat, finely you can go home";
                        interactIds = data.interact.map(function (interact) { return interact.id; });
                        PopulateDropdown(interactElement, interactIds, "interact-btn");
                        document.querySelectorAll(".interact-btn").forEach(function (element) {
                            element.addEventListener("click", function () {
                                updateDialogWithInteract(element.textContent.replace(" ", "_"));
                            });
                        });
                    }
                    break;
                case "escape":
                    Relocate("victory!");
                    GameOver("escape");
                    break;
                case "bath":
                    returnString = interact.text;
                    if (currentLocation == "hotspring") {
                        health += 20;
                        poisoned = false;
                    }
                    break;
                default:
                    returnString = interact.text;
                    actions -= 1;
            }
            if (dialogElement && (interact === null || interact === void 0 ? void 0 : interact.text) && !(interactId == "sleep")) {
                dialogElement.innerHTML = returnString;
            }
            if (poisoned) {
                health -= 5;
            }
            audio = new Audio("mp3/sfx/".concat(interactId, ".mp3"));
            audio.play();
            UpdateStats();
            return [2 /*return*/];
        });
    }); });
}
function getItem(string) {
    if (inventory.length < 7) {
        inventory.push(string.replace("_", " "));
    }
    UpdateStats();
}
function UpdateStats() {
    health -= (food == 0) ? 5 : 0;
    health -= (water == 0) ? 10 : 0;
    if (healthElement) {
        healthElement.style.width = "".concat(health, "%");
    }
    if (foodElement) {
        foodElement.style.width = "".concat(food, "%");
    }
    if (waterElement) {
        waterElement.style.width = "".concat(water, "%");
    }
    if (actionsElement) {
        actionsElement.innerHTML = "".concat(actions);
    }
    if (itemElement) {
        itemElement.innerHTML = "";
        var counter_1 = {};
        inventory.forEach(function (ele) {
            if (counter_1[ele]) {
                counter_1[ele] += 1;
            }
            else {
                counter_1[ele] = 1;
            }
        });
        var result = Object.entries(counter_1)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, ": ").concat(value);
        })
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
            GameOver("health");
        }
    }
}
function PopulateDropdown(parent, array) {
    var extraCss = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extraCss[_i - 2] = arguments[_i];
    }
    parent.replaceChildren();
    if (parent && array.length) {
        array.forEach(function (element) {
            var listElement = document.createElement("li");
            listElement.className = "dropdown-item";
            var buttonElement = document.createElement("button");
            buttonElement.textContent = element.replace("_", " ");
            buttonElement.className = "btn btn-secondary w-100 ".concat(extraCss.join(" "));
            if (buttonElement.textContent == "ruins" && !ruinsFound) {
                buttonElement.hidden = true;
            }
            if (buttonElement.textContent == "escape" && repairprogres !== 10) {
                buttonElement.hidden = true;
            }
            buttonElement.addEventListener("click", function () {
                var audio = new Audio("mp3/sfx/button".concat(1 + Math.floor(Math.random() * 3), ".mp3"));
                audio.play();
            });
            listElement.appendChild(buttonElement);
            parent.appendChild(listElement);
        });
    }
}
function togglePlay() {
    if (audioElement) {
        audioElement.muted = !audioElement.muted;
    }
}
document.querySelectorAll("button").forEach(function (element) {
    element.addEventListener("click", function () {
        var audio = new Audio("mp3/sfx/button".concat(1 + Math.floor(Math.random() * 3), ".mp3"));
        audio.play();
    });
});
(_a = document.querySelector(".music-toggle")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", togglePlay);
