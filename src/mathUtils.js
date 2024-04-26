// min and max included 
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomInt(max) {
    return Math.floor(Math.random() * max + 1);
}

export function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5)
    return arr
}