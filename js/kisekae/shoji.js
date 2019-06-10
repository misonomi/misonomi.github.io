import CONST from './const.js'
import ImageLorder from './image.js'

export default class {
    constructor() {
        return (async () => {
            let image = await ImageLorder('./images/kisekae/shoji.png')
            this.canvas = document.createElement('canvas')
            let ctx = _this.canvas.getContext('2d')
            this.canvas.width = image.width
            this.canvas.height = image.height
        
            ctx.drawImage(image, 0, 0)
            this.open_cond = 1.
            this.extraopen_cond = 0.
            this.shaking = 0.

            return this
        })()
    }
    open() {
        if (this.open_cond < 1) {
            this.open_cond += CONST.shoji.step
            return false
        } else {
            this.open_cond = 1.
            return true
        }
    }
    close() {
        if (this.open_cond > 0) {
            this.open_cond -= CONST.shoji.step
            return false
        } else {
            this.open_cond = 0.
            return true
        }
    }
    ignite() {
        this.shaking = CONST.shoji.shakeinterval
    }
    shake() {
        this.shaking = (this.shaking > 0) ? this.shaking - 1 : 0
    }
    draw(ctx) {
        draw_symmetric(ctx, this.canvas, this.open_cond, this.shaking > 0)
        draw_symmetric(ctx, this.canvas, 1, false)
    }
}

function draw_symmetric(ctx, canvas, seq, shaking) {
    const randx_l = shaking ? Math.random() * CONST.shoji.agility : 0
    const randy_l = shaking ? Math.random() * CONST.shoji.agility : 0
    const randx_r = shaking ? Math.random() * CONST.shoji.agility : 0
    const randy_r = shaking ? Math.random() * CONST.shoji.agility : 0
    ctx.drawImage(canvas, (CONST.originalx / 2) + seq * canvas.width + randx_l, randy_l)
    ctx.drawImage(canvas, (CONST.originalx / 2) - (1 + seq) * canvas.width + randx_r, randy_r)
}

