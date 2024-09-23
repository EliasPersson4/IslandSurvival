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
var sleep = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var visited = [];
var currentLocation = "beach";
var inventory = ["Campfire", "Stone Axe"];
function transition(location) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i, _loop_2, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
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
                    return [5 /*yield**/, _loop_1(i)];
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
                    _loop_2 = function (j) {
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
                    return [5 /*yield**/, _loop_2(j)];
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
function goToSleep(text, textElement) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_3, i, recovered, _loop_4, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_3 = function (i) {
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
                    return [5 /*yield**/, _loop_3(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 5;
                    return [3 /*break*/, 1];
                case 4:
                    if (inventory.includes("sleeping bag")) {
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
                    UpdateStats();
                    _loop_4 = function (j) {
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
                    return [5 /*yield**/, _loop_4(j)];
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
    currentLocation = location;
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
                    UpdateStats();
                    return [2 /*return*/];
            }
        });
    });
}
function checkForItems() {
    if (!inventory.includes("Campfire")) {
        var bTags = document.querySelectorAll(".interact-btn");
        var searchText2_1 = "campfire";
        var found2_1;
        bTags.forEach(function (element2) {
            if (element2.textContent == searchText2_1) {
                found2_1 = element2;
                found2_1.disabled = true;
            }
        });
    }
    if (!inventory.includes("Stone Axe")) {
        var aTags = document.querySelectorAll(".hunt-gather-btn");
        var searchText_1 = "planks";
        var found_1;
        aTags.forEach(function (element) {
            if (element.textContent == searchText_1) {
                found_1 = element;
                found_1.disabled = true;
            }
        });
    }
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
        switch (activityId) {
            case "Fish":
                returnString += activity.text.split("|")[0];
                rng = randInt(1, 100);
                if (rng > 50) {
                    returnString += activity.text.split("|")[1];
                    getItem(("Raw_" + activityId).replace("_", " "));
                }
                else {
                    returnString += activity.text.split("|")[2];
                }
                break;
            case "hunt":
                returnString += activity.text.split("|")[0];
                rng = randInt(1, 100);
                if (rng > 70) {
                    returnString += activity.text.split("|")[1];
                    getItem("Raw_Meat".replace("_", " "));
                }
                else {
                    returnString += activity.text.split("|")[2];
                }
                break;
            case "sticks":
            case "twine":
                var amount = randInt(1, 3);
                for (var i = 0; i < amount; i++) {
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
        if (dialogElement && (activity === null || activity === void 0 ? void 0 : activity.text)) {
            dialogElement.innerHTML = returnString;
        }
        actions -= 1;
        food -= 10;
        water -= 5;
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
        var data, interact, returnString;
        return __generator(this, function (_a) {
            data = json[currentLocation];
            interact = data.interact.find(function (inter) { return inter.id === interactId; });
            switch (interactId) {
                case "sleep":
                    goToSleep(interact.text, dialogElement);
                    break;
                default:
                    returnString = interact.text;
                    actions -= 1;
            }
            if (dialogElement && (interact === null || interact === void 0 ? void 0 : interact.text) && !(interactId == "sleep")) {
                dialogElement.innerHTML = returnString;
            }
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
            listElement.appendChild(buttonElement);
            parent.appendChild(listElement);
        });
    }
}
Relocate("beach");
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
