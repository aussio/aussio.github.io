import {clamp} from "./utils.js";

const gridSize = 30;
const app = new PIXI.Application({
    background: '#1099bb',
    width: gridSize * Math.floor(window.innerWidth / gridSize),
    height: gridSize * Math.floor(window.innerHeight / gridSize),
});

const xGrids = app.screen.width / gridSize
const yGrids = app.screen.height / gridSize

const style = new PIXI.TextStyle({
    fill: "white",
    fontSize: 20,
})
const text = new PIXI.Text("arrow keys to move", style)
text.x = (gridSize * xGrids / 2) - (text.width / 2)
text.y = (gridSize * yGrids / 2) - (text.height * 2)
app.stage.addChild(text);

let hasStarted = false
function onStart() {
    text.destroy()
}

document.body.appendChild(app.view);
const [left, up, right, down] = setUpKeyboard()
let xSpeed = 0
let ySpeed = 0

// Snake
const headX = Math.floor(xGrids / 2) * gridSize
const headY = Math.floor(yGrids / 2) * gridSize
const head = box(0xDE3249, headX, headY)
const snakeBoxes = [head]
const maxLength = 8

// Listen for animate update
app.ticker.maxFPS = 10
app.ticker.add((delta) =>
{
    updateSpeed()
    updatePosition()
});

function updatePosition(delta) {
    const head = snakeBoxes[snakeBoxes.length - 1]
    const [newX, isNewX] = clamp(head.x + xSpeed, 0, app.screen.width - gridSize)
    const [newY, isNewY] = clamp(head.y + ySpeed, 0, app.screen.height - gridSize)
    // If we've moved
    if (head.x != newX || head.y != newY ) {
        if (!hasStarted) {
            hasStarted = true
            onStart()
        }
        snakeBoxes.push(box(0xAE3249, newX, newY))
    }
    if (snakeBoxes.length > maxLength) {
        const box = snakeBoxes.shift()
        box.destroy()
    }
}

function updateSpeed() {
    const speedChangeFactor = gridSize
    if (left.isDown) {
        xSpeed = -speedChangeFactor
        ySpeed = 0
    } else if (right.isDown) {
        xSpeed = speedChangeFactor
        ySpeed = 0
    }

    if (down.isDown) {
        ySpeed = speedChangeFactor
        xSpeed = 0
    } else if (up.isDown) {
        ySpeed = -speedChangeFactor
        xSpeed = 0
    }
}

function box(color, x, y) {
    const box = new PIXI.Graphics();
    box.beginFill(color);
    box.drawRect(0, 0, gridSize, gridSize);
    box.x = x
    box.y = y
    box.endFill();
    app.stage.addChild(box)
    return box
}

function setUpKeyboard() {
    // Define the keyboard code variables
    const left = keyboard(37)
    const up = keyboard(38)
    const right = keyboard(39)
    const down = keyboard(40)

    left.press = () => {};
    left.release = () => {};
    right.press = () => {};
    right.release = () => {};
    up.press = () => {};
    up.release = () => {};
    down.press = () => {};
    down.release = () => {};

    return [left, up, right, down]
}

function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    // Key is pressed
    key.downHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    // Key is released
    key.upHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    // Attach keydown and keyup event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}