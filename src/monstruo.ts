import { Punto } from "./punto";
import { gameConfig } from "./config";

export class Monstruo {
    constructor (
        private _velocidad: number, //celdas por frame
        private _vida: number,
        private _camino: Punto[] /*secuencia de puntos ordenados
                                    que forman el camino*/
    ) {
        this._indicePosicion = 0;
        this._posicion = this._camino[0];
    }

    public get estaVivo(): boolean { return this.vida > 0; }

    public get vida(): number {
        return this._vida;
    }

    public comenzarMovimiento() { /*Se llama desde juego*/
        clearInterval(this._idIntervaloMovimiento);
        this._idIntervaloMovimiento = setInterval(
            () => this.mover(),
            gameConfig.intervalo //1 fps
        );
    }

    public recibirDanio(danio: number) { /*Se llama desde torre*/
        this._vida -= danio;
        if (this._vida <= 0) {
            this.morir();
        }
    }

    private _posicion: Punto; //posicion
    public get posicion(): Punto {
        return this._posicion;
    }

    private _indicePosicion: number; //indice de posicion en el camino
    private _idIntervaloMovimiento: number;

    private mover() {
        this._indicePosicion += this._velocidad;
        if (this._indicePosicion >= this._camino.length) { //final del camino
            this.desaparecer();
            return;
        }
        this._posicion = this._camino[this._indicePosicion];
    }

    private morir() {
        this.detenerMovimiento();
    }

    private desaparecer() {
        this.detenerMovimiento();
        this._posicion = new Punto(-1, -1);
    }

    private detenerMovimiento() {
        clearInterval(this._idIntervaloMovimiento);
    }
}

