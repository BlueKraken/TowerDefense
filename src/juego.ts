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
    private mapa:[][];
    private camino:Punto[]; 
    private monstruos:Monstruo[];
    private torres:Torre[];
    private oleada: number = 0;

    constructor(map) {
        this.mapa = map;
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
        const datos = gameConfig.oleadas[this.oleada];

        for (let i = 0; i < datos.cantidad; i++) {
            this.crearMonstruo(datos.velocidad, datos.vida, this.camino);            
        }
    }

    private comenzarMovimiento() {
        let indiceMonstruo = 0;
        let idInterval = setInterval(() => {
            if (indiceMonstruo < this.monstruos.length) {
                this.monstruos[indiceMonstruo].comenzarMovimiento();
                indiceMonstruo++;
            }
            this.notificarTorres();

            let todosMuertos = this.monstruos
                .reduce((acc, curr) => acc = acc && !curr.estaVivo, true);

            if (todosMuertos) {
                clearInterval(idInterval);
                this.oleada++;
                this.comenzarOleada();
            }
            
        }, gameConfig.intervalo);
    }

    private notificarTorres() {
        this.torres.forEach(t => t.observar(this.monstruos));
    }

    private muestraMapa() {
        //Por implementar, dibujar monstruos y torres
        document.body.innerHTML = '';
        
        for (let row of this.mapa) {

            for (let col of row) {
                if (col === 0) {
                    document.write('-');
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

        this.camino = []; //Vacia el array, por si las moscas
        let x = -1;
        let y = -1;
        let previo = 0; /* se refiere al valor tipo number 
        contenido en la casilla anterior. Los numeros 
        mayores a 0 indican correspondencia a camino 
        y su indice */

        for (let row of this.mapa) {
            y++;

            for (let col of row) {
                x++;

                if (col != 0) { 
                    // ¿es != o !==?, digo por lo de === envez de ==.

                    if (col > previo) {
                        this.camino.push(new Punto(x, y));
                    }
                    else if (col < previo) {
                        this.camino.unshift(new Punto(x, y));
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

        this.torres.push(torre);
    }

    private crearMonstruo(velocidad:number, vida:number, camino:Punto[]) {
        let monstruo = new Monstruo(velocidad, vida, camino);
        this.monstruos.push(monstruo);
    }
}


//Ejemplo:
let juego = new Juego(mapa3);

/* Despues de definir esta torre y monstruo inicial,
¿como dejaria que el juego corra sin hacer un loop while? */