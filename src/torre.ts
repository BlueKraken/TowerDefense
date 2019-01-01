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

    private _tipoAtaque: TipoAtaque = new TipoAtaque(3, 5, 10);
    private _rango: number = 3;
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
        this.detenerAtaque();

        this._idIntervaloAtaque = setInterval(
            () => this.atacarObjetivo(),
            this._tipoAtaque.cadenciaDeTiro)
    }

    private detenerAtaque() {
        clearInterval(this._idIntervaloAtaque);
    }

    private atacarObjetivo() {
        this._objetivo.recibirDanio(this._tipoAtaque.fuerza);

        if (this._objetivo.vida <= 0) {
            this.detenerAtaque();
        }
    }
}