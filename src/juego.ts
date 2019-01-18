import { Punto } from "./punto";
import { Torre } from "./torre";
import { Monstruo } from "./monstruo";
import { TipoAtaque } from "./tipoAtaque";
import { gameConfig } from "./config";

//=======COLECCION DE MAPAS=========================
// let mapa2 = [
//             ['S','-','S','-','-','-','-','-','-','-','-','-','-','S','-','-','-']
//            ,['S','-','S','S','S','S','-','-','-','-','-','-','-','S','-','-','-']
//            ,['S','-','-','-','-','S','S','-','-','-','-','-','S','S','S','S','-']
//            ,['S','S','S','S','-','-','S','-','-','-','-','-','S','-','-','S','-']
//            ,['-','-','-','S','S','S','S','-','-','-','-','-','S','-','-','S','-']
//            ,['-','-','-','-','-','-','S','S','S','S','S','S','S','-','-','S','-']
//            ,['-','S','S','S','S','-','-','-','S','-','-','-','-','-','S','S','-']
//            ,['-','S','-','-','S','-','-','-','S','-','-','-','-','S','S','-','-']
//            ,['-','S','-','-','S','S','-','-','S','-','-','-','S','S','-','-','-']
//            ,['-','S','-','-','-','S','-','-','S','S','S','S','S','-','-','-','-']
//            ,['-','S','-','-','-','S','S','S','S','-','-','-','-','-','-','-','-']
//         ];

// let mapa1 = [
//             ['S01','---','---','---','---','---'],
//             ['S02','S03','S04','S05','S06','S07'],
//             ['---','---','---','---','---','S08'],
//             ['S15','S14','S12','S11','S10','S09'],
//             ['S16','---','---','---','---','---'],
//             ['S17','---','---','---','---','---'],
//             ['S18','S19','S20','S21','S22','S23'],
//             ['---','---','---','---','---','S24'],
//             ['---','---','---','---','---','S25'],
//             ['---','---','---','---','---','S26'],
//             ['S32','S31','S30','S29','S28','S27'],
//             ['S33','---','---','---','---','---'],
//         ];

let mapa3 = [
                [1,2,3,4],
                [0,0,0,5],
                [9,8,7,6]
]

//============JUEGO===================================
class Juego {
    private _mapa: number[][];
    private _camino: Punto[]; 
    private _monstruos: Monstruo[];
    private _torres: Torre[];
    private _oleada: number = 0;

    constructor(mapa: number[][]) {
        this._mapa = mapa;
        this.init();
    }

    private init() {
        this.leerCamino();

        this.crearTorre(new Punto(1, 0), 2, new TipoAtaque(3, 500));
        this.crearTorre(new Punto(1, 1), 2, new TipoAtaque(3, 500));

        this.comenzarOleada();
    }

    private comenzarOleada() {
        this.crearOleada();
        this.comenzarMovimiento();
    }

    private crearOleada() {
        const datos = gameConfig.oleadas[this._oleada];

        for (let i = 0; i < datos.cantidad; i++) {
            this.crearMonstruo(datos.velocidad, datos.vida, this._camino);            
        }
    }

    private comenzarMovimiento() {
        /*¿Entonces, si entiendo bien, la idea es que esta 
        función corresponde a una iteración del juego. En cada loop 
        se corre una vez a comenzarMovimiento().?*/
        let indiceMonstruo = 0;
        let idInterval = setInterval(() => {
            if (indiceMonstruo < this._monstruos.length) {
                this._monstruos[indiceMonstruo].comenzarMovimiento();
                indiceMonstruo++;
            }
            this.notificarTorres();

            let todosMuertos = this._monstruos
                .reduce((acc, curr) => acc = acc && !curr.estaVivo, true);

            if (todosMuertos) {
                clearInterval(idInterval);
                if (this._oleada < gameConfig.oleadas.length) {
                    this._oleada++;
                    this.comenzarOleada();
                } else {
                    this.terminarJuego()
                }
            }
            
        }, gameConfig.intervalo);

        /*Después de correr comenzarMovimiento esta aun chequea si 
        murió un monstruo durante este segundo y, si ese es el caso, lo 
        elimina del juego.*/
        for (let monstruo of this._monstruos) {
            if (monstruo.posicion === new Punto(-1, -1)) {
                this.eliminarMonstruo(monstruo);
            }
        }
    }

    private terminarJuego() { 
        console.log('JUEGO TERMINADO');
    }

    private notificarTorres() {
        this._torres.forEach(t => t.observar(this._monstruos));
    }

    private mostrarMapa() {
        //Por implementar, dibujar monstruos y torres
        document.body.innerHTML = '';
        
        for (let row of this._mapa) {

            for (let col of row) {
                if (col === 0) {
                    document.write('#');
                } else {
                    document.write(' ');
                }
            }

            document.write("<br />");
        }       
    }

    private leerCamino() { 
        /* mira el mapa y ve cual es el camino, asi podemos tener 
        una coleccion de mapas y solo cambiar de mapa, y asi 
        puede haber un diseñador de mapas que no necesita 
        saber nada del resto del codigo */

        this._camino = []; //Vacia el array, por si las moscas
        let x = -1;
        let y = -1;
        let previo = 0; /* se refiere al valor tipo number 
        contenido en la casilla anterior. Los numeros 
        mayores a 0 indican correspondencia a camino 
        y su indice */

        for (let row of this._mapa) {
            y++;

            for (let col of row) {
                x++;

                if (col != 0) { 
                    // ¿es != o !==?, digo por lo de === envez de ==.

                    if (col > previo) {
                        this._camino.push(new Punto(x, y));
                    }
                    else if (col < previo) {
                        this._camino.unshift(new Punto(x, y));
                    }
                    else {
                        return Error; /* ¿Que hace esto realmente? 
                        Mi intencion es que simplemente avise que algo 
                        esta mal para que lo revisemos */
                    }
                }
            }
        }
    }

    private crearTorre(pos:Punto, rango:number, tipoAtaque:TipoAtaque) {
        let torre = new Torre(pos, rango, tipoAtaque);
        this._torres.push(torre);
    }

    private eliminarTorre(torre:Torre) {
        let index = this._torres.indexOf(torre);
        this._torres.splice(index, 1);
    }

    private crearMonstruo(velocidad:number, vida:number, camino:Punto[]) {
        let monstruo = new Monstruo(velocidad, vida, camino);
        this._monstruos.push(monstruo);
    }

    private eliminarMonstruo(monstruo:Monstruo) {
        let index = this._monstruos.indexOf(monstruo);
        this._monstruos.splice(index, 1);
    }
}