import CONST from './const.js'

export default class {
    constructor() {
        this.image = document.getElementById('fukidashi')
        this.x = CONST.fukidashi.x
        this.y = CONST.fukidashi.y
        this.line = ""
        this.charseq = 0
    }
    set(text) {
        this.line = text
        this.char = 0
    }
    escapement() {
        if  (this.char < this.line.length) {
            this.char++
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
        ctx.fillText(this.line.substr(0, this.char), CONST.originalx / 2, this.y + CONST.fukidashi.margin)
    }
}
