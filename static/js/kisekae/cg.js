import CONST from './const.js'

export default class {
    constructor(name) {
        this.image = new Image(); this.image.src = './static/images/kisekae/cg/' + name + '.png'
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
        if (this.pan_id < CONST.cg.pan.length) {
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
        } else {
            ctx.drawImage(this.image, 0, 0, CONST.originalx, CONST.originaly)
        }
    }
}
