export const gameConfig = {
    intervalo: 1000,
    oleadas: [
        { velocidad: 1, vida: 20, cantidad: 1 },
        { velocidad: 1, vida: 9, cantidad: 5 }
    ] as Oleada[],
    vidaJugador: 10
}

interface Oleada {
    velocidad: number,
    vida: number,
    cantidad: number
}