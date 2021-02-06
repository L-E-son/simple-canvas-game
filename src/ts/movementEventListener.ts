export class MovementEventListener implements Movement2DEventListener {
    
    public constructor(private readonly movementKeys: MovementKeys) {

    }

    public attach(engineCallbacks: Movement2D): void {
        this.attachKeyListeners();
        this.attachKeyCallbacks(engineCallbacks);
    }

    public update(): void {
        for (const key in this.keys) {
            const isDown = this.keys[key];

            if (isDown) {
                const callback = this.keyCallbacks[key];

                if (callback != null) {
                    callback();
                }
            }
        }
    }

    private attachAvatarMovementCallback(keys: number[], func: Function): void {
        for (const key of keys) {
            this.attachKeyCallback(key, func);
        }
    }

    private attachKeyCallback(key: number, func: Function): void {
        this.keyCallbacks[key] = func;
        this.keys[key] = false;
    }

    // Key map for multiple keys pressed
    private readonly keys: Map<number, boolean> = new Map<number, boolean>();

    // Key map for initiating a callback
    private readonly keyCallbacks: Map<number, Function> = new Map<number, Function>();

    private keyUpEvent(event: KeyboardEvent): void {
        this.keys[event.keyCode] = false;
    }

    private keyDownEvent(event: KeyboardEvent): void {

        // Prevent default browser actions if the key is mapped
        if (this.keyCallbacks[event.keyCode] != null) {
            event.preventDefault();
        }

        // Set the status of the key in the inner collection to active
        this.keys[event.keyCode] = true;
    }

    private attachKeyListeners(): void {
        document.addEventListener('keydown', this.keyDownEvent.bind(this), false);
        document.addEventListener('keyup', this.keyUpEvent.bind(this), false);
    }

    private attachKeyCallbacks(movementEngine: Movement2D): void {
        this.attachAvatarMovementCallback(this.movementKeys.UpKeyCode, movementEngine.moveUp.bind(movementEngine));
        this.attachAvatarMovementCallback(this.movementKeys.DownKeyCode, movementEngine.moveDown.bind(movementEngine));
        this.attachAvatarMovementCallback(this.movementKeys.LeftKeyCode, movementEngine.moveLeft.bind(movementEngine));
        this.attachAvatarMovementCallback(this.movementKeys.RightKeyCode, movementEngine.moveRight.bind(movementEngine));
        this.attachAvatarMovementCallback(this.movementKeys.ActionKeyCode, movementEngine.performAction.bind(movementEngine));
    }
}