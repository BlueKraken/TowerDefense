export const gameConfig = {
    intervalo: 500,
    oleadas: [
        { velocidad: 1, vida: 7, cantidad: 10 },
        { velocidad: 1, vida: 9, cantidad: 12 }
    ] as Oleada[],
    vidaJugador: 10
}

interface Oleada {
    velocidad: number,
    vida: number,
    cantidad: number
}