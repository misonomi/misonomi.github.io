import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/inst.png'
        this.basey = CONST.tablet.standardy - CONST.tablet.intervaly
        this.y = 0
        this.spd = CONST.inst.v0
    }
    next() {
        this.basey += CONST.tablet.intervaly
    }
    proc() {
        this.y += this.spd
        this.spd -= CONST.inst.k * this.y
    }
    draw(ctx) {
        ctx.drawImage(this.image, (CONST.originalx / 2) + CONST.inst.marginx, this.basey + this.y, 
            this.image.width, this.image.height)
    }
}
