import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/inst.png'
        this.y = 0
        this.down = true
    }
    proc() {
        if (this.down) {
            if (this.y > CONST.inst.deflectiony) {
                this.down = false
            }
            this.y += CONST.inst.step
        } else {
            if (this.y < -1 * CONST.inst.deflectiony) {
                this.down = true
            }
            this.y -= CONST.inst.step
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, (CONST.originalx / 2) - CONST.inst.marginx, CONST.inst.y + this.y)
    }
}
