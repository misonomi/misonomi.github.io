import CONST from './const.js'

export default class {
    constructor(id) {
        this.image = new Image()
        this.image.onload = () => { super.x = (CONST.originalx - this.width) / 2 }
        this.image.src = './images/kisekae/tablet.png'
        this.y = CONST.tablet.standardy + (CONST.tablet.intervaly * id)
        this.randx = 0
        this.randy = 0
        this.ap = CONST.tablet.ap
        this.interval = 0
    }
    calm() {
        this.interval = 0
        this.randx = 0
        this.randy = 0
    }
    clicked(x, y) {
        if ((this.interval <= 0) && 
                (this.x <= x && x <= this.x + this.image.width) && 
                (this.y <= y && y <= this.y + this.image.height)) {
            this.interval = CONST.tablet.intervalt
            this.ap--
            return true
        } else {
            return false
        }
    }
    is_broken() {
        return this.ap <= 0
    }
    proc() {
        if (this.interval > 0) {
            this.randx = Math.random() * CONST.tablet.agility
            this.randy = Math.random() * CONST.tablet.agility
            this.interval--
        } else {
            this.randx = 0
            this.randy = 0
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x + this.randx, this.y + this.randy)
    }
}
