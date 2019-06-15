import CONST from './const.js'
import ImageLorder from './image.js'

const TWEAK = {
    ignitepoint: [0, 200, 300, 350, 400],
    shakeseqend: 500
}

export default class {
    constructor() {
        return (async () => {
            let image = await ImageLorder('./images/kisekae/shoji.png')
            this.canvas = document.createElement('canvas')
            let ctx = this.canvas.getContext('2d')
            this.canvas.width = image.width
            this.canvas.height = image.height
        
            ctx.drawImage(image, 0, 0)
            this.open_cond = 1.
            this.fullopen_cond = 0.
            this.shaking = 0.
            this.shake_seq = 0
            this.ap = CONST.shoji.ap

            return this
        })()
    }
    open() {
        this.open_cond = (this.open_cond < 1) ? this.open_cond + CONST.shoji.step : 1
        return this.open_cond === 1
    }
    fullopen() {
        if (!this.open()) { return }
        this.fullopen_cond = (this.fullopen_cond < 1) ? this.fullopen_cond + CONST.shoji.step : 1
        return this.fullopen_cond === 1
    }
    close() {
        this.fullopen_cond =  (this.fullopen_cond > 0) ? this.fullopen_cond - CONST.shoji.step : 0
        if (this.fullopen_cond > 0) { return false }
        this.open_cond =  (this.open_cond > 0) ? this.open_cond - CONST.shoji.step : 0
        return this.open_cond === 0
    }
    ignite() {
        this.shaking = CONST.shoji.shakeinterval
    }
    shake_proc() {
        this.shaking = (this.shaking > 0) ? this.shaking - 1 : 0
    }
    shake() {
        if(TWEAK.ignitepoint.includes(this.shake_seq)) {
            this.ignite()
        }
        this.shake_proc()
        return ++this.shake_seq > TWEAK.shakeseqend
    }
    calm() {
        this.shaking = 0
    }
    clicked_and_is_broken() {
        return --this.ap <= 0
    }
    get_ap() {
        return { full: CONST.shoji.ap, current: this.ap }
    }
    draw(ctx) {
        draw_symmetric(ctx, this.canvas, this.open_cond + this.fullopen_cond, this.shaking > 0)
        draw_symmetric(ctx, this.canvas, .99 + this.fullopen_cond, false)
    }
}

function draw_symmetric(ctx, canvas, seq, shaking) {
    const randx = shaking ? (Math.random() - .5) * CONST.shoji.agility : 0
    const randy = shaking ? (Math.random() - .5) * CONST.shoji.agility : 0
    ctx.drawImage(canvas, (CONST.originalx / 2) + seq * canvas.width + randx, randy)
    ctx.drawImage(canvas, (CONST.originalx / 2) - (1 + seq) * canvas.width + randx, randy)
}

