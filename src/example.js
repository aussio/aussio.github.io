import { Application, Assets, TilingSprite, Texture } from 'pixi.js';
import dirt from '../static/dirt.png';
import grass_top from '../static/grass_top.png';

// Create a PixiJS application.
const app = new Application();

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

    app.ticker.add(() => {
    });
})();

function addBackground() {
    const dirt = Texture.from('dirt')
    const height = dirt.height
    const tilingDirt = new TilingSprite({
        texture: dirt,
        width: app.screen.width,
        height: height,
    });
    tilingDirt.y = app.screen.height - height
    app.stage.addChild(tilingDirt);
}