import CONST from './const.js'

const TEXT = [
    {
        text: 'Thank you for playing!',
        size: '160',
        font: 'Geo',
        x: CONST.originalx / 2,
        y: CONST.originaly / 3,
    },
    {
        text: 'this is a fungame for Fate/EXTRA. ',
        size: '10',
        font: '"Libre Barcode 39 Extended Text"',
        x: CONST.originalx / 2,
        y: CONST.originaly - 20,
    },
    {
        text: 'click to play again',
        size: '60',
        font: 'Geo',
        x: CONST.originalx / 2,
        y: CONST.originaly / 2 + 100,
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
            this.currentText[this.txtptr] = TEXT[this.txtptr].text
            this.txtptr++
            this.cptr = 0
            if (this.txtptr >= TEXT.length) {
                this.txtptr--
                return true 
            }
            this.currentText.push('')
        }
        this.currentText[this.txtptr] = TEXT[this.txtptr].text.substr(0, this.cptr) + '█'
        this.cptr += .2

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
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.shadowColor = 'rgba(0, 200, 200, ' + this.alpha + ')'
        ctx.shadowBlur = 50
        ctx.textAlign = 'center'
        for (let i = 0; i <= this.txtptr; i++) {
            ctx.font = TEXT[i].size + 'px ' + TEXT[i].font
            ctx.fillText(this.currentText[i], TEXT[i].x, TEXT[i].y)
        }
        ctx.restore()
    }
}
