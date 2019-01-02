import { Punto } from "./punto";

export class Monstruo {
    private _velocidad: number; //1 celda por ciclo
    private _vida: number;
    public get vida(): number {
        return this._vida;
    }
    private _posicion: Punto; //posicion
    public get posicion(): Punto {
        return this._posicion;
    }
    private _camino: Punto[]; //secuencia de puntos ordenados que forman el camino
    private _indicePosicion: number; //indice de posicion en el camino

    constructor(velocidad: number, vida: number, camino: Punto[]) { //es necesario un método que cree caminos
        this._velocidad = velocidad;
        this._vida = vida;
        this._camino = camino;
        this._indicePosicion = 0;
        this._posicion = this._camino[0];
    }

    mover() {
        this._indicePosicion += this._velocidad;
        this._posicion = this._camino[this._indicePosicion];
    }

    private morir() {
        /*sugerencia:
        no es necesario, el juego chequea la vida de los monstruos y los elimina del juego
        */
    }

    recibirDanio(danio: number) {
        this._vida -= danio;
        if (this._vida <= 0) {
            this.morir();
        }
    }
}

