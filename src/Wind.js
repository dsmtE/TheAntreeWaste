import SimplexNoise from 'simplex-noise'

export default class Wind {
    constructor (speed, velocityAmplitude) {
        this.direction = 0
        this.velocity = 0
        this.velocityOffset = 0
        this.velocityAmplitude = velocityAmplitude
        this.offsetSpeed = speed
        this.simplex = new SimplexNoise(Math.random())
        this.noise = (x) => this.simplex.noise2D(x, 0)
    }

    updateWind () {
        this.velocityOffset += this.offsetSpeed
        this.velocity = (2 * this.noise(this.velocityOffset) - 1) * this.velocityAmplitude
        this.direction += Math.random(-1, -1) / 100
        this.direction = (this.direction + 2 * Math.PI) % (2 * Math.PI)
    }
}
