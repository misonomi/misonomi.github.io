import CONST from './const.js.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/logo.png'
    }
    draw(ctx) {
        ctx.drawImage(this.image, CONST.logo.x, CONST.logo.y)
    }
}
