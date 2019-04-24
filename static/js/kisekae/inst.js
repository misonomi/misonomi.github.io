import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './static/images/kisekae/inst.png'
        this.y = 0
        this.up = true
    }
    proc() {
        if (up) {
            if (this.y > CONST.inst.deflectiony) {
                this.up = false
            }
            this.y += CONST.inst.step
        } else {
            if (this.y < -1 * CONST.inst.deflectiony) {
                this.up = true
            }
            this.y -= CONST.inst.step
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, (CONST.originalx / 2) - CONST.inst.marginx, CONST.inst.y)
    }
}
