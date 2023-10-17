import { clamp, testForAABB } from './utils.js'

let app = initApp(window)
document.body.appendChild(app.view)

const [left, up, right, down] = setUpKeyboard()
const [bunny, bunnySprite, speedText, pointsText, locationText] = setUpSprites()
const star = getStar()
let points = 0
start()

export function initApp(element) {
  return new PIXI.Application({ background: '#1099bb', resizeTo: element })
}

export function start() {
  // Listen for animate update
  drawStar()
  app.ticker.add((delta) => gameLoop(delta));
}

export function gameLoop(delta) {
  updateSpeed()
  updatePosition(delta)
  checkCollision()
  pointsText.text = `Points: ${points} ✨`
  const [fontSize, _] = clamp(points / 2, 12, 200)
  pointsText.TextStyle = {
    fontSize: 200
  }
  speedText.text = `Speed: (${xSpeed},${ySpeed})`
  locationText.text = `(${Math.floor(bunny.x)},${Math.floor(bunny.y)})`
}

function checkCollision() {
  if (testForAABB(bunnySprite, star)) {
    app.stage.removeChild(star)
    points += 10
    drawStar()
    document.body.classList.add("apply-shake");
    setTimeout(() => {
      document.body.classList.remove("apply-shake");
    }, 500)
  }
}

export function reset() {
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  xSpeed = 0
  ySpeed = 0
}

function updateSpeed() {
  const speedChangeFactor = 1
  if (left.isDown) {
    xSpeed -= speedChangeFactor
  } else if (right.isDown) {
    xSpeed += speedChangeFactor
  } else if (xSpeed != 0) {
    xSpeed = xSpeed > 0 ? xSpeed - 1 : xSpeed + 1
  }

  if (down.isDown) {
    ySpeed += speedChangeFactor
  } else if (up.isDown) {
    ySpeed -= speedChangeFactor
  } else if (ySpeed != 0 ) {
    ySpeed = ySpeed > 0 ? ySpeed - 1 : ySpeed + 1
  }
}

function updatePosition(delta) {
  const [newX, xClamped] = clamp(bunny.x + xSpeed * delta, 0, window.innerWidth)
  bunny.x = newX
  if (xClamped) {
    xSpeed = 0
  }
  const [newY, yClamped] = clamp(bunny.y + ySpeed * delta, 0, window.innerHeight)
  bunny.y = newY
  if (yClamped) {
    ySpeed = 0
  }
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

let xSpeed = 0
let ySpeed = 0

export function setUpSprites() {
  const bunny = new PIXI.Container()
  const speedText = new PIXI.Text()
  const pointsText = new PIXI.Text()
  const locationText = new PIXI.Text()
  // create a new Sprite from an image path
  app.stage.addChild(bunny);
  
  const bunnySprite = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
  // center the sprite's anchor point
  bunnySprite.anchor.set(0.5);
  // start the sprite at the center of the screen
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.addChild(bunnySprite)

  locationText.x = -50
  locationText.y = -bunny.height - 10
  bunny.addChild(locationText)
  
  app.stage.addChild(speedText)
  pointsText.y = 50
  app.stage.addChild(pointsText)

  return [bunny, bunnySprite, speedText, pointsText, locationText]
}


// The keyboard helper
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

function getStar() {
  const star = new PIXI.Text("⭐️", new PIXI.TextStyle({
    fontSize: 30,
  }))
  return star
}

function drawStar() {
  star.x = Math.random() * app.screen.width;
  star.y = Math.random() * app.screen.height;
  star.tint = Math.random() * 0x808080;
  app.stage.addChild(star);
}