import { ExtendedMovementKeys } from "./extendedMovementKeys.js";
import { ExtendedMovement2D } from "./extendedMovement2D.js";
import { MovementEventListener } from "./movementEventListener.js";
import { Game } from "./game.js";
import { SimpleEntity2D } from "./simpleEntity2D.js";
import { BallGraphic } from "./ballGraphic.js";
import { DefaultMovementTraits2D } from "./defaultMovementTraits2D.js";


async function createGame() {
    const avatarLoadPromise = loadAssets();

    const canvas = <HTMLCanvasElement>document.getElementById("game_canvas");

    const movementKeys = new ExtendedMovementKeys();
    const gameAvatar = await avatarLoadPromise;
    const movementListener = new MovementEventListener(movementKeys);
    const movement = new ExtendedMovement2D(canvas, movementListener, gameAvatar);

    return new Game(canvas, movement, movementListener);
}

async function loadAssets(): Promise<SimpleEntity2D> {
    const loadGraphicPromise: Promise<AnimatedGraphic> = BallGraphic.create();

    const gameTraits = new DefaultMovementTraits2D();

    // Wait for the load image task to finish, if it hasn't already
    const gameGraphic = await loadGraphicPromise;
    return new SimpleEntity2D(gameGraphic, gameTraits);
}

createGame()
    .then(res => res.start());