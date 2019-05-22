import CONST from './const.js'
const width = 658

const leftc = (CONST.originalx / 2) - width
const lefto = leftc - width
const rightc = CONST.originalx / 2
const righto = rightc + width

export default class {
    constructor() {
        const src = './images/kisekae/shoji.png'
        this.left = new Image();        this.left.src = src
        this.right = new Image();       this.right.src = src
        this.outer_left = new Image();  this.outer_left.src = src
        this.outer_right = new Image(); this.outer_right.src = src
        this.leftx = lefto
        this.rightx = righto
        this.outer_leftx = lefto
        this.outer_rightx = righto
    }
    open() {
        if ((this.leftx > lefto) && (this.rightx < righto)) {
            this.leftx -= CONST.shoji.step
            this.rightx += CONST.shoji.step
            return false
        } else {
            this.leftx = lefto
            this.rightx = righto
            return true
        }
    }
    close() {
        if ((this.leftx < leftc) && (this.rightx > rightc)) {
            this.leftx += CONST.shoji.step
            this.rightx -= CONST.shoji.step
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
