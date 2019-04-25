import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './static/images/kisekae/clicktostart.png'
        this.x = (CONST.originalx - this.image.width) / 2
        this.y = CONST.cts.y
        this.alpha = 1
        this.down = true
    }
    proc() {
        if(this.down) {
            if(this.alpha > CONST.cts.alpha_min) {
                this.alpha -= CONST.cts.alpha_step
            } else {
                this.alpha = CONST.cts.alpha_min
                this.down = false
            }
        } else {
            if(this.alpha < 1) {
                this.alpha += CONST.cts.alpha_step
            } else {
                this.alpha = 1
                this.down = true
            }
        }
    }
    draw(ctx) {
        ctx.globalAlpha = this.alpha
        ctx.drawImage(this.image, this.x, this.y)
        ctx.globalAlpha = 1
    }
}
