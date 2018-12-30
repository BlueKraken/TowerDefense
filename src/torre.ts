import { Punto } from "./punto";

class TipoAtaque {
    constructor(
        public fuerza: number,
        public velocidadProyectil: number
    ) {}
}

export class Torre {
    constructor() {}
    
    public tipoAtaque: TipoAtaque;
    public rango: number;
    public posicion: Punto;

    public observar(monstruos: any[]) {
        
    }

    private disparar(monstruo: any) {
        
    }
}
