import { Punto } from "./punto";

class TipoAtaque {
    constructor(
        public fuerza: number,
        public velocidadProyectil: number
    ) {}
}

class Torre {
    constructor() {}
    
    public tipoAtaque: TipoAtaque;
    public rango: number;
    public posicion: Punto;
    
    private _posicionesEnRango: Punto[];

    public observar() {
        
    }

    public atacar() {

    }
}
