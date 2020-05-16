import { DRESS } from './stat.js'
import CONST from './const.js'

const stat = {
    active: 0,
    clicked: 1,
    disabled: 2,
}

const TWEAK = {
    fsize: 40,
}

export default class {
    constructor(dress) {
        this.canvas_top = document.createElement('canvas')
        this.ctx_top = this.canvas_top.getContext('2d')
        this.canvas_top.width = CONST.dresser.width_t
        this.canvas_top.height = CONST.dresser.height_t

        this.canvas_base = document.createElement('canvas')
        this.ctx_base = this.canvas_base.getContext('2d')
        this.canvas_base.width = CONST.dresser.width_b
        this.canvas_base.height = CONST.dresser.height_b

        draw_top(this.ctx_top, this.canvas_top.width, this.canvas_top.height, CONST.dresser[dress].color)
        draw_base(this.ctx_base, this.canvas_base.width, this.canvas_base.height, this.canvas_top, this.canvas_top.width, this.canvas_top.height)

        //---------

        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.poe = 0.0
        this.stat = stat.active
    }
    clicked(x, y) {
        if ((this.x <= x && x <= this.x + this.canvas_base.width) && (this.y <= y && y <= this.y + this.canvas_base.height) && this.stat == stat.active) {
            this.stat = stat.clicked
            return true
        } else {
            return false
        }
    }
    ready() {
        if (this.stat == stat.clicked) { 
            this.poe = 0.0
            this.stat = stat.disabled
            this.ctx_top.clearRect(0, 0, this.canvas_top.width, this.canvas_top.height)
            draw_base(this.ctx_base, this.canvas_base.width, this.canvas_base.height, this.canvas_top, this.canvas_top.width, this.canvas_top.height)
        }
        if (this.poe < 1) {
            this.poe += CONST.dresser.step
            return false
        } else {
            this.poe = 1
            return true
        }
    }
    unready() {
        if (this.stat == stat.clicked) {
            // do nothing
        } else if (this.poe > 0) {
            this.poe -= CONST.dresser.step
            return false
        } else {
            this.poe = 0.0
            return true
        }
    }
    draw(ctx) {

        ctx.save()

        ctx.drawImage(this.canvas_base, 0, 0, this.canvas_base.width, this.canvas_base.height,
            this.x, this.y + (1 - this.poe) * this.canvas_base.height / 2,
            this.canvas_base.width, this.canvas_base.height * this.poe)
        
        ctx.font = 'bold ' + TWEAK.fsize * this.poe + 'px "Noto Sans JP"'
        ctx.textAlign = 'center'
        ctx.fillStyle = (this.stat === stat.clicked) ? 'rgb(96, 96, 96)' : 'rgb(32, 32, 32)'
        ctx.shadowColor = (this.stat === stat.clicked) ? 'rgb(255, 255, 255)' : 'rgb(128, 168, 168)'
        ctx.shadowBlur = 10
        ctx.fillText(CONST.dresser[this.dress].text, 
            this.x + this.canvas_base.width / 2, 
            this.y + this.canvas_base.height / 2 + TWEAK.fsize * .4)

        ctx.restore()
    }
}

function draw_top(ctx, width, height, color) {
    ctx.clearRect(0, 0, width, height)
    
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.beginPath()
    ctx.ellipse(width / 2, 0, width / 2, height / 2, 0, 0, 2 * Math.PI)
    ctx.fill()

    let grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, color)
    grad.addColorStop(1, 'rgba(255, 255, 255, .7)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
    
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRoundRect(0, 0, width, height, 10)
}

function draw_base(ctx, width, height, icanvas, iwidth, iheight) {
    ctx.clearRect(0, 0, width, height)

    let grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, 'rgb(64, 64, 64)')
    grad.addColorStop(.5, 'rgba(0, 0, 0, .7)')
    grad.addColorStop(1, 'rgb(64, 64, 64)')
    ctx.fillStyle = grad
    ctx.fillRoundRect(0, 0, width, height, 10)
    
    ctx.drawImage(icanvas, (width - iwidth) / 2, (height - iheight) / 2)
}
