import { Monstruo } from "./monstruo";
import { Torre } from "./torre";

export class Escena {

    public constructor() {
        this._contenedor = document.createElement('div');
        this._contenedor.style.border = "1px solid black";
        this._contenedor.style.display = 'inline-block';
        this._contenedor.style.whiteSpace = 'pre';
        this._contenedor.style.fontFamily = 'monospace';

        document.body.innerHTML = '';
        document.body.append(this._contenedor);
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
        const parse: ToAscii<number> = x => x == 0 ? '■' : ' ';

        return camino.map(x => x.map(parse));
    }

    private dibujarTorres(tablero: string[][], torres: Torre[]): string[][] {
        const parse: ToAscii<Torre> = t => 'T';

        let nuevoTablero = [...tablero];
        
        torres.forEach(
            t => {
                try {
                    nuevoTablero[t.posicion.x][t.posicion.y] = parse(t)
                } catch {
                    console.warn('torre no pudo ser dibujada', t)   
                }
            });

        return nuevoTablero;
    }

    private dibujarMonstruos(tablero: string[][], monstruos: Monstruo[]): string[][] {
        const parse: ToAscii<Monstruo> = m => m.vida.toString();
        
        let nuevoTablero = [...tablero];

        monstruos.forEach(
            m => {
                try {
                    nuevoTablero[m.posicion.x][m.posicion.y] = parse(m)
                } catch {
                    console.warn('monstruo no pudo ser dibujado', m);
                } 
            });

        return nuevoTablero;
    }

    private imprimirEscena(tablero: string[][]): void {
        this._contenedor.innerText = tablero.map(
            fila => fila.join('')).join('\n');

        console.log(tablero.map(
            fila => fila.join('')).join('\n'))
    }
}

type ToAscii<T> = (x: T) => string