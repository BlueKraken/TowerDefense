export class Punto {
    constructor(
        public x: number,
        public y: number) {}

    public equals(comparendo: Punto) {
        return this.x == comparendo.x && this.y == comparendo.y;
    }
}