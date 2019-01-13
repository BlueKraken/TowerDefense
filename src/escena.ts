import { Monstruo } from "./monstruo";
import { Torre } from "./torre";
import { Punto } from "./punto";

export class Escena {
    public constructor() {
        this._canvas = document.createElement('canvas');
        document.body.append(this._canvas);
    }

    private _canvas: HTMLCanvasElement;
    private get _context(): CanvasRenderingContext2D {
        return this._canvas.getContext("2d");
    }

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