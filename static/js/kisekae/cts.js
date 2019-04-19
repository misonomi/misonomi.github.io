import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './static/images/kisekae/clicktostart.png'
        this.x = (CONST.originalx - this.image.width) / 2
        this.y = CONST.cts.y
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
