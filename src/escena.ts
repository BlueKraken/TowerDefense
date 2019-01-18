import { Monstruo } from "./monstruo";
import { Torre } from "./torre";
import { Punto } from "./punto";

export class Escena {
    public dibujarCamino(camino: number[][]): void {

    }

    public dibujarMonstruo(monstruo: Monstruo): void {

    }

    public dibujarTorre(torre: Torre): void {

    }

    private coordenadasAPosicion(punto: Punto) {
        return {
            left: punto.x * 10,
            top: punto.y * 10
        }
    }
}