// min and max included 
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
  }