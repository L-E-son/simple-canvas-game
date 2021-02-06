export class MathUtils {
    public static Clamp(num: number, min: number, max: number) {
        return Math.max(min, Math.min(num, max));
    }
}