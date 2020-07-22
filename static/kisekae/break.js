import CONST from './const.js'

const BASE_TEXT = 'BREAK DOWN'

const TWEAK = {
    height_outer: .12,
    height_inner: .05,
    width_inner: .3,
    blink: 10,
}

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.break.height

        this.ctx.fillStyle = 'rgba(0, 0, 0, .3)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'rgba(0, 0, 0, .5)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * TWEAK.height_outer)
        this.ctx.fillRect(this.canvas.width * TWEAK.width_inner, this.canvas.height * TWEAK.height_outer, 
            this.canvas.width * (1 - 2 * TWEAK.width_inner), this.canvas.height * TWEAK.height_inner)

        this.ctx.fillRect(0, this.canvas.height * (1 - TWEAK.height_outer), this.canvas.width, this.canvas.height * TWEAK.height_outer)
        side_rect(this.ctx, this.canvas.height * (1 - TWEAK.height_outer - TWEAK.height_inner), TWEAK.height_inner, TWEAK.width_inner)

        this.poe_start = 0.0
        this.pause = CONST.break.pause
        this.poe_end = 1.0
    }
    proc() {
        this.poe_start += CONST.break.startstep
        if (this.poe_start < 1) {
            return false
        } else {
            this.poe_start = 1
        }

        if (--this.pause > 0) { return false }
        
        this.poe_end -= CONST.break.endstep
        if (this.poe_end > 0) {
            return false
        } else {
            this.poe_end = 0
            return true
        }
    }
    draw(ctx) {
        ctx.save()

        const halfprogress = this.poe_start * .5

        ctx.drawImage(this.canvas, this.canvas.width * (.5 - halfprogress), 0, this.canvas.width * halfprogress * 2, this.canvas.height,
            CONST.originalx * (.5 - halfprogress), (CONST.originaly - (this.canvas.height * this.poe_end)) / 2, CONST.originalx * halfprogress * 2, this.canvas.height * this.poe_end)

        ctx.fillStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        side_rect(ctx, CONST.originaly / 2 + (this.canvas.height * .2), 2 * this.poe_end, this.poe_start)
        side_rect(ctx, CONST.originaly / 2 - (this.canvas.height * .2), 2 * this.poe_end, this.poe_start)

        side_rect(ctx, CONST.originaly / 2 + (this.canvas.height * .4), 6 * this.poe_end, Math.min(1, this.poe_start * 2))
        side_rect(ctx, CONST.originaly / 2 - (this.canvas.height * .4), 6 * this.poe_end, Math.min(1, this.poe_start * 2))

        ctx.fillStyle = 'rgba(200, 255, 255, '+(TWEAK.blink * Math.random() * this.poe_end * (1 - this.poe_end) + this.poe_end)+')'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        ctx.font = '120px Sarpanch'
        ctx.textAlign = 'center'
        ctx.fillText(BASE_TEXT.substr(0, Math.floor(BASE_TEXT.length * this.poe_start)) + generate_alphabet(Math.ceil(BASE_TEXT.length * (1. - this.poe_start))),
            CONST.originalx / 2, CONST.originaly / 2 + 30)

        ctx.restore()
    }
}

function generate_alphabet(len) {
    let res = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for ( var i = 0; i < len; i++ ) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res
}

function side_rect(ctx, alt, thickness, progress) {
    ctx.fillRect(0, alt, CONST.originalx / 2 * progress, thickness)
    ctx.fillRect(CONST.originalx, alt, - 1 * (CONST.originalx / 2 * progress), thickness)
}
