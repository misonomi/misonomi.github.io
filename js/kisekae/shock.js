import CONST from './const.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/shock.png'
        this.x = 0
        this.y = 0
    }
    ignite(x, y) {
        this.x = x
        this.y = y
    }
    smallignite(x, y) {
        this.x = x
        this.y = y
    }
    proc() {
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
            this.x - this.image.width / 2, this.y - this.image.height / 2, this.x + this.image.width / 2, this.y + this.image.height / 2)
    }
}
