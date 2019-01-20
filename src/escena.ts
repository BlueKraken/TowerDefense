import { Monstruo } from "./monstruo";
import { Torre } from "./torre";

export class Escena {

    public constructor() {
        this._contenedor = document.createElement('div');
        this._contenedor.style.border = "1px solid black";
        this._contenedor.style.display = 'inline-block';
        this._contenedor.style.whiteSpace = 'pre';
        this._contenedor.style.fontFamily = 'monospace';

        document.addEventListener('DOMContentLoaded', () => {
            document.body.innerHTML = '';
            document.body.append(this._contenedor);
        });
    }

    private _contenedor: HTMLDivElement;
    
    public dibujarEscena(camino: number[][], monstruos: Monstruo[], torres: Torre[]) 
    {
        let tablero = this.dibujarCamino(camino);

        tablero = this.dibujarMonstruos(tablero, monstruos);

        tablero = this.dibujarTorres(tablero, torres);

        this.imprimirEscena(tablero);
    }
    
    private dibujarCamino(camino: number[][]): string[][] {
        const parse: ToAscii = x => x == 0 ? '■' : ' ';

        return camino.map(x => x.map(parse));
    }

    private dibujarTorres(tablero: string[][], torres: Torre[]): string[][] {
        let nuevoTablero = [...tablero];
        
        torres.forEach(t => nuevoTablero[t.posicion.x][t.posicion.y] = 't');

        return nuevoTablero;
    }

    private dibujarMonstruos(tablero: string[][], monstruos: Monstruo[]): string[][] {
        let nuevoTablero = [...tablero];

        monstruos.forEach(
            m => nuevoTablero[m.posicion.x][m.posicion.y] = m.vida.toString()); // justo 80 owo
        return nuevoTablero;
    }

    private imprimirEscena(tablero: string[][]): void {
        document.addEventListener('DOMContentLoaded', () => {
            this._contenedor.innerText = tablero.map(
                fila => fila.join('')).join('\n');
        });
    }
}

type ToAscii = (x: number | string) => string