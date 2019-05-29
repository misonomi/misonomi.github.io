import CONST from './const.js'

const BASE_TEXT = 'BREAK DOWN'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.break.height

        this.ctx.fillStyle = 'rgba(0, 0, 0, .3)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 5)
        this.ctx.fillRect(0, this.canvas.height * 4 / 5, this.canvas.width, this.canvas.height / 5)

        this.poe_start = 0.0
        this.poe_end = 0.0
    }
    proc() {
        this.poe_start += .01
        if (this.poe_start < 1) {
            return false
        } else {
            this.poe_start = 1
        }
        
        this.poe_end += .01
        if (this.poe_end < 1) {
            return false
        } else {
            this.poe_end = 1
        }

        return true
    }
    draw(ctx) {
        ctx.save()

        const halfprogress = this.poe_start * .5

        ctx.drawImage(this.canvas, this.canvas.width * (.5 - halfprogress), 0, this.canvas.width * halfprogress * 2, this.canvas.height,
            CONST.originalx * (.5 - halfprogress), (CONST.originaly - this.canvas.height) / 2, CONST.originalx * halfprogress * 2, this.canvas.height)

        ctx.fillStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        ctx.fillRect(0, CONST.originaly / 2 + (this.canvas.height * .2), CONST.originalx * this.poe_start, 2)
        ctx.fillRect(0, CONST.originaly / 2 - (this.canvas.height * .2), CONST.originalx * this.poe_start, 2)
        ctx.fillRect(0, CONST.originaly / 2 - (this.canvas.height * .2), CONST.originalx * this.poe_start, 2)

        ctx.fillStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        ctx.font = '120px Geo'
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
