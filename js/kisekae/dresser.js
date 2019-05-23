import { DRESS } from './stat.js'
import CONST from './const.js'

const stat = {
    active: 0,
    clicked: 1,
    disabled: 2,
}

export default class {
    constructor(dress) {
        this.canvas_top = document.createElement('canvas')
        this.ctx_top = this.canvas_top.getContext('2d')
        this.canvas_top.width = CONST.dresser.width_t
        this.canvas_top.height = CONST.dresser.height_t

        this.ctx_top.globalCompositeOperation = 'source-over'
        this.ctx_top.fillStyle = 'rgb(0, 0, 0)'
        this.ctx_top.beginPath()
        this.ctx_top.ellipse(this.canvas_top.width / 2, 0, this.canvas_top.width / 2, this.canvas_top.height / 2 - 20, 0, 0, 2 * Math.PI)
        this.ctx_top.fill()

        this.ctx_top.globalCompositeOperation = 'xor'
        let grad = this.ctx_top.createLinearGradient(0, 0, 0, this.canvas.height)
        grad.addColorStop(0, 'rgb(0, 0, 0)')
        grad.addColorStop(1, 'rgba(255, 0, 0, .3)')
        this.ctx_top.fillStyle = grad
        this.ctx_top.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.ctx_top.globalCompositeOperation = 'destination-in'
        this.ctx_base.fillStyle = 'rgb(0, 0, 0)'
        this.ctx_base.fillRoundRect(0, 0, this.canvas_top.width, this.canvas_top.height, 10)

        //---------

        this.canvas_base = document.createElement('canvas')
        this.ctx_base = this.canvas_base.getContext('2d')
        this.canvas_base.width = CONST.dresser.width_b
        this.canvas_base.height = CONST.dresser.height_b

        this.ctx_base.clearRect(0, 0, this.canvas_top.width, this.canvas_top.height)
        this.ctx_base.save()

        this.ctx_base.fillStyle = 'rgba(0, 0, 0, .3)'
        this.ctx_base.fillRoundRect(0, 0, this.canvas_base.width, this.canvas_base.height, 10)

        //---------

        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.poe = 0.0
        this.stat = stat.active
    }
    clicked(x, y) {
        if ((this.x <= x && x <= this.x + this.image.width) && (this.y <= y && y <= this.y + this.image.height) && this.stat == stat.active) {
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
            this.image.src = './images/kisekae/dresser/' + this.dress + '_disabled.png'
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
        this.ctx_base.drawImage(this.canvas_top, (this.canvas_base.width - this.canvas_top.width) / 2, (this.canvas_base.height - this.canvas_top.height) / 2)

        ctx.drawImage(this.canvas_base, 0, 0, this.canvas_base.width, this.canvas_base.height,
            this.x, this.y + (1 - this.poe) * this.canvas_base.height / 2,
            this.canvas_base.width, this.canvas_base.height * this.poe)
    }
}
