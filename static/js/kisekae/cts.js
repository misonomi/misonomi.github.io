import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = '../../images/kisekae/clicktostart.png'
        this.x = (CONST.originalx - image.width) / 2
        this.y = CONST.cts.y
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
