export const randInt = (min = 0, max) => Math.floor(Math.random() * (max - min)) + min

export const randBetween = (min = 0, max) => Math.random() * (max - min) + min

export const randSign = () => Math.random() < 0.5 ? -1 : 1

export const rotateAngle = (p5, a) => p5.rotate(a * (Math.PI / 180))

export const cos1 = (a) => Math.cos(a / 180 * Math.PI)

export const sin1 = (a) => Math.sin(a / 180 * Math.PI)

export const atan3 = (a, b) => Math.atan2(a, b) / Math.PI * 180
