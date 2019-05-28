import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = CONST.conscience.width
        this.canvas.height = CONST.conscience.height + CONST.conscience.blur

        this.text = 'just wait'
        this.init()
    }
    init() {
        this.poe = [0.0, 0.0]
    }
    ready() {
        if (this.poe[0] < 1) {
            this.poe[0] += CONST.conscience.step0
            return false
        }
        this.poe[0] = 1
        
        if (this.poe[1] < 1) {
            this.poe[1] += CONST.conscience.step1
            return false
        }
        this.poe[1] = 1
        return true
    }
    clicked(x, y) {
        return (CONST.originalx - CONST.conscience.width <= x && x <= CONST.originalx) && 
            (CONST.originaly - CONST.conscience.height <= y && y <= CONST.originaly)
    }
    draw(ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.save()

        this.ctx.fillStyle = 'rgba(0, 0, 0, .5)'
        this.ctx.fillRect(0, CONST.conscience.blur + CONST.conscience.height * (1 - this.poe[0]), CONST.conscience.width, CONST.conscience.height)
        
        this.ctx.fillStyle = 'rgb(200, 255, 255)'
        this.ctx.shadowColor = 'rgb(0, 255, 255)'
        this.ctx.shadowBlur = CONST.conscience.blur
        this.ctx.fillRect(CONST.conscience.width * (1 - this.poe[1]), CONST.conscience.blur, CONST.conscience.width, 3)

        this.ctx.fillStyle = 'rgb(255, 200, 200)'
        this.ctx.shadowColor = 'rgb(255, 0, 0)'
        this.ctx.shadowBlur = 50
        this.ctx.font = '40px Geo'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this.text.substr(0, this.text.length * this.poe[1]), this.canvas.width / 2, this.canvas.height - CONST.timer.textmarginy)

        this.ctx.restore()

        ctx.drawImage(this.canvas, CONST.originalx - this.canvas.width, CONST.originaly - this.canvas.height)
    }
}