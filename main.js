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
var travelElement = document.querySelector(".travel-menu");
var locationElement = document.querySelector(".location");
var audioElement = document.querySelector(".music");
var interactElement = document.querySelector(".interact-menu");
var huntGatherElement = document.querySelector(".hunt-gather-menu");
var dialogElement = document.querySelector(".main-dialoge");
var actionsElement = document.querySelector(".actions");
var visited = [];
var interactions = ["sleep", "investigate", "stroke_yo_bone"];
var currentLocation = "beach";
function Relocate(location) {
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
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getText(location) {
    return __awaiter(this, void 0, void 0, function () {
        var data, id, entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./locations.json").then(function (response) {
                        return response.json();
                    }).then(function (json) {
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
                            Relocate(element.textContent.trim());
                        });
                    });
                    PopulateDropdown(huntGatherElement, data.activities, "hunt-gather-btn");
                    return [2 /*return*/];
            }
        });
    });
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
}
function PopulateDropdown(parent, array) {
    var extraCss = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extraCss[_i - 2] = arguments[_i];
    }
    if (parent) {
        parent.replaceChildren();
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
UpdateStats();
PopulateDropdown(interactElement, interactions, "interact-btn");
var isPlaying = !(audioElement === null || audioElement === void 0 ? void 0 : audioElement.muted);
function togglePlay() {
    if (audioElement) {
        audioElement.muted = isPlaying;
    }
    isPlaying = !isPlaying;
}
document.querySelectorAll("button").forEach(function (element) {
    element.addEventListener("click", function () {
        var audio = new Audio("mp3/sfx/button".concat(1 + Math.floor(Math.random() * 3), ".mp3"));
        audio.play();
    });
});
(_a = document.querySelector(".music-toggle")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", togglePlay);
