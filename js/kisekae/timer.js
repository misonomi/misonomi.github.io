import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.timer.radius * 2
        this.canvas.height = CONST.timer.radius * 2

        this.anglemin = (0.5 + CONST.timer.margin) * Math.PI
        this.anglemax = (2.5 - CONST.timer.margin) * Math.PI

        this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
        this.ctx.strokeArc(CONST.timer.linew * 2, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew * 3, 
            0, 2 * Math.PI)

        this.ctx.strokeArc(CONST.timer.linew, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew, 
            Math.PI - CONST.timer.margin * 3, Math.PI + CONST.timer.margin * 3)
        this.ctx.strokeArc(CONST.timer.linew, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew, 
            - CONST.timer.margin * 3, CONST.timer.margin * 3)

        this.ctx.strokeArc4(CONST.timer.linew, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew * 6, 
            CONST.timer.margin * 2, Math.PI * .5 - CONST.timer.margin * 2)
        
        this.ctx.strokeArc4(CONST.timer.linew * 3, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew * 7, 
            Math.PI * .25, Math.PI * .25 + .01)

        this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)'
        this.ctx.strokeArc(CONST.timer.linew * 2, this.canvas.width / 2, this.canvas.width / 2, 
            CONST.timer.radius - CONST.timer.linew * 12, 
            0, 2 * Math.PI)

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
        ctx.save()

        ctx.drawImage(this.canvas, (CONST.originalx - this.canvas.width) / 2, (CONST.originaly - this.canvas.height) / 2)

        ctx.strokeStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 10
        ctx.strokeArc(CONST.timer.linew * .5, CONST.originalx / 2, CONST.originaly / 2, 
            CONST.timer.radius - CONST.timer.linew * 3, 
            this.anglemin, this.anglemin + ((this.anglemax - this.anglemin) * this.clock / CONST.timer.timelimit))

        ctx.fillStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        ctx.font = '40px Geo'
        ctx.textAlign = 'center'
        ctx.fillText('timer', CONST.originalx / 2, (this.canvas.height + CONST.originaly) / 2 - CONST.timer.textmarginy)

        ctx.restore()
    }
}
