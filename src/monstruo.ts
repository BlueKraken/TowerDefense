import { Punto } from "./punto";

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

    public get vida(): number {
        return this._vida;
    }
    private _posicion: Punto; //posicion
    public get posicion(): Punto {
        return this._posicion;
    }
    private _indicePosicion: number; //indice de posicion en el camino
    private _idIntervaloMovimiento: number;

    public comenzarMovimiento() { /*Se llama desde juego*/
        clearInterval(this._idIntervaloMovimiento);
        this._idIntervaloMovimiento = setInterval(
            () => this.mover(),
            1000 //1 fps
        )
    }

    private mover() {
        this._indicePosicion += this._velocidad;
        this._posicion = this._camino[this._indicePosicion];
    }

    private morir() {
        clearInterval(this._idIntervaloMovimiento);
        this._posicion = new Punto(-1, -1); /*Room of Doom
                                            Sale de pantalla
                                            Falta metodo de impresion
                                            en pantalla.
                                            Con observable supongo.*/
    }

    public recibirDanio(danio: number) { /*Se llama desde torre*/
        this._vida -= danio;
        if (this._vida <= 0) {
            this.morir();
        }
    }
}

