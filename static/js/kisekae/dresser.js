import { DRESS } from './stat.js'
import CONST from './const.js'

export default class {
    constructor(dress) {
        this.image = new Image(); this.image.src = '../../images/kisekae/dresser/' + dress + '.png'
        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.active = true
    }
    clicked(x, y) {
        if ((this.x <= x && x <= this.x + image.width) && (this.y <= y && y <= this.y + image.height) && this.active) {
            this.active = false
            this.image.src = '../../images/kisekae/dresser/' + dress + '_disabled.png'
            return true
        } else {
            return false
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
