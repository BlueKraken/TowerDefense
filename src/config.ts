export const gameConfig = {
    intervalo: 1000,
    oleadas: [
        { velocidad: 1, vida: 7, cantidad: 10, ataque: 1 },
        { velocidad: 1, vida: 9, cantidad: 12, ataque: 2 }
    ] as Oleada[],
    vidaJugador: 10
}

interface Oleada {
    velocidad: number,
    vida: number,
    cantidad: number,
    ataque: number
}