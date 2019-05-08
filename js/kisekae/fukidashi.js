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
        if (parseInt(this.char) < this.line[lineptr].length) {
            this.char += 1 / CONST.fukidashi.intervalt
        } else {
            this.lineptr++
            this.char = 0.0
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
        for (let i = 0; i < this.line.length - 1; i++) {
            if (i == this.lineptr) {
                ctx.fillText(this.line[i].substr(0, Math.floor(this.char)), CONST.originalx / 2, this.y + CONST.fukidashi.margin + (i * CONST.fukidashi.height))
            } else if (i < this.lineptr) {
                ctx.fillText(this.line[i], CONST.originalx / 2, this.y + CONST.fukidashi.margin + (i * CONST.fukidashi.height))
            }
        }
    }
}
