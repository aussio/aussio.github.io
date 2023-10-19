import {clamp, boxesHitEachOther} from "./utils.js";

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

let score = 0
const stuff = new PIXI.Text(score, style)
app.stage.addChild(stuff);

const debug = new PIXI.Text("", style)
debug.y = 30
app.stage.addChild(debug);

let food = getRandomFood()
app.stage.addChild(food);

let hasStarted = false
function onStart() {
    text.destroy()
}

document.body.appendChild(app.view);
const [left, up, right, down] = setUpKeyboard()
let xSpeed = 0
let ySpeed = 0

function getColor() {
    const rainbow = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"]
    return rainbow[Math.floor(Math.random()*rainbow.length)]
}

// Snake
const headX = Math.floor(xGrids / 2) * gridSize
const headY = Math.floor(yGrids / 2) * gridSize
const head = box(getColor(), headX, headY)
const snakeBoxes = [head]
const maxLength = 8

// Listen for animate update
app.ticker.maxFPS = 10
app.ticker.add((delta) =>
{
    updateSpeed()
    updatePosition()
    const head = snakeBoxes[0]
    if (boxesHitEachOther(head, food)) {
        foodEaten(head)
    }
    if (snakeHitsItself()) {
        endGame()
    }
    stuff.text = `Score: ${score}`
});

function snakeHitsItself() {
    const head = snakeBoxes[0]
    const tail = snakeBoxes.length-1
    for (const box of snakeBoxes.slice(1, tail)) {
        if (boxesHitEachOther(head, box)) {
            return true
        }
    }
    return false
}

function endGame() {


    const middleX = app.screen.width / 2
    const middleY = app.screen.height / 2
    const gameOver = new PIXI.Text("Game Over!", new PIXI.TextStyle({
        fontSize: 50,
        fill: 'darkblue',
    }))
    gameOver.x = middleX - (gameOver.width / 2)
    gameOver.y = middleY - gameOver.height
    const scoreText = new PIXI.Text(`Score: ${score}`, new PIXI.TextStyle({
        fontSize: 30,
        fill: 'darkblue',
    }))
    scoreText.x = middleX - (scoreText.width / 2)
    scoreText.y = middleY
    app.stage.addChild(gameOver);
    app.stage.addChild(scoreText);

    for (let i=1; i<= 5; i++) {
        box(
            getColor(),
            middleX - (gridSize*i),
            middleY + (gridSize*2)
        )
    }

    const food = getFood()
    food.x = middleX + gridSize
    food.y = middleY + (gridSize*2)
    app.stage.addChild(food);
}

function foodEaten(head) {
        score = score + 100
        const tail = snakeBoxes[snakeBoxes.length - 1]
        snakeBoxes.push(box(getColor(), tail.x, tail.y))
        food.destroy()
        food = getRandomFood()
        app.stage.addChild(food);
}

function updatePosition(delta) {
    const head = snakeBoxes[0]
    let [nextX, nextY] = getNextPosition(head)
    const isTimeToMove = (head.x != nextX || head.y != nextY)
    // If we've moved
    if ( isTimeToMove ) {
        if (!hasStarted) {
            hasStarted = true
            onStart()
        }
        let tempX = null
        let tempY = null
        for (const box of snakeBoxes) {
            tempX = box.x
            tempY = box.y
            box.x = nextX
            box.y = nextY
            nextX = tempX
            nextY = tempY
        }
    }
}

function getNextPosition(box) {
    let [nextX, isNewX] = clamp(box.x + xSpeed, 0, app.screen.width - gridSize)
    let [nextY, isNewY] = clamp(box.y + ySpeed, 0, app.screen.height - gridSize)
    return [nextX, nextY]
}

function updateSpeed() {
    const speedChangeFactor = gridSize
    if (left.isDown && xSpeed <= 0) {
        xSpeed = -speedChangeFactor
        ySpeed = 0
    } else if (right.isDown && xSpeed >= 0) {
        xSpeed = speedChangeFactor
        ySpeed = 0
    }

    if (down.isDown && ySpeed >= 0) {
        ySpeed = speedChangeFactor
        xSpeed = 0
    } else if (up.isDown && ySpeed <= 0) {
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

function getFood() {
    const text = ["🍓", "🍌"][Math.round(Math.random())]
    return new PIXI.Text(text, new PIXI.TextStyle({
        fontSize: 30,
    }))
}

function getRandomFood() {
    const food = getFood()
    const randomX = Math.random() * app.screen.width
    const randomY = Math.random() * app.screen.height
    let [x, _x] = clamp(randomX, gridSize, app.screen.width - gridSize)
    let [y, _y] = clamp(randomY, gridSize, app.screen.height - gridSize)
    food.x = x
    food.y = y
    return food
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