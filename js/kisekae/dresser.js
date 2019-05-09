import { DRESS } from './stat.js'
import CONST from './const.js'

const stat = {
    active: 0,
    clicked: 1,
    disabled: 2,
}

export default class {
    constructor(dress) {
        this.image = new Image(); this.image.src = './images/kisekae/dresser/' + dress + '.png'
        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.w = 0
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
            this.w = 0
            this.stat = disabled
            this.image.src = './images/kisekae/dresser/' + this.dress + '_disabled.png'
        }
        if (this.w < this.image.width) {
            this.w += CONST.dresser.step
            return false
        } else {
            this.w = this.image.width
            return true
        }
    }
    unready() {
        if (this.stat == stat.clicked) {
            
        } else if (this.w > 0) {
            this.w -= CONST.dresser.step
            return false
        } else {
            this.w = 0
            return true
        }
    }
    draw(ctx) {
        const tab = this.image.width - this.w
        ctx.drawImage(this.image, 0, 0, Math.max(this.w, 1), this.image.height, 
        //avoid draw area width to be 0      ^^^
            this.x + tab - (this.image.height * this.xscale / 2), this.y - (CONST.dresser.punirate * tab / 2), 
            Math.max(this.image.width - tab, 1), this.image.height + (CONST.dresser.punirate * tab))
    }
}
