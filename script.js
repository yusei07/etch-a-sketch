const DEFAULT_COLOR = '#313335'
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

function setCurrentMode(newMode) {
  activeButton(newMode)
  currentMode = newMode
}

const colorPicker = document.getElementById('colorPicker')
const colorButton = document.getElementById('colorButton')
const rainbowButton = document.getElementById('rainbowButton')
const eraserButton = document.getElementById('eraserButton')
const clearButton = document.getElementById('clearButton')

const grid = document.getElementById('grid')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function initialiseGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.style.background = 'none'
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement)
  }
}

// color, rainbow, eraser btn
function changeColor(e) {
  // checks if the mouse is pressed down not just hover
  if (e.type === 'mouseover' && !mouseDown) return // returns nothing

  if (currentMode == 'rainbow') {
    e.target.style.backgroundColor = `hsl(${ Math.random() * 360 }, 100%, 50%)`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#e0e0e0'
  }
}

// clear btn
function clearGrid() {
  grid.innerHTML = ''
  initialiseGrid(currentSize)
}

// change grid size
const sizeSlider = document.querySelector('#rangeSlider')
const sizeValue = document.querySelector('#rangeValue')

function changeSize(value) {
  setCurrentSize(value)
  updateSize(value)
  clearGrid()
}

// display the value of the grid
function updateSize(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

// display pressed btn effect
function activeButton(newMode) {
  // remove active class style on current btn
  if (currentMode === 'rainbow') {
    rainbowButton.classList.remove('active')
  } else if (currentMode === 'color') {
    colorButton.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserButton.classList.remove('active')
  }

  // add to the new btn
  if (newMode === 'rainbow') {
    rainbowButton.classList.add('active')
  } else if (newMode === 'color') {
    colorButton.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserButton.classList.add('active')
  }
}

// buttons
colorButton.addEventListener('click', () => {
  setCurrentMode('color')
})

rainbowButton.addEventListener('click', () => {
  setCurrentMode('rainbow')
})

eraserButton.addEventListener('click', () => {
  setCurrentMode('eraser')
})

clearButton.addEventListener('click', () => {
  clearGrid()
})


// color picker
colorPicker.addEventListener('input', (e) => {
  setCurrentColor(e.target.value)
})


// range slider (change grid size)
sizeSlider.addEventListener('mousemove', (e) => {
  updateSize(e.target.value)
})

sizeSlider.addEventListener('change', (e) => {
  changeSize(e.target.value)
})


document.addEventListener('DOMContentLoaded', () => {
  initialiseGrid(DEFAULT_SIZE)
  activeButton(DEFAULT_MODE)
})
