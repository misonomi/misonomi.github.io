import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.bubbles = []

        this.canvas.width = CONST.fukidashi.width
        this.canvas.height = CONST.fukidashi.height

        this.set('')
    }
    set(text) {
        this.line = text.split('\n')
        this.lineptr = 0
        this.char = 0
        this.interval = CONST.fukidashi.intervalt
    }
    proc(audio) {
        this.escapement(audio)

        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            this.bubbles[i].proc()
        }

        if (this.bubbles.length > 0 && this.bubbles[0].is_bursted()) {
            this.bubbles.shift()
        }

        if (Math.random() < CONST.fukidashi.bubble.generate_rate) {
            this.bubbles.push(new Bubble(this.canvas.width, this.canvas.height))
        }

    }
    escapement(audio) {
        if (this.lineptr >= this.line.length) { return }

        this.interval--
        if (this.interval > 0) { return }

        this.interval = CONST.fukidashi.intervalt
        this.char++
        if (this.char < this.line[this.lineptr].length) {
            audio.play('mi')
        } else {
            this.lineptr++
            this.char = 0
        }
    }
    draw(ctx) {

        this.make_fukidashi()
        ctx.drawImage(this.canvas, (CONST.originalx - this.canvas.width) / 2, CONST.fukidashi.y)

        ctx.save()
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.shadowColor = 'rgb(255, 255, 255)'
        ctx.shadowBlur = 5
        ctx.font = "bold 40px Noto Sans JP"
        ctx.textAlign = 'center'
        for (let i = 0; i < this.line.length; i++) {
            if (i == this.lineptr) {
                ctx.fillText(this.line[i].substr(0, this.char), 
                    CONST.originalx / 2, CONST.fukidashi.y + CONST.fukidashi.margin + (i * CONST.fukidashi.textheight))
            } else if (i < this.lineptr) {
                ctx.fillText(this.line[i], 
                    CONST.originalx / 2, CONST.fukidashi.y + CONST.fukidashi.margin + (i * CONST.fukidashi.textheight))
            }
        }
        ctx.restore()
    }
    make_fukidashi() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.fillStyle = 'rgb(0, 0, 0)'
        for (let i = 0; i < this.bubbles.length; i++) {
            const r = this.bubbles[i].radius
            this.ctx.save()

            this.ctx.translate(this.bubbles[i].x, this.bubbles[i].y)
            this.ctx.rotate(Math.PI / 4)
            
            this.ctx.fillRect(-1*r, -1*r, 2*r, 2*r)
            
            this.ctx.restore()
        }

        let gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, .7)')
        this.ctx.globalCompositeOperation = 'xor';
        this.ctx.fillStyle = gradient
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.globalCompositeOperation = 'xor';
        this.ctx.fillStyle = 'rgba(2, 20, 30, 90)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
    }
}

class Bubble {
    constructor(width, height) {
        this.radius = CONST.fukidashi.bubble.radius_min + Math.random() * CONST.fukidashi.bubble.radius_variance
        this.x = CONST.fukidashi.bubble.xmin + Math.random() * (width - CONST.fukidashi.bubble.xmin)
        this.y = this.radius + height
    }
    proc() {
        this.y -= CONST.fukidashi.bubble.step
    }
    is_bursted() {
        return this.y + this.radius < 0
    }
}
