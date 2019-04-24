import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './static/images/kisekae/logo.png'
    }
    draw(ctx) {
        ctx.drawImage(this.image, CONST.logo.x, CONST.logo.y)
    }
}
