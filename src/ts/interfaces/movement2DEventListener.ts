interface Movement2DEventListener {
    attach(engineCallbacks: Movement2D): void;
    update(): void;
}