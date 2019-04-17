import CONST from './const.js'

export default class {
    constructor(name) {
        this.image = new Image(); this.image.src = '../../images/kisekae/cg/' + name + '.png'
        this.x = 0
        this.y = 0
        this.zoom = true
        this.clock = 0
        this.pan_id = 0
    }
    pan() {
        this.clock++
        if (this.clock > CONST.cg.pan[this.pan_id].duration) {
            this.clock = 0
            this.pan_id++
        }
        if (this.pan_id < CONST.cg.pan.length) {
            return true
        } else {
            this.zoom = false
            return false
        }
    }
    draw(ctx) {
        if (zoom) {
            ctx.drawImage(this.image, 
                CONST.cg.pan[this.pan_id].startx + CONST.cg.pan[this.pan_id].stepx * this.clock, 
                CONST.cg.pan[this.pan_id].starty + CONST.cg.pan[this.pan_id].stepy * this.clock)
        } else {
            ctx.drawImage(this.image, 0, 0, CONST.originalx, CONST.originaly)
        }
    }
}
