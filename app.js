const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "oneColor";

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

function changeSize(newSize) {
  size = newSize;
}

function changeColor(newColor) {
  color = newColor;
}

function changeMode(newMode) {
  mode = newMode;
}

function clearCreatedGrid() {
  gridContainer.innerHTML = "";
}

// sketch
const gridContainer = document.querySelector(".sketch");

// controls
const sizeController = document.querySelector("#size");
const sizeValue = document.querySelector(".size-value");
const colorPicker = document.querySelector("#color");

// modes
const colorMode = document.querySelector(".color");
const randomColorMode = document.querySelector(".random-colors");
const eraser = document.querySelector(".eraser");

// clear button
const clearBtn = document.querySelector(".clear-button");

// create initial grid
createGrid(size);

// listen to clear button click
clearBtn.addEventListener("click", () => createGrid(size));

// preview live value of the input
sizeController.addEventListener("mousemove", (e) => {
  let value = e.target.value;
  sizeValue.textContent = `${value} * ${value}`;
});

// update the size and create the grid
sizeController.addEventListener("change", (e) => {
  let value = e.target.value;
  changeSize(value);
  createGrid(size);
});

// listen to color change
colorPicker.addEventListener("change", (e) => changeColor(e.target.value));

colorMode.addEventListener("click", setColorMode);
randomColorMode.addEventListener("click", setRandomMode);
eraser.addEventListener("click", setEraserMode);

// clear the old grid and create new one
function createGrid(gridSize) {
  clearCreatedGrid();

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("element");
    gridElement.addEventListener("mouseenter", fillElement);
    gridContainer.appendChild(gridElement);
  }
}

// fill element with color depending on current mood
function fillElement(e) {
  // one selected color
  if (mode === "oneColor") {
    e.target.style.backgroundColor = color;

    // random color
  } else if (mode === "randomColor") {
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R},${G},${B}`;

    // white color as eraser
  } else if (mode === "eraser") {
    e.target.style.backgroundColor = "#ffffff";
  }
}

function setColorMode() {
  changeMode("oneColor");
  if (mode === "oneColor") {
    colorMode.classList.add("active");
    randomColorMode.classList.remove("active");
    eraser.classList.remove("active");
  }
}
function setRandomMode() {
  changeMode("randomColor");
  if (mode === "randomColor") {
    randomColorMode.classList.add("active");
    colorMode.classList.remove("active");
    eraser.classList.remove("active");
  }
}
function setEraserMode() {
  changeMode("eraser");
  if (mode === "eraser") {
    eraser.classList.add("active");
    colorMode.classList.remove("active");
    randomColorMode.classList.remove("active");
  }
}
