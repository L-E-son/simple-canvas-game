import { MathUtils } from "./util/math.js";
import { MovementEventListener } from "./movementEventListener.js";

export class ExtendedMovement2D implements Movement2D {
    private activeIcon: ImageBitmap;
    private posX: number = 0;
    private posY: number = 0;

    private readonly DefaultMovementUnits: number = 1;

    get context2d(): CanvasRenderingContext2D {
        return this.canvas.getContext("2d");
    }

    private get midpointX(): number {
        return (this.width - this.activeIcon.width) / 2;
    }

    private get midpointY(): number {
        return (this.height - this.activeIcon.height) / 2;
    }

    private get height(): number {
        return this.canvas.height;
    }

    private get width(): number {
        return this.canvas.width;
    }

    constructor(private readonly canvas: HTMLCanvasElement, private readonly movementlistener: MovementEventListener, private readonly avatar: AnimatedEntity2D) { 
        // Hook up key listeners
        movementlistener.attach(this);
        
        // Initialize image first
        this.setAvatarPositionToDefault();
    }

    public loop(): void {
        window.requestAnimationFrame(this.loop.bind(this));
        this.movementlistener.update();

        this.clear();

        this.context2d.save();
        this.context2d.translate(this.posX, this.posY);

        this.context2d.drawImage(this.activeIcon, 0, 0, this.activeIcon.width, this.activeIcon.height);
        this.context2d.restore();
    }

    private clear(): void {
        this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public resetToDefault() {
        this.setAvatarPositionToDefault();
    }

    private setAvatarPositionToDefault() {
        this.activeIcon = <ImageBitmap>this.avatar.Graphic.IconDown;
        
        this.posX = this.midpointX;
        this.posY = this.midpointY;
    }

    private moveWithinXBounds(pendingX: number) {
        // Clamp the value to prevent the sprite from leaving the canvas X bounds
        this.posX = MathUtils.Clamp(pendingX, 0, this.width - this.activeIcon.width);
    }

    private moveWithinYBounds(pendingY: number) {
        // Clamp the value to prevent the sprite from leaving the canvas Y bounds
        this.posY = MathUtils.Clamp(pendingY, 0, this.height - this.activeIcon.height);
    }

    public moveUp(): void {
        this.activeIcon = <ImageBitmap>this.avatar.Graphic.IconUp;

        // Calculate expected Y
        const calcY = this.posY - (this.DefaultMovementUnits * this.avatar.Traits.SpeedMultiplierY);

        this.moveWithinYBounds(calcY);
    }

    public moveDown(): void {
        this.activeIcon = <ImageBitmap>this.avatar.Graphic.IconDown;

        const calcY = this.posY + (this.DefaultMovementUnits * this.avatar.Traits.SpeedMultiplierY);

        this.moveWithinYBounds(calcY);
    }

    public moveLeft(): void {
        this.activeIcon = <ImageBitmap>this.avatar.Graphic.IconLeft;

        const calcX = this.posX - (this.DefaultMovementUnits * this.avatar.Traits.SpeedMultiplierY);

        this.moveWithinXBounds(calcX);
    }

    public moveRight(): void {
        this.activeIcon = <ImageBitmap>this.avatar.Graphic.IconRight;

        const calcX = this.posX + (this.DefaultMovementUnits * this.avatar.Traits.SpeedMultiplierY);

        this.moveWithinXBounds(calcX);
    }

    public performAction(): void {
        // TODO
    }
}