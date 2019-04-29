import CONST from './const.js.js'
const leftc = (CONST.originalx / 2) - CONST.shoji.width
const lefto = leftc - CONST.shoji.width
const rightc = CONST.originalx / 2
const righto = rightc + CONST.shoji.width

const step = 20

export default class {
    constructor() {
        this.left = new Image(); this.left.src = './images/kisekae/shoji.png'
        this.right = new Image(); this.right.src = './images/kisekae/shoji.png'
        this.outer_left = new Image(); this.outer_left.src = './images/kisekae/shoji.png'
        this.outer_right = new Image(); this.outer_right.src = './images/kisekae/shoji.png'
        this.leftx = lefto
        this.rightx = righto
        this.outer_leftx = lefto
        this.outer_rightx = righto
    }
    open() {
        if ((this.leftx > lefto) && (this.rightx < righto)) {
            this.leftx -= step
            this.rightx += step
            return false
        } else {
            this.leftx = lefto
            this.rightx = righto
            return true
        }
    }
    close() {
        if ((this.leftx < leftc) && (this.rightx > rightc)) {
            this.leftx += step
            this.rightx -= step
            return false
        } else {
            this.leftx = leftc
            this.rightx = rightc
            return true
        }
    }
    draw(ctx) {
        ctx.drawImage(this.left, this.leftx, 0)
        ctx.drawImage(this.right, this.rightx, 0)
        ctx.drawImage(this.outer_left, this.outer_leftx, 0)
        ctx.drawImage(this.outer_right, this.outer_rightx, 0)
    }
}
