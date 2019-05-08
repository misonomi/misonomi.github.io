import CONST from './const.js.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/kisekae/fukidashi.png'
        this.x = (CONST.originalx - this.image.width) / 2
        this.y = CONST.fukidashi.y
        this.set('')
    }
    set(text) {
        this.line = text.split('\n')
        this.lineptr = 0
        this.char = 0
        this.interval = CONST.fukidashi.intervalt
    }
    escapement(audio) {
        if (this.lineptr >= this.line.length) { return }

        this.interval--
        if (this.interval <= 0) {
            this.interval = CONST.fukidashi.intervalt
            this.char++
        } else { return }

        if (this.char < this.line[lineptr].length) {
            audio.play('mi')
        } else {
            this.lineptr++
            this.char = 0
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
        for (let i = 0; i < this.line.length - 1; i++) {
            if (i == this.lineptr) {
                ctx.fillText(this.line[i].substr(0, this.char), CONST.originalx / 2, this.y + CONST.fukidashi.margin + (i * CONST.fukidashi.height))
            } else if (i < this.lineptr) {
                ctx.fillText(this.line[i], CONST.originalx / 2, this.y + CONST.fukidashi.margin + (i * CONST.fukidashi.height))
            }
        }
    }
}
