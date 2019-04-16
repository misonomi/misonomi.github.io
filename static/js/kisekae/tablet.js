import CONST from './const.js'

export default class {
    constructor(id) {
        this.image = document.getElementById('tablet')
        this.x = CONST.originalx / 2
        this.y = CONST.tablet.standardy + (CONST.tablet.intervaly * id)
        this.ap = CONST.tablet.ap
        this.interval = CONST.tablet.intervalt
    }
    clicked(x, y) {
        if (this.interval <= 0) {
            this.interval = interval
            return (this.x <= x && x <= this.x + width) && (this.y <= y && y <= this.y + height)
        } else {
            return false
        }
    }
    break() {
        return --this.ap < 0
    }
    frame() {
        if (this.interval > 0) {
            this.interval--
        } 
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
