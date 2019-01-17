import { Juego } from "./juego";

const mapa3 = [
    [1,2,3,4],
    [0,0,0,5],
    [9,8,7,6]
]
document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego(mapa3);
});