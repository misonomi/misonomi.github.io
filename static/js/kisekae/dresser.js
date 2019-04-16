import { DRESS } from './stat.js'
const width = 30
const height = 40
const pos = {
    miko: {
        x: 300,
        y: 300,
    },
}

export default class {
    constructor(dress) {
        this.image = document.getElementById('dresser_' + dress)
        this.diabled_image = document.getElementById('dresser_' + dress + '_disabled')
        this.dress = DRESS[dress]
        this.x = pos.miko.x
        this.y = pos.miko.y
        this.active = true
    }
    clicked(x, y) {
        return ((this.x <= x && x <= this.x + width) && (this.y <= y && y <= this.y + height) && this.active)
    }
    clear() {
        this.active = false
        this.image = this.diabled_image
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
