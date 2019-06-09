import CONST from './const.js'

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.originaly

        this.splashes = []
        this.poe = 1.
        for (let i = 0; i < CONST.kirakira.brightness; i++) {
            this.splashes.push(new Splash())
        }
    }
    fadeout() {
        if (this.poe > 0) {
            this.poe -= CONST.kirakira.step
            return false
        } else {
            this.poe = 0
            return true
        }
    }
    draw(ctx) {
        const centerx = this.canvas.width / 2
        const centery = this.canvas.height / 2
        const progress = 1. - this.poe

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.save()

        this.ctx.shadowColor = 'rgb(255, 255, 255)'
        this.ctx.shadowBlur = 10

        let grad = this.ctx.createRadialGradient(centerx, centery, 0, centerx, centery, this.canvas.width / 2)
        // -----
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)')
        grad.addColorStop(Math.max(0, -.3 + progress * 1.3), 'rgba(0, 0, 0, ' + this.poe + ')')
        grad.addColorStop(progress, 'rgba(250, 200, 200, 1)')
        grad.addColorStop(.3 + .7 * progress, 'rgba(255, 128, 128, ' + progress +')')
        grad.addColorStop(1, 'rgba(128, 255, 255, 1)')
        // ------
        this.ctx.fillStyle = grad
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.globalCompositeOperation = 'xor'
        this.ctx.fillStyle = 'rgba(128, 255, 200,' + this.poe + ')'
        for (let i = 0; i < this.splashes.length; i++) {
            const r = this.splashes[i].r * progress
            this.ctx.save()

            this.ctx.translate(this.splashes[i].x, this.splashes[i].y)
            this.ctx.rotate(Math.PI / 4)
            
            this.ctx.fillRect(-1*r, -1*r, 2*r, 2*r)
            
            this.ctx.restore()
        }

        this.ctx.globalCompositeOperation = 'overlay'
        this.ctx.strokeStyle = 'rgb(255, 255, 255)'
        this.ctx.lineWidth = 2
        this.ctx.beginPath()
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 850 * progress, 0, 2 * Math.PI)
        this.ctx.stroke()

        this.ctx.restore()

        ctx.drawImage(this.canvas, 0, 0)
    }
}

class Splash {
    constructor() {
        this.x = Math.random() * CONST.originalx
        this.y = Math.random() * CONST.originaly
        this.r = CONST.kirakira.rmin + Math.random() * CONST.kirakira.rvariance
    }
}
