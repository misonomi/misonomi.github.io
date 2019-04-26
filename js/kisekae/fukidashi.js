import CONST from './const.js.js'

export default class {
    constructor(audio) {
        this.audio = audio
        this.image = new Image(); this.image.src = './images/kisekae/fukidashi.png'
        this.x = (CONST.originalx - this.image.width) / 2
        this.y = CONST.fukidashi.y
        this.set('')
    }
    set(text) {
        this.line = text.split('\n')
        this.lineptr = 0
        this.char = 0.0
    }
    escapement() {
        if (this.lineptr >= this.line.length) { return }
        if  (parseInt(this.char) < this.line[lineptr].length) {
            this.char += 1 / CONST.fukidashi.intervalt
        } else {
            this.lineptr++
            this.char = 0.0
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
        ctx.fillText(this.line.substr(0, parseInt(this.char)), CONST.originalx / 2, this.y + CONST.fukidashi.margin)
    }
}
