import { Application, Assets } from 'pixi.js';
import { addDroplets } from './Droplet';
import { shuffleArray, randomInt } from './mathUtils'
import { addBackground, addScore, newProblem } from './background';
import water_droplet from '../static/Water_Droplet_Pin.png';
import dirt from '../static/dirt.png';
import grass_top from '../static/grass_top.png';

// Create a PixiJS application.
const app = new Application();

const NUM_DROPLETS = 5
const droplets = [];

let score = 0;
const SCORE_INCREMENT = 10

async function setup() {
    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });
    app.ticker.maxFPS = 60

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
}

async function preload() {
    // Create an array of asset data to load.
    const assets = [
        { alias: 'water_droplet', src: water_droplet },
        { alias: 'dirt', src: dirt },
        { alias: 'grass_top', src: grass_top },
    ];

    // Load the assets defined above.
    await Assets.load(assets);
}

// Asynchronous IIFE
(async () => {
    await setup();
    await preload();

    addBackground(app)

    let answer = newProblem(app)
    const scoreText = addScore(app)
    addDroplets(app, droplets, getNextValues(NUM_DROPLETS, droplets, answer), onDropletClick);

    // Add the droplets animation callback to the application's ticker.
    app.ticker.add((time) => {
        droplets.forEach(d => d.animate(app, time))

        if (droplets.length < NUM_DROPLETS) {
            addDroplets(app, droplets, getNextValues(3, droplets, answer), onDropletClick);
        }
    });

    function onDropletClick(droplet) {
        if (droplet.value == answer) {
            score += SCORE_INCREMENT
            droplet.destroy()
            console.log("correct!")
            answer = newProblem(app)
        } else {
            console.log("wrong!")
        }
        scoreText.text = `score: ${score}`
    }
})();

function getNextValues(num, droplets, answer) {
    values = []
    if (!droplets.find((d) => d.value == answer)) {
        values.push(answer)
    } else {
        values.push(randomInt(20))
    }
    for (let i = 0; i < num - 1; i++) {
        values.push(randomInt(20))
    }
    return shuffleArray(values)
}