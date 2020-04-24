import * as p5 from 'p5'

export default class Branch {

    constructor (s, begin, end) {
        this.begin = begin
        this.end = end
        this.finished = false
        this.s = s
    }

    jitter () {
        this.end.x += Math.random(-1, 1)
        this.end.y += Math.random(-1, 1)
    }

    show () {
        this.s.stroke(255)
        this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y)
    }

    branchA () {
        const dir = p5.Vector.sub(this.end, this.begin)
        dir.rotate(Math.PI / 6)
        dir.mult(0.67)
        const newEnd = p5.Vector.add(this.end, dir)
        const b = new Branch(this.s, this.end, newEnd)
        return b
    }

    branchB () {
        const dir = p5.Vector.sub(this.end, this.begin)
        dir.rotate(-Math.PI / 4)
        dir.mult(0.67)
        const newEnd = p5.Vector.add(this.end, dir)
        const b = new Branch(this.s, this.end, newEnd)
        return b
    }
}