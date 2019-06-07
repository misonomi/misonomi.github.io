import CONST from './const.js'

const leftc = (CONST.originalx / 2) - CONST.shoji.width
const lefto = leftc - CONST.shoji.width
const rightc = CONST.originalx / 2
const righto = rightc + CONST.shoji.width

let shoji = class {
    constructor() {
        new Promise(resolve => {
            let image = new Image()
            image.src = './images/kisekae/shoji.png'
            image.onload = () => resolve(image)
        }).then(image => {
            this.canvas = document.createElement('canvas')
            let ctx = this.canvas.getContext('2d')
            this.canvas.width = CONST.shoji.width
            this.canvas.height = CONST.originaly
    
            ctx.drawImage(image, 0, 0)
        })

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
        ctx.drawImage(this.canvas, this.leftx, 0)
        ctx.drawImage(this.canvas, this.rightx, 0)
        ctx.drawImage(this.canvas, this.outer_leftx, 0)
        ctx.drawImage(this.canvas, this.outer_rightx, 0)
    }
}

export default shoji
