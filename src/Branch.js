import { randSign, randBetween } from './useful'
import Leaf from './Leaf'

export default class Branch {

    constructor (s, theta, length, thickness, parent = null, idBranch) {
        // s for settings
        this.parent = parent
        this.Children = []
        this.leaves = []
        this.thickness = thickness
        this.idBranch = idBranch
        this.initialTheta = theta
        this.theta = theta
        this.length = length

        // gernerate children
        if (idBranch < s.treeSize && this.thickness > s.minBranchThickness) {
            const newTheta = this.theta + randBetween(-s.minThetaSplit / 2, s.minThetaSplit / 2)
            this.spawnNewBranch(s, newTheta)

            if (idBranch / s.treeSize > s.minSpawnDistance && s.branchSpawnOdds >= Math.random()) {
                const newTheta = this.theta + randSign() * randBetween(s.minThetaSplit, s.maxThetaSplit) + randBetween(-s.minThetaSplit / 2, s.minThetaSplit / 2)
                this.spawnNewBranch(s, newTheta)
            }
        }

        if (this.thickness < s.maxBranchThicknessForLeaves && s.leafSpawnOdds >= Math.random()) {
            this.leaves.push(new Leaf(s, this))
        }

    }

    spawnNewBranch (s, newTheta) {
        const newLength = (s.treeTotalLength / s.treeSize) * (1 + Math.random(s.deltaBranchSize, s.deltaBranchSize))
        const newtTickness = this.thickness * 0.9
        this.Children.push(new Branch(s, newTheta, newLength, newtTickness, this, this.idBranch + 1))
    }

    rotate (dTheta) {
        this.theta += dTheta
        this.Children.forEach(b => { b.rotate(dTheta) })
    }

    rotateDueToWind (wind) {
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

        const forceOfBranch = dThetaBranch
        const forceOfWind = -wind.velocity * dThetaWind

        this.rotate((forceOfBranch + forceOfWind) / 10)

        this.Children.forEach(b => { b.rotateDueToWind(wind) })
        this.leaves.forEach(l => { l.moveDueToWind(wind) })
    }

    drawLeaves (p5, startingPt) {
        const endingPt = p5.createVector(Math.cos(this.theta), -Math.sin(this.theta)).mult(this.length).add(startingPt)
        this.Children.forEach(b => { b.drawLeaves(p5, endingPt) })
        this.leaves.forEach(l => { l.draw(p5, endingPt) })
    }

    draw (p5, startingPt) {
        const endingPt = p5.createVector(Math.cos(this.theta), -Math.sin(this.theta)).mult(this.length).add(startingPt)
        p5.strokeWeight(this.thickness)
        p5.stroke(77, 40, 22)
        p5.line(startingPt.x, startingPt.y, endingPt.x, endingPt.y)
        this.Children.forEach(b => { b.draw(p5, endingPt) })
    }
}
