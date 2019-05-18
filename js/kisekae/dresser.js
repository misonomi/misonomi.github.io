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
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
            this.x, this.y + (1 - this.poe) * this.image.height / 2,
            this.image.width, this.image.height * this.poe)
    }
}
