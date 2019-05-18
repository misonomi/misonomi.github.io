import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/kirakira.png'
        this.alpha = 1
    }
    init() {
        this.alpha = 1
    }
    fadeout() {
        if (this.alpha > CONST.kirakira.threshold) {
            this.alpha -= CONST.kirakira.step
            return false
        } else {
            this.alpha = 0
            return true
        }
    }
    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.drawImage(this.image, 0, 0)
        ctx.restore()
    }
}
