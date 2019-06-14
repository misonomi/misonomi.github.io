import CONST from './const.js'
import ImageLorder from './image.js'

const TWEAK = {
    ignitepoint: [0, 3000, 4000],
    shakeseqend: 5000
}

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
            this.shaking = 0.
            this.shake_seq = 0

            return this
        })()
    }
    open() {
        this.open_cond = (this.open_cond < 1) ? this.open_cond + CONST.shoji.step : 1
        return this.open_cond === 1
    }
    close() {
        ithis.open_cond =  (this.open_cond > 0) ? this.open_cond - CONST.shoji.step : 0
        return this.open_cond === 0
    }
    ignite() {
        this.shaking = CONST.shoji.shakeinterval
    }
    shake_proc() {
        this.shaking = (this.shaking > 0) ? this.shaking - 1 : 0
    }
    shake_seq() {
        if(TWEAK.ignitepoint.includes(this.shake_seq)) {
            this.ignite
        }
        this.shake_proc()
        return ++this.shake_seq > TWEAK.shakeseqend
    }
    draw(ctx) {
        draw_symmetric(ctx, this.canvas, this.open_cond, this.shaking > 0)
        draw_symmetric(ctx, this.canvas, .99, false)
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

