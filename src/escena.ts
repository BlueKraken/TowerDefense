import { Monstruo } from "./monstruo";
import { Torre } from "./torre";

export class Escena {
    public dibujarEscena(camino: number[][], monstruos: Monstruo[], torres: Torre[]) 
    {

    }
    
    public dibujarCamino(camino: number[][]): string[][] {
        const parse: ToAscii = x => x == 0 ? '#' : ' ';

        return camino.map(x => x.map(parse));
    }

    private dibujarTorres(tablero: string[][], torres: Torre[]): string[][] {
        const torreToAcci: ToAscii = x => 'T';

        let nuevoTablero = [...tablero];

        torres.forEach(t => nuevoTablero[]) nuevoTablero
    }

    private dibujarMonstruos(tablero: string[][], monstruos: Monstruo[]): string[] {

    }

    private imprimirEscena(tablero: string[][]): void {

    }
}

type ToAscii = (x: number | string) => string