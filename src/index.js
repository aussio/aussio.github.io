import { Application, Assets, TextStyle, Text, TilingSprite, Texture } from 'pixi.js';
import { addDroplets } from './addDroplets';
import water_droplet from '../static/Water_Droplet_Pin.png';
import dirt from '../static/dirt.png';
import grass_top from '../static/grass_top.png';

// Create a PixiJS application.
const app = new Application();

const droplets = [];

let score = 0;

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

    addBackground()

    const scoreText = addScore()
    addDroplets(app, droplets, 5, onDropletClick);

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

function addBackground() {
    const dirt = Texture.from('dirt')
    const dirtHeight = (dirt.height / 2)
    const tilingDirt = new TilingSprite({
        texture: dirt,
        width: app.screen.width,
        height: dirtHeight,
    });
    tilingDirt.y = app.screen.height - dirtHeight
    app.stage.addChild(tilingDirt);

    const grass = Texture.from('grass_top')
    const tilingGrass = new TilingSprite({
        texture: grass,
        width: app.screen.width,
        height: grass.height,
    });
    tilingGrass.y = app.screen.height - grass.height  - dirtHeight
    app.stage.addChild(tilingGrass);
}

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