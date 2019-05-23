import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/tablet.png'
    }
    clicked(x, y) {
        return (CONST.originalx - this.image.width <= x && x <= CONST.originalx) && (CONST.originaly - this.image.height <= y && y <= CONST.originaly)
    }
    draw(ctx) {
        ctx.drawImage(this.image, CONST.originalx - this.image.width, CONST.originaly - this.image.height)
    }
}