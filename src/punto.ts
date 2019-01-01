export class Punto {
    constructor(
        public x: number,
        public y: number) {}

    public equals(comparador: Punto) {
        return this.x == comparador.x && this.y == comparador.y;
    }

    public distancia(comparador: Punto) {
        return Math.sqrt(
            Math.pow(this.x - comparador.x, 2) + 
            Math.pow(this.y - comparador.y, 2)
        );
    }
}