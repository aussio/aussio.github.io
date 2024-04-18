import { Application, Assets, TextStyle, Text } from 'pixi.js';
import water_droplet from '../static/Water_Droplet_Pin.png'
import { addDroplet, addDroplets, animateDroplets } from './addDroplets';

// Create a PixiJS application.
const app = new Application();

const droplets = [];

let score = 0;

async function setup()
{
    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });
    app.ticker.maxFPS = 60

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
}

async function preload()
{
    // Create an array of asset data to load.
    const assets = [
        { alias: 'water_droplet', src: water_droplet },
    ];

    // Load the assets defined above.
    await Assets.load(assets);
}

// Asynchronous IIFE
(async () =>
{
    await setup();
    await preload();

    const scoreText = addScore()
    addDroplets(app, droplets, 15, onDropletClick);

    // Add the droplets animation callback to the application's ticker.
    app.ticker.add((time) => {
        droplets.forEach(d => d.animate(app, time))

        if (droplets.length <= 2) {
            addDroplets(app, droplets, 5, onDropletClick);
        }
    });

    function onDropletClick(droplet) {
        console.log(`value: ${droplet.value}`)
        score += droplet.value
        console.log(`score: ${score}`)
        scoreText.text = `score: ${score}`
    }
})();

function addScore() {
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: 'pink',
        stroke: { color: 'black', width: 5, join: 'round' },
    });
    const text = new Text({ text: 'score: 0', style });
    text.anchor.set(0.5);
    text.x = app.screen.width - 100
    text.y += text.height / 2
    app.stage.addChild(text);
    return text
}

function onDropletClick(droplet) {
    console.log(`value: ${droplet.value}`)
    score += droplet.value
    console.log(`score: ${score}`)
}