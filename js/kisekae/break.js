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
        if (this.poe_start < 1) {
            this.poe_start += .01
            return false
        } else {
            this.poe_start = 1
        }
        
        if (this.poe_end < 1) {
            this.poe_end += .01
            return false
        } else {
            this.poe_end = 1
        }

        return true
    }
    draw(ctx) {
        ctx.save()

        ctx.drawImage(this.canvas, this.canvas.width * this.poe_start, 0, this.canvas.width * (1 - this.poe_start), this.canvas.height,
            0, (CONST.originaly - this.canvas.height) / 2, this.canvas.width * this.poe_start, this.canvas.height)

        this.ctx.fillStyle = 'rgb(200, 255, 255)'
        this.ctx.shadowColor = 'rgb(0, 255, 255)'
        this.ctx.shadowBlur = 50
        this.ctx.fillRect(0, (CONST.originaly - this.canvas.height) / 2 + this.canvas.height * .2, 
            CONST.originalx * this.poe_start, (CONST.originaly - this.canvas.height) / 2 + this.canvas.height * .2 + 2)
        this.ctx.fillRect(0, (CONST.originaly - this.canvas.height) / 2 - this.canvas.height * .2, 
            CONST.originalx * this.poe_start, (CONST.originaly - this.canvas.height) / 2 - this.canvas.height * .2 - 2)

        this.ctx.fillStyle = 'rgb(200, 255, 255)'
        this.ctx.shadowColor = 'rgb(0, 255, 255)'
        this.ctx.shadowBlur = 50
        this.ctx.font = '100px Geo'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(BASE_TEXT.substr(0, Math.floor((BASE_TEXT.length - 1) * this.poe_start)) + generate_alphabet(Math.ceil((BASE_TEXT.length - 1) * (1. - this.poe_start))),
            CONST.originalx / 2, CONST.originaly / 2)

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
