export class BallGraphic  {

    readonly IconScale: number = 1;
    readonly Dimensions: Dimensions2D;
    private constructor() { 
        this.Dimensions = {
            Height: 10,
            Width: 10
        }
    }

    public static async create(): Promise<AnimatedGraphic> {
        const graphic = <AnimatedGraphic>{
            IconUp: await this.getBitmapFromUrl("/Sprites/Ball/Ball_Up.png"),
            IconDown: await this.getBitmapFromUrl("/Sprites/Ball/Ball_Down.png"),
            IconLeft: await this.getBitmapFromUrl("/Sprites/Ball/Ball_Left.png"),
            IconRight: await this.getBitmapFromUrl("/Sprites/Ball/Ball_Right.png"),
        };

        return graphic;
    }

    private static async getBitmapFromUrl(src: string): Promise<ImageBitmap> {
        return fetch(src)
                .then(response => response.blob())
                .then(blob => createImageBitmap(blob));
    }
}