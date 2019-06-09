import CONST from './const.js'

export default class {
    constructor() {
        this.alpha = 1
        this.down = true
    }
    proc() {
        if(this.down) {
            if(this.alpha > CONST.cts.alpha_min) {
                this.alpha -= CONST.cts.alpha_step
            } else {
                this.alpha = CONST.cts.alpha_min
                this.down = false
            }
        } else {
            if(this.alpha < 1) {
                this.alpha += CONST.cts.alpha_step
            } else {
                this.alpha = 1
                this.down = true
            }
        }
    }
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')'
        ctx.shadowColor = 'rgb(255, 255, 255)'
        ctx.shadowBlur = 50
        ctx.font = "100px Geo"
        ctx.textAlign = 'center'
        ctx.fillText('Click to start', CONST.originalx / 2, CONST.cts.y)
        ctx.restore()
    }
}
