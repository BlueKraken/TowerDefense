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

let mapa1 = [
            ['S01','---','---','---','---','---'],
            ['S02','S03','S04','S05','S06','S07'],
            ['---','---','---','---','---','S08'],
            ['S15','S14','S12','S11','S10','S09'],
            ['S16','---','---','---','---','---'],
            ['S17','---','---','---','---','---'],
            ['S18','S19','S20','S21','S22','S23'],
            ['---','---','---','---','---','S24'],
            ['---','---','---','---','---','S25'],
            ['---','---','---','---','---','S26'],
            ['S32','S31','S30','S29','S28','S27'],
            ['S33','---','---','---','---','---'],
        ];

//============JUEGO===================================
class Juego {
    mapa:[][];
    monstruos;
    torres;

    constructor(map) {
        this.mapa = map;
    }

    muestraMapa() {
        //Por implementar, dibujar monstruos y torres
        document.body.innerHTML = '';
        
        for (let row of this.mapa) {

            for (let col of row) {
                if (col === '---') {
                    document.write('T');
                } else {
                    document.write(' ');
                }
            }

            document.write("<br />");
        }       
    }

    creaTorre() {}

    creaMonstruo() {}
}

let juego = new Juego(mapa1);
juego.creaTorre(); //una torre inicial
juego.creaMonstruo(); //un monstruo inicial
let vuelta = 0; ////////////////////
/* esto es lo equivalente al tiempo, 
ya que la idea es que para todos pase la misma 
cantidad de tiempo, es decir 
que esten todos siempre en la misma vuelta.
Ademas a esto le ponemos un delay para poder ver 
el juego avanzando a un ritmo visible.
Cada vuelta se printea el tablero con lo cual 
esto tambien define nuestros FPS*/

while (true) {
    vuelta++;

    for (let monstruo of juego.monstruos) {
        monstruo.jugar(vuelta);
    } 

    for (let torre of juego.torres) {
        torre.jugar(vuelta);
    }

    juego.muestraMapa();
}