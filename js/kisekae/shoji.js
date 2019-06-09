import CONST from './const.js'
import ImageLorder from './image.js'

const TWEAK = {
    extrastep: .002,
    speed: 15,
    delay: [0, .3, .5, .7, .8, .9, .95]
}

let shoji = class {
    constructor() {
        let _this = this
        ImageLorder('./images/kisekae/shoji.png').then(image => {
            _this.canvas = document.createElement('canvas')
            let ctx = _this.canvas.getContext('2d')
            _this.canvas.width = image.width
            _this.canvas.height = image.height
    
            ctx.drawImage(image, 0, 0)
        })
        this.open_cond = 1.
        this.extraopen_cond = 0.
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
    extraopen() {
        if (this.extraopen_cond < 1) {
            this.extraopen_cond += TWEAK.extrastep
            return false
        } else {
            this.extraopen_cond = 1.
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
    draw(ctx) {
        draw_symmetric(ctx, this.canvas, this.open_cond)
        draw_symmetric(ctx, this.canvas, 1)
    }
    extradraw(ctx) {
        draw_symmetric(ctx, this.canvas, 0)
        for(let i = TWEAK.delay.length - 1; i >= 0; i--) {
            let d = Math.min(1, Math.max(0, this.extraopen_cond - TWEAK.delay[i]) * TWEAK.speed)
            draw_symmetric(ctx, this.canvas, d)
        }
        draw_symmetric(ctx, this.canvas, 1)
    }
}

function draw_symmetric(ctx, canvas, seq) {
    ctx.drawImage(canvas, (CONST.originalx / 2) + seq * canvas.width, 0)
    ctx.drawImage(canvas, (CONST.originalx / 2) - (1 + seq) * canvas.width, 0)
}

export default shoji
