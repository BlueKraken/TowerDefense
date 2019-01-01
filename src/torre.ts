import { Punto } from "./punto";
import { Observable, Observer } from "./observable";
import { Monstruo } from "./monstruo";
import { TipoAtaque } from "./tipoAtaque";

export class Torre {
    constructor(
        private _posicion: Punto, 
        private _monstruos$: Observable<Monstruo[]>,
        private _rango: number,
        private _tipoAtaque: TipoAtaque) 
    {
        this._$observador = _monstruos$.subscribe(m => this.observar(m));
    }
    
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