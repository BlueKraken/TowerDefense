import { Punto } from "./punto";
import { Torre } from "./torre";
import { Monstruo } from "./monstruo";
import { TipoAtaque } from "./tipoAtaque";
import { gameConfig } from "./config";
import { Escena } from "./escena";

export class Juego {
    private _mapa: number[][];
    private _camino: Punto[]; 
    private _monstruos: Monstruo[];
    private _torres: Torre[];
    private _oleada: number = 0;
    private _vida: number;
    private _escena: Escena;

    constructor(mapa: number[][]) {
        this._torres = [];
        this._monstruos = [];
        this._camino = [];
        this._vida = gameConfig.vidaJugador;
        this._mapa = mapa;
        this.init();
        this._escena = new Escena();
    }

    private get _monstruosVivos() {
        return this._monstruos.filter(m => m.vida > 0);
    }

    private init() {
        this.leerCamino();

        //this.crearTorre(new Punto(1, 0), 2, new TipoAtaque(3, 500));
        this.crearTorre(new Punto(1, 1), 2, new TipoAtaque(3, 500));

        this.comenzarOleada();
    }

    private comenzarOleada() {
        this.crearOleada();
        this.comenzarMovimiento();
    }

    private crearOleada() {
        const datos = gameConfig.oleadas[this._oleada];

        this._monstruos = [];

        for (let i = 0; i < datos.cantidad; i++) {
            this.crearMonstruo(datos.velocidad, datos.vida, this._camino, datos.ataque);            
        }
    }

    private comenzarMovimiento() {
        let indiceMonstruo = 0;

        let idInterval = setInterval(() => {
            if (indiceMonstruo < this._monstruos.length) {
                this._monstruos[indiceMonstruo].comenzarMovimiento();
                indiceMonstruo++;
            }

            this.notificarTorres();

            this._monstruos.forEach((m, i, a) => {
                if (m.vida > 0 && m.posicion.equals(new Punto(-1, -1))) {
                    // quitar vida al jugador y matar monstruo
                    this.perderVida(m.ataque);
                    a[i].recibirDanio(999);
                }
            });

            if (this._monstruosVivos.length == 0) {
                clearInterval(idInterval);
                
                if (this._oleada < gameConfig.oleadas.length) {
                    this._oleada++;
                    this.comenzarOleada();
                
                } else {
                    this.terminarJuego(true)
                }
            }

            this._escena.dibujarEscena(this._mapa, this._monstruosVivos, this._torres);
            
            console.log(this._vida.toString());
        }, gameConfig.intervalo);
    }

    private perderVida(danio: number) {
        this._vida -= danio;
        if (this._vida <=0) {
            this.terminarJuego(false);
        }
    }

    private terminarJuego(victoria: boolean) { console.log('JUEGO TERMINADO') };

    private notificarTorres() {
        this._torres.forEach(t => t.observar(this._monstruosVivos));
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

        let x = 0;
        let y = 0;

        for (let row of this._mapa) {
            for (let col of row) {
                
                if (col == (this._camino.length + 1)) {
                    this._camino.push(new Punto(x, y));
                    this.leerCamino();
                }
                x++;
            }
            y++;
            x = 0;
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

    private crearMonstruo(velocidad:number, vida:number, camino:Punto[], ataque: number) {
        let monstruo = new Monstruo(velocidad, vida, camino, ataque);
        this._monstruos.push(monstruo);
    }
}