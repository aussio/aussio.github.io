import { Container, Sprite, Text, TextStyle } from 'pixi.js';
import { randomBetween, getRandomInt } from './mathUtils';

export function addDroplets(app, dropletsList, count, onClick) {
    for (let i = 0; i < count; i++) {
        // Create droplets in evenly-spaced columns, with a little random.
        column_width = app.screen.width / count
        const x = column_width * i + randomBetween(0, column_width / 2)
        addDroplet(app, dropletsList, x, onClick)
    }
}

export function addDroplet(app, dropletsList, x, onClick) {
    d = new Droplet(dropletsList, onClick)
    app.stage.addChild(d.container);
    // Adjust for anchor set to middle
    d.x = x + (d.width / 2)
    d.y = -d.height / 2

    dropletsList.push(d);
}

/*
* Useful instance attributes
*
* droplet.value: The number in the droplet.
* droplet.container: The sprite/text container on the stage.
*
*/
class Droplet {
    static ASSET = 'water_droplet'
    static SPEED = 2.5
    static STAGE_PADDING = 100;

    constructor(dropletsList, onClick) {
        this.onClick = onClick
        // Set up state
        this.queue_destroy = false

        this.container = new Container();
        // Set up Sprite
        this.sprite = Sprite.from(Droplet.ASSET)
        this.sprite.anchor.set(0.5);
        // Randomly scale the droplet sprite to create some variety.
        // Droplets are currently huge, so scale to small, then add some random.
        this.sprite.scale.set(0.05 + Math.random() * 0.025);
        this.container.addChild(this.sprite);
        this.addNumber()
        this.setupClickEvents()

        this.speed = Droplet.SPEED + Math.random();
        this.dropletsList = dropletsList
    }

    set x(value) {
        this.container.x = value
    }

    set y(value) {
        this.container.y = value
    }

    get width() {
        return this.sprite.width
    }

    get height() {
        return this.sprite.height
    }

    addNumber() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: 'white',
            stroke: { color: 'black', width: 5, join: 'round' },
        });
        this.value = getRandomInt(9)
        const num = new Text({ text: this.value, style });
        num.anchor.set(0.5);
        num.y += num.height / 2
        this.container.addChild(num);
    }

    setupClickEvents() {
        // Make the button interactive...
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
        this.container
            .on('pointerdown', (e) => {this.onButtonDown(e); this.onClick(this)} )
            .on('pointerupoutside', (e) => this.onButtonUp(e))
            .on('pointerover', (e) => this.onButtonOver(e))
            .on('pointerout', (e) => this.onButtonOut(e))
    }

    onButtonDown(event) {
        console.log("onButtonDown")
        this.destroy()
    }
    onButtonUp(event) {
        // console.log("onButtonUp")
    }
    onButtonOver(event) {
        // console.log("onButtonOver")
    }
    onButtonOut(event) {
        // console.log("onButtonOut")
    }

    destroy() {
        this.container.destroy()
        this.dropletsList.splice(this.dropletsList.indexOf(this), 1)
    }

    animate(app, time) {
        if (this.container.destroyed) {
            console.log("already destroyed")
            return true
        }

        const delta = time.deltaTime;
        this.container.y += this.speed * delta

        // Define the padding around the stage where droplets are considered out of sight.
        const stagePadding = 100;
        const boundHeight = app.screen.height + stagePadding;

        if (this.container.y > boundHeight) {
            this.destroy()
        }
    }
}