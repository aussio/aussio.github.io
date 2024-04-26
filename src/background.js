import { TextStyle, Text, TilingSprite, Texture } from 'pixi.js';
import { randomInt } from './mathUtils'

const BACKGROUND_TILE_HEIGHT = 32;

export function addBackground(app) {
    const dirt = Texture.from('dirt')
    const tilingDirt = new TilingSprite({
        texture: dirt,
        width: app.screen.width,
        height: BACKGROUND_TILE_HEIGHT,
    });
    tilingDirt.y = app.screen.height - (BACKGROUND_TILE_HEIGHT)
    app.stage.addChild(tilingDirt);

    const grass = Texture.from('grass_top')
    const tilingGrass = new TilingSprite({
        texture: grass,
        width: app.screen.width,
        height: BACKGROUND_TILE_HEIGHT * 2,
    });
    tilingGrass.y = app.screen.height - BACKGROUND_TILE_HEIGHT * 3
    app.stage.addChild(tilingGrass);
}

export function addScore(app) {
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

let current_problem = null;

export function newProblem(app) {
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: 'yellow',
        fontSize: 60,
        stroke: { color: 'black', width: 10, join: 'round' },
    });
    const x = randomInt(9)
    const y = randomInt(9)
    const text = new Text({ text: `${x} + ${y}`, style });
    text.anchor.set(0.5);
    text.x = app.screen.width / 2
    text.y += app.screen.height - BACKGROUND_TILE_HEIGHT * 1.5
    app.stage.addChild(text);
    if (current_problem) {
        current_problem.destroy()
    }
    current_problem = text;
    return x + y
}