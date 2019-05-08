import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/timer.png'
    }
    init() {
        this.clock = CONST.timer.timelimit
    }
    tick() {
        return --this.clock <= 0
    }
    end() {
        this.clock = 0
    }
    draw(ctx) {
        ctx.drawImage(this.image, CONST.timer.x, CONST.timer.y)
        ctx.fillText(this.clock / 100, CONST.timer.x, CONST.timer.y)
    }
}
