import CONST from './const.js'
import ImageLorder from './image.js'

let tablet = class {
    constructor(id) {
        let _this = this
        ImageLorder('./images/kisekae/tablet.png').then(image => {
            _this.canvas = document.createElement('canvas')
            let ctx = _this.canvas.getContext('2d')
            _this.canvas.width = image.width
            _this.canvas.height = image.height
            ctx.drawImage(image, 0, 0)

            _this.canvas_white = document.createElement('canvas')
            ctx = _this.canvas_white.getContext('2d')
            _this.canvas_white.width = image.width
            _this.canvas_white.height = image.height
            ctx.drawImage(image, 0, 0)
            ctx.globalCompositeOperation = 'source-atop'
            ctx.fillStyle = 'rgb(255, 255, 255, .7)'
            ctx.fillRect(0, 0, image.width, image.height)
            
            _this.x = (CONST.originalx - image.width) / 2
        }) 
        this.y = CONST.tablet.standardy + (CONST.tablet.intervaly * id)
        this.randx = 0
        this.randy = 0
        this.fullap = CONST.tablet.ap + id
        this.ap = this.fullap
        this.interval = 0
    }
    calm() {
        this.interval = 0
        this.randx = 0
        this.randy = 0
    }
    clicked(x, y) {
        if ((this.interval <= 0) && 
                (this.x <= x && x <= this.x + this.canvas.width) && 
                (this.y <= y && y <= this.y + this.canvas.height)) {
            this.interval = CONST.tablet.intervalt
            this.ap--
            return true
        } else if (this.interval > 0) {
            this.interval = CONST.tablet.intervalt
        }
        return false
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
    get_ap() {
        return { full: this.fullap, current: this.ap }
    }
    draw(ctx) {
        ctx.drawImage((this.interval > 0) ? this.canvas_white : this.canvas, this.x + this.randx, this.y + this.randy)
    }
}

export default tablet
