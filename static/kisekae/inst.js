import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/inst.png'
        this.basex = (CONST.originalx / 2) + CONST.inst.marginx
        this.x = 0
        this.y = CONST.tablet.standardy + 25
        this.v = CONST.inst.v0
    }
    next() {
        this.y += CONST.tablet.intervaly
    }
    proc() {
        this.x += this.v
        this.v -= CONST.inst.k * this.x
    }
    draw(ctx) {
        ctx.save()
        ctx.shadowColor = 'rgb(255, 200, 200)'
        ctx.shadowBlur = 5
        ctx.drawImage(this.image, this.basex + this.x, this.y, 
            this.image.width, this.image.height)
        ctx.restore()
    }
}
