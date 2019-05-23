import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.timer.radius * 2
        this.canvas.height = CONST.timer.radius * 2

        this.anglemin = (0.5 + CONST.timer.margina) * Math.PI
        this.anglemax = (2.5 - CONST.timer.margina) * Math.PI

        this.init()
    }
    init() {
        this.clock = 0
    }
    ready() {
        if (this.clock < CONST.timer.timelimit) {
            this.clock += CONST.timer.timelimit / 50
            return false
        } else {
            this.clock = CONST.timer.timelimit
            return true
        }
    }
    tick() {
        return --this.clock <= 0
    }
    end() {
        this.clock = 0
    }
    draw(ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.save()

        this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
        this.ctx.lineWidth = CONST.timer.linew * 2
        this.ctx.beginPath()
        this.ctx.arc(this.canvas.width / 2, this.canvas.width / 2, CONST.timer.radius - CONST.timer.linew, 
            this.anglemin - CONST.timer.marginb, this.anglemax + CONST.timer.marginb)
        this.ctx.stroke()
        
        this.ctx.strokeStyle = 'rgb(200, 255, 255)'
        this.ctx.lineWidth = CONST.timer.linew * .5
        this.ctx.shadowColor = 'rgb(0, 255, 255)'
        this.ctx.shadowBlur = 10
        this.ctx.beginPath()
        this.ctx.arc(this.canvas.width / 2, this.canvas.width / 2, CONST.timer.radius - CONST.timer.linew, 
            this.anglemin, this.anglemin + ((this.anglemax - this.anglemin) * this.clock / CONST.timer.timelimit))
        this.ctx.stroke()

        this.ctx.fillStyle = 'rgb(200, 255, 255)'
        this.ctx.shadowColor = 'rgb(0, 255, 255)'
        this.ctx.shadowBlur = 50
        this.ctx.font = '40px Geo'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('[ timer ]', this.canvas.width / 2, this.canvas.height - CONST.timer.textmarginy)

        this.ctx.restore()

        ctx.drawImage(this.canvas, (CONST.originalx - this.canvas.width) / 2, (CONST.originaly - this.canvas.height) / 2)
    }
}
