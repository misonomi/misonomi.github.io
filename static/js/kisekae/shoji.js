import CONST from './const.js'
const leftc = (CONST.originalx / 2) - CONST.shoji.width
const lefto = leftc - CONST.shoji.width + CONST.shoji.margin 
const rightc = CONST.originalx / 2
const righto = rightc + CONST.shoji.width - CONST.shoji.margin

const step = 20

export default class {
    constructor() {
        this.left = new Image(); this.left.src = "../../images/kisekae/shoji.png"
        this.right = new Image(); this.right.src = "../../images/kisekae/shoji.png"
        this.leftx = lefto
        this.rightx = righto
    }
    open() {
        if ((this.leftx > lefto) && (this.rightx < righto)) {
            this.leftx -= step
            this.rightx += step
            return true
        } else {
            this.leftx = lefto
            this.rightx = righto
            return false
        }
    }
    close() {
        if ((this.leftx < leftc) && (this.rightx > rightc)) {
            this.leftx += step
            this.rightx -= step
            return true
        } else {
            this.leftx = leftc
            this.rightx = rightc
            return false
        }
    }
    draw(ctx) {
        ctx.drawImage(this.left, this.leftx, 0)
        ctx.drawImage(this.right, this.rightx, 0)
    }
}
