interface Movement2D {
    moveUp(): void;
    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
    performAction(): void;
    loop(): void;
    resetToDefault(): void;
}