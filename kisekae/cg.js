import CONST from './const.js'

export default class {
    constructor(name) {
        this.image = new Image(); this.image.src = './images/kisekae/cg/' + name + '.png'
        this.zoom = true
        this.clock = 0
        this.pan_id = 0
        this.id = name
    }
    pan() {
        this.clock++
        if (this.clock > CONST.cg[this.id].pan[this.pan_id].duration) {
            this.clock = 0
            this.pan_id++
        }
        if (this.pan_id < CONST.cg[this.id].pan.length) {
            return false
        } else {
            this.zoom = false
            return true
        }
    }
    draw(ctx) {
        if (this.zoom) {
            ctx.drawImage(this.image, 
                CONST.cg[this.id].pan[this.pan_id].startx + CONST.cg[this.id].pan[this.pan_id].stepx * this.clock, 
                CONST.cg[this.id].pan[this.pan_id].starty + CONST.cg[this.id].pan[this.pan_id].stepy * this.clock)

            ctx.save()

            let grad = ctx.createRadialGradient(CONST.originalx / 2, CONST.originaly / 2, 0, CONST.originaly / 2, CONST.originalx / 2, CONST.originalx)
            // -----
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
            grad.addColorStop(Math.max(1, this.clock / CONST.cg.mistiness), 'rgba(255, 255, 255, 0)')
            grad.addColorStop(1, 'rgba(255, 255, 255, 1)')
            // ------
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, CONST.originalx, CONST.originaly)

            ctx.restore()
        } else {
            ctx.drawImage(this.image, 0, 0, CONST.originalx, CONST.originaly)
        }
    }
}
