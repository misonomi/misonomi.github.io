import CONST from './const.js'

const TEXT = [
    {
        text: 'Thank you for playing!',
        size: '100',
        x: CONST.originalx / 2,
        y: CONST.tfp.y,
    },
    {
        text: 'click to play again',
        size: '40',
        x: CONST.originalx / 2,
        y: CONST.tfp.y + 100,
    },
]

export default class {
    constructor() {
        this.alpha = 1
        this.down = true
        this.currentText = ['']
        this.txtptr = 0
        this.cptr = 0
    }
    setup() {
        if (this.cptr >= TEXT[this.txtptr].text.length) {
            this.txtptr++
            this.cptr = 0
            if (this.txtptr >= TEXT.length) {
                this.txtptr--
                return true 
            }
            this.currentText.push('')
        }
        this.currentText[this.txtptr] = TEXT[this.txtptr].text.substr(0, this.cptr) + '_'
        this.cptr += .1

        return false
    }
    proc() {
        if(this.down) {
            if(this.alpha > CONST.tfp.alpha_min) {
                this.alpha -= CONST.tfp.alpha_step
            } else {
                this.alpha = CONST.tfp.alpha_min
                this.down = false
            }
        } else {
            if(this.alpha < 1) {
                this.alpha += CONST.tfp.alpha_step
            } else {
                this.alpha = 1
                this.down = true
            }
        }
    }
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.shadowBlur = 50
        ctx.textAlign = 'center'
        for (let i = 0; i <= this.txtptr; i++) {
            ctx.font = TEXT[i].size + 'px Geo'
            ctx.fillText(this.currentText[i], TEXT[i].x, TEXT[i].y)
        }
        ctx.restore()
    }
}
