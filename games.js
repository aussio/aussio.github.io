import {clamp, boxesHitEachOther} from "./utils.js";

const gridSize = 30;
let app, snakeBoxes, text, scoreText, food;
let left, up, right, down;
let xSpeed, ySpeed, score, hasStarted;
let direction = null;
const headTexture = PIXI.Texture.from('./images/head.png');
const bodyTexture = PIXI.Texture.from('./images/body.png');

function startGame() {
    app = new PIXI.Application({
        background: '#1099bb',
        width: gridSize * Math.floor(window.innerWidth / gridSize),
        height: gridSize * Math.floor(window.innerHeight / gridSize),
    });

    restartGame()
}

function anyKeyToContinue(e) {
    restartGame()
}

function restartGame() {
    const keys = setUpKeyboard()
    left = keys[0]
    up = keys[1]
    right = keys[2]
    down = keys[3]

    app.ticker.start()
    app.stage.removeChildren()
    xSpeed = 0
    ySpeed = 0
    score = 0
    hasStarted = false

    const xGrids = app.screen.width / gridSize
    const yGrids = app.screen.height / gridSize

    const style = new PIXI.TextStyle({
        fill: "white",
        fontSize: 20,
    })
    text = new PIXI.Text("arrow keys to move", style)
    text.x = (gridSize * xGrids / 2) - (text.width / 2)
    text.y = (gridSize * yGrids / 2) - (text.height * 2)
    app.stage.addChild(text);

    scoreText = new PIXI.Text(score, style)
    app.stage.addChild(scoreText);

    food = getRandomFood()
    app.stage.addChild(food);

    // Snake
    const headX = (Math.floor(xGrids / 2) * gridSize) + (gridSize / 2)
    const headY = (Math.floor(yGrids / 2) * gridSize) + (gridSize / 2)
    const head = box(headTexture, headX, headY)
    snakeBoxes = [head]

    document.body.appendChild(app.view);
}

startGame()
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
    scoreText.text = `Score: ${score}`
});

function onStart() {
    text.destroy()
}

function getColor() {
    const rainbow = ["rgb(255,136,136)",
        "rgb(143,251,255)",
        "rgb(255,255,127)",
        "rgb(123,123,255)",
        "rgb(247,129,255)",
    ]
    return rainbow[Math.floor(Math.random()*rainbow.length)]
}


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

function endGameReset() {
    xSpeed = 0
    ySpeed = 0
    food.destroy()
    scoreText.destroy()
    for (let box of snakeBoxes) {
        box.destroy()
    }
}

function endGame() {
    endGameReset()

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

    const size = gridSize * 2
    const head = box(
        headTexture,
        middleX,
        middleY + size*1.5,
        size,
    )
    head.angle = 90
    for (let i=1; i<= 5; i++) {
        box(
            bodyTexture,
            middleX - ((size/2) * i),
            middleY + size*1.5,
            size,
        )
    }

    const endFood = getFood(size)
    endFood.x = middleX + size
    endFood.y = middleY + size
    app.stage.addChild(endFood);

    app.ticker.stop()

    function anyKeyToContinue() {
        window.removeEventListener("keydown", anyKeyToContinue)
        restartGame()
    }

    setTimeout(() => {
        window.addEventListener("keydown", anyKeyToContinue)
        const anyKeyText = new PIXI.Text(`Press any key to play again`, new PIXI.TextStyle({
            fontSize: 20,
            fill: 'white',
        }))
        anyKeyText.x = middleX - (anyKeyText.width / 2)
        anyKeyText.y = middleY + anyKeyText.height * 2
        app.stage.addChild(anyKeyText);
        app.render()
    }, 1000)

}

function foodEaten(head) {
        score = score + 100
        const tail = snakeBoxes[snakeBoxes.length - 1]
        snakeBoxes.push(box(bodyTexture, tail.x, tail.y))
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
        switch (direction) {
            case 'left':
                head.angle = -90;
                break;
            case 'right':
                head.angle = 90;
                break;
            case 'down':
                head.angle = 180;
                break;
            case 'up':
                head.angle = 0;
                break;
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
    let [nextX, isNewX] = clamp(box.x + xSpeed, gridSize/2, gridSize/2 + app.screen.width - gridSize)
    let [nextY, isNewY] = clamp(box.y + ySpeed, gridSize/2, gridSize/2 + app.screen.height - gridSize)
    return [nextX, nextY]
}

function updateSpeed() {
    const speedChangeFactor = gridSize
    if (left.isDown && xSpeed <= 0) {
        direction = 'left'
        xSpeed = -speedChangeFactor
        ySpeed = 0
    } else if (right.isDown && xSpeed >= 0) {
        direction = 'right'
        xSpeed = speedChangeFactor
        ySpeed = 0
    }

    if (down.isDown && ySpeed >= 0) {
        direction = 'down'
        ySpeed = speedChangeFactor
        xSpeed = 0
    } else if (up.isDown && ySpeed <= 0) {
        direction = 'up'
        ySpeed = -speedChangeFactor
        xSpeed = 0
    }
}

function box(texture, x, y, size=gridSize) {
    const box = new PIXI.Sprite(texture);
    box.tint = getColor()
    box.interactive = true;
    box.hitArea = new PIXI.Rectangle(2, 2, size-2, size-2);
    box.x = x
    box.y = y
    box.anchor.set(0.5)
    app.stage.addChild(box)
    return box
}

function getFood(size=gridSize) {
    const text = ["🍓", "🍌"][Math.round(Math.random())]
    return new PIXI.Text(text, new PIXI.TextStyle({
        fontSize: size,
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