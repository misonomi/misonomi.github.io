import CONST from './const.js'

export default class {
    constructor(id) {
        this.image = new Image(); this.image.src = './static/images/kisekae/tablet.png'
        this.x = (CONST.originalx - this.image.width) / 2
        this.y = CONST.tablet.standardy + (CONST.tablet.intervaly * id)
        this.ap = CONST.tablet.ap
        this.interval = CONST.tablet.intervalt
    }
    clicked(x, y) {
        if (this.interval >= 0) {
            this.interval = CONST.tablet.intervalt
            return (this.x <= x && x <= this.x + this.image.width) && (this.y <= y && y <= this.y + this.image.height)
        } else {
            return false
        }
    }
    break() {
        return --this.ap <= 0
    }
    proc() {
        if (this.interval > 0) {
            this.interval--
        } 
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
