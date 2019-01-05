export const gameConfig = {
    intervalo: 1000,
    oleadas: [
        { velocidad: 2, vida: 10, cantidad: 10 },
        { velocidad: 3, vida: 12, cantidad: 12 }
    ] as Oleada[]
}

interface Oleada {
    velocidad: number,
    vida: number,
    cantidad: number
}