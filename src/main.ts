import { Escena } from "./escena";
import { Torre } from "./torre";
import { Punto } from "./punto";
import { TipoAtaque } from "./tipoAtaque";
import { Monstruo } from "./monstruo";
import { Juego } from "./juego";



/*const e = new Escena();

(window as any).escena = e;

*/
const mapa = [
    [1,2,3,4],
    [0,0,0,5],
    [9,8,7,6]
];

let juego = new Juego(mapa);

/*
const caminoDePuntos = [];
for (let i = 0; i < camino.length; i++) {
    for (let j = 0; j < camino[i].length; j++) {
        const element = camino[i][j]
        if (element != 0) {
            caminoDePuntos.push(new Punto(i, j));
        } 
    }
}

const torre = new Torre(new Punto(1,1), 3, new TipoAtaque(5, 444));

const monstruo = new Monstruo(1, 4, caminoDePuntos);

e.dibujarEscena(camino, [monstruo], [torre]);*/

