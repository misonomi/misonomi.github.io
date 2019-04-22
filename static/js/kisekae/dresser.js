import { DRESS } from './stat.js'
import CONST from './const.js'

export default class {
    constructor(dress) {
        this.image = new Image(); this.image.src = './static/images/kisekae/dresser/' + dress + '.png'
        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.w = image.width
        this.active = true
        this.shining = false
    }
    clicked(x, y) {
        if ((this.x <= x && x <= this.x + this.image.width) && (this.y <= y && y <= this.y + this.image.height) && this.active) {
            this.shining = true
            this.active = false
            this.image.src = './static/images/kisekae/dresser/' + this.dress + '_shining.png'
            return true
        } else {
            return false
        }
    }
    ready() {
        if (this.shining) { 
            this.shining = false
            this.image.src = './static/images/kisekae/dresser/' + this.dress + '_disabled.png'
        }
        if (this.w < this.image.width) {
            this.w += this.image.width
            return false
        } else {
            this.w = this.image.width
            return true
        }
    }
    unready() {
        if (this.shining) {
        } else if (this.w > 0) {
            this.w -= 0
            return false
        } else {
            this.w = 0
            return true
        }
    }
    draw(ctx) {
        tab = this.image.width - this.w
        ctx.drawImage(this.image, this.x + tab, this.y, this.image.width - tab, this.image.height)
    }
}
