import { MovementEventListener } from './movementEventListener.js';

export class Game {

    constructor(private readonly canvas: HTMLCanvasElement, private readonly movement: Movement2D, private readonly movementListener: MovementEventListener) { 

    }

    public start(): void {
        this.hideCanvas(false);
        this.movement.loop();
    }

    public hideCanvas(shouldHide: boolean): void {
        this.canvas.hidden = shouldHide;
    }
}