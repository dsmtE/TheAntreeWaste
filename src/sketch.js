import * as P5 from 'p5'
import * as dat from 'dat.gui'
// import { rotateAngle, cos1, sin1, atan3 } from './mathsFunctions'
import Branch from './Branch'
import Wind from './Wind'

const sketch = (p5) => {
    console.log('----- init -----')
    // variables
    let canvas
    const wRation = 0.8
    const hRation = 0.8
    let trees
    let startingTreesPts
    const wind = new Wind(0.05, .005)

    // settings setup
    const settings = {
        pauseWind: false,
        drawWind: false,
        drawLeaves: true,
        treeSize: 15,
        treeTotalLength: 400,
        maxBranchThickness: 10,
        minBranchThickness: 2,
        maxBranchThicknessForLeaves: 4,
        minSpawnDistance: .2, // this controls how far the branch will grow before splitting
        branchSpawnOdds: .5, // the odds of a branch growing there
        // branchSpawnOddsOfSecond: 0, // odds of a second branch growing from the same node
        minThetaSplit: Math.PI * .1,
        maxThetaSplit: Math.PI * .3,
        // maxdThetaWander: Math.PI/20,
        deltaBranchSize: .2, // for branch size variation
        // leaves
        minThetaLeafSplit: Math.PI / 10,
        maxThetaLeafSplit: Math.PI / 5,
        minLeafWidth: .5,
        maxLeafWidth: .5,
        minLeafLength: 30,
        maxLeafLength: 40,
        leafSpawnOdds: .7
    }

    // build gui
    const gui = new dat.GUI()
    const drawO = gui.addFolder('drawing options')
    drawO.add(settings, 'pauseWind')
    drawO.add(settings, 'drawWind')
    drawO.add(settings, 'drawLeaves')
    const treeO = gui.addFolder('tree options')
    treeO.add(settings, 'treeSize', 5, 20).onChange(() => initTrees())
    treeO.add(settings, 'treeTotalLength', 50, window.innerHeight * hRation).onChange(() => initTrees())
    treeO.add(settings, 'maxBranchThickness', settings.minBranchThickness, 20).onChange(() => initTrees())
    treeO.add(settings, 'minBranchThickness', 1, settings.maxBranchThickness).onChange(() => initTrees())
    treeO.add(settings, 'maxBranchThicknessForLeaves', settings.minBranchThickness, settings.maxBranchThickness).onChange(() => initTrees())
    treeO.add(settings, 'branchSpawnOdds', 0, 1).onChange(() => initTrees())
    treeO.add(settings, 'maxThetaSplit', settings.minThetaSplit, Math.PI / 2).onChange(() => initTrees())
    treeO.add(settings, 'minThetaSplit', Math.PI / 20, settings.maxThetaSplit).onChange(() => initTrees())

    const leafO = gui.addFolder('leaf options')
    leafO.add(settings, 'minThetaLeafSplit', Math.PI / 10, settings.maxThetaLeafSplit).onChange(() => initTrees()).listen()
    leafO.add(settings, 'maxThetaLeafSplit', settings.minThetaLeafSplit, Math.PI / 3).onChange(() => initTrees()).listen()
    leafO.add(settings, 'minLeafWidth', .2, settings.maxLeafWidth).onChange(() => initTrees()).listen()
    leafO.add(settings, 'maxLeafWidth', settings.minLeafWidth, 1).onChange(() => initTrees()).listen()
    leafO.add(settings, 'minLeafLength', 10, settings.maxLeafLength).onChange(() => initTrees()).listen()
    leafO.add(settings, 'maxLeafLength', settings.minLeafLength, 70).onChange(() => initTrees()).listen()
    leafO.add(settings, 'leafSpawnOdds', 0, 1).onChange(() => initTrees()).listen()

    function initTrees () {
        trees = [new Branch(settings, Math.PI / 2, settings.treeTotalLength / settings.treeSize, settings.maxBranchThickness, null, 0)]
        startingTreesPts = [p5.createVector(p5.width / 2, p5.height)]
    }

    p5.setup = () => {
        canvas = p5.createCanvas(window.innerWidth * wRation, window.innerHeight * hRation)
        canvas.parent('container')
        p5.noiseSeed(p5.millis()) // init random
        p5.frameRate(30) // sets frame rate to 10
        p5.imageMode(p5.CENTER) // set imagemode to center, helps when rotating
        initTrees()
        createInitButton()
    }

    p5.draw = () => {
        if (!settings.pauseWind) {
            wind.updateWind() // update wind
            trees.forEach(t => { t.rotateDueToWind(wind) }) // update trees with wind

            p5.background(255)
            // p5.ellipse(startingTreesPts[0].x, startingTreesPts[0].y, 20, 20)
            for (let i = 0; i < trees.length; i++) {
                trees[i].draw(p5, startingTreesPts[i])
            }
            if (settings.drawLeaves) {
                for (let i = 0; i < trees.length; i++) {
                    trees[i].drawLeaves(p5, startingTreesPts[i])
                }
            }
        }
    }
    p5.mouseClicked = () => {
        console.log('mouse click')
    }

    p5.windowResized = () => {
        p5.resizeCanvas(window.innerWidth * wRation, window.innerHeight * hRation)
        p5.print(window.innerWidth * wRation, window.innerHeight * hRation)
    }

    function createInitButton () {
        const button = document.createElement('button')
        button.innerHTML = 'init'

        // 2. Append somewhere
        const body = document.getElementsByTagName('body')[0]
        body.appendChild(button)

        // 3. Add event handler
        button.addEventListener('click', function () {
            // alert('did something') // eslint-disable-line no-undef
            initTrees()
        })
    }

}

window.onload = initSketch
function initSketch () {
    const p = new P5(sketch) // eslint-disable new-cap no-unused-vars
}
