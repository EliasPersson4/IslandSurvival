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
var locations = ["beach", "deep_forest", "forest", "hotspring", "lake", "river", "ruins", "shipwreck", "volcano"];
var interactions = ["sleep", "investigate", "stroke_yo_bone"];
var huntGather = ["Hunt", "Fish", "Gather"];
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
UpdateStats();
PopulateDropdown(interactElement, interactions, "interact-btn");
PopulateDropdown(travelElement, locations, "travel-btn");
PopulateDropdown(huntGatherElement, huntGather, "hunt-gather-btn");
document.querySelectorAll(".travel-btn").forEach(function (element) {
    element.addEventListener("click", function () {
        Relocate(element.textContent.trim());
    });
});
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
