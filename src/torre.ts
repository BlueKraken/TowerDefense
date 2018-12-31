import { Punto } from "./punto";
import { Observable, Observer } from "./observable";
import { Monstruo } from "./monstruo";

class TipoAtaque {
    constructor(
        public fuerza: number,
        public velocidadProyectil: number,
        public cadenciaDeTiro: number
    ) {}
}

export class Torre {
    constructor(
        private _posicion: Punto, 
        private _monstruos$: Observable<Monstruo[]>) 
    {
        this._$observador = _monstruos$.subscribe(m => this.observar(m));
    }

    private _tipoAtaque: TipoAtaque;
    private _rango: number;
    private _$observador: Observer;
    private _objetivo: Monstruo;
    private _idIntervaloAtaque: number;

    public eliminarTorre() {
        this._monstruos$.unSubscribe(this._$observador);
    }

    private observar(monstruos: Monstruo[]) {
        const enRango = (p: Punto) => 
            p.distancia(this._posicion) >= this._rango;

        const objetivo = monstruos.find(m => enRango(m.posicion));
        this.cambiarObjetivo(objetivo);
    }

    private cambiarObjetivo(nuevoObjetivo: Monstruo) {
        this._objetivo = nuevoObjetivo;
        this.comenzarAtaque();
    }

    private comenzarAtaque() {
        clearInterval(this._idIntervaloAtaque);

        this._idIntervaloAtaque = setInterval(
            () => this._objetivo.recibirDanio(this._tipoAtaque.fuerza),
            this._tipoAtaque.cadenciaDeTiro)
    }
}