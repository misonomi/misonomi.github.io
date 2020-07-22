import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = CONST.shock.radius * 2
        this.canvas.height = CONST.shock.radius * 2

        this.r = 0
        this.init(0, 0)
    }
    init(x, y) {
        this.splashes = []
        this.poe = 1.
        this.x = x
        this.y = y
    }
    ignite(x, y) {
        this.r = CONST.shock.radius
        this.init(x, y)

        const snum = CONST.shock.splash.nmin + (CONST.shock.splash.nvariance * Math.random())
        for (let i = 0; i < snum; i++) {
            this.splashes.push(new Splash(
                    CONST.shock.splash.rmin  + Math.random() * CONST.shock.splash.rvariance, 
                    Math.random() * CONST.shock.radius
            ))
        }
    }
    smallignite(x, y) {
        this.r = CONST.shock.radius / 4
        this.init(x, y)
    }
    proc() {
        this.poe -= this.poe * CONST.shock.step
    }
    draw(ctx) {
        const progress = 1 - this.poe

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.save()

        this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.poe + ')'
        this.ctx.lineWidth = 30 * progress
        drawCircle(this.ctx, this.canvas, this.r * progress)

        this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.poe + ')'
        fillCircle(this.ctx, this.canvas, this.r * .7 * progress)

        this.ctx.shadowColor = 'rgb(128, 255, 255)'
        this.ctx.shadowBlur = 10

        this.ctx.strokeStyle = 'rgb(255, 255, 255)'
        this.ctx.lineWidth = 40 * this.poe
        drawCircle(this.ctx, this.canvas, this.r * progress)

        this.ctx.lineWidth = 10 * this.poe
        drawCircle(this.ctx, this.canvas, this.r * .8 * progress)

        for (let i = 0; i < this.splashes.length; i++) {

            const desta = this.splashes[i].desta
            const destr = this.splashes[i].destr * progress
            const r = this.splashes[i].r * this.poe
            
            this.ctx.save()
            this.ctx.fillStyle = 'rgb(255, 255, 255)'

            this.ctx.translate(CONST.shock.radius, CONST.shock.radius)
            this.ctx.translate(destr * Math.sin(desta), destr * Math.cos(desta))
            this.ctx.rotate(Math.PI / 4)
            
            this.ctx.fillRect(-1*r, -1*r, 2*r, 2*r)
            
            this.ctx.restore()
        }

        this.ctx.restore()

        ctx.drawImage(this.canvas, this.x - this.canvas.width / 2, this.y - this.canvas.height / 2)
    }
}

function drawCircle(ctx, canvas, r) {
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.width / 2, r, 0, 2 * Math.PI)
    ctx.stroke()
}
function fillCircle(ctx, canvas, r) {
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.width / 2, r, 0, 2 * Math.PI)
    ctx.fill()
}

class Splash {
    constructor(r, destr) {
        this.desta = Math.random() * 2 * Math.PI
        this.destr = destr
        this.r = r
    }
}
