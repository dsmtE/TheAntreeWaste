import { createVector } from 'p5'
import { randSign, randBetween } from './useful'

const leafParabol = (l, w) => (x) => -x * (x - l) * 2 * w / (l - .5)
const leafResolution = 10

export default class Leaf {
    constructor (s, fromBranch) {

        this.branch = fromBranch
        this.theta = this.branch.theta + randSign() * randBetween(s.minThetaLeafSplit, s.maxThetaLeafSplit)
        this.initialTheta = this.theta
        this.length = randBetween(s.minLeafLength, s.maxLeafLength)
        this.width = randBetween(s.minLeafWidth, s.maxLeafWidth)

        this.outLinePts = [{ x: 0, y: 0 }]
        const leafEquation = leafParabol(this.length, this.width)
        for (let i = 0; i < leafResolution - 2; i++) {
            const x = (i + 1) * this.length / (leafResolution - 1)
            const y = leafEquation(x)
            this.outLinePts[i + 1] = { x: x, y: y }
            this.outLinePts[2 * leafResolution - 3 - i] = { x: x, y: -y }
        }
        this.outLinePts[leafResolution - 1] = { x: this.length, y: 0 }
    }

    rotate (dTheta) {
        this.theta += dTheta
    }

    moveDueToWind (wind) {
        const dThetaWind = this.initialTheta - wind.direction
        const dThetaBranch = this.initialTheta - this.theta

        // if (dThetaWind > Math.PI) {
        //     dThetaWind = -(2 * Math.PI - dThetaWind)
        // } else if (dThetaWind < -Math.PI) {
        //     dThetaWind = 2 * Math.PI + dThetaWind
        // }

        // if (dThetaBranch > Math.PI) {
        //     dThetaBranch = -(2 * Math.PI - dThetaBranch)
        // } else if (dThetaBranch < -Math.PI) {
        //     dThetaBranch = 2 * Math.PI + dThetaBranch
        // }

        const forceOfLeaf = dThetaBranch / 4
        const forceOfWind = -wind.velocity * dThetaWind * Math.PI

        this.rotate((forceOfLeaf + forceOfWind) / 2)
    }

    draw (p5, startingPt) {
        p5.noStroke()
        p5.fill(46, 171, 104, 200)
        p5.beginShape()
        this.outLinePts.forEach(pt => { // rotate our outline pts (vectorial rotation)
            p5.vertex(startingPt.x + pt.x * Math.cos(this.theta) - pt.y * -Math.sin(this.theta), startingPt.y + pt.x * -Math.sin(this.theta) + pt.y * Math.cos(this.theta))
        })
        p5.endShape(p5.CLOSE)
    }
}
