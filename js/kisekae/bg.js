import CONST from './const.js'
import ImageLorder from './image.js'

export default class {
    constructor() {
        return (async () => {
            let image = await ImageLorder('./images/kisekae/background.png')
            this.canvas = document.createElement('canvas')
            let ctx = this.canvas.getContext('2d')
            this.canvas.width = image.width
            this.canvas.height = image.height
        
            ctx.drawImage(image, 0, 0)

            return this
        })()
    }
    draw(ctx) {
        ctx.drawImage(this.canvas, 0, 0)
    }
    blanc(ctx) {
        ctx.save()
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillRect(0, 0, CONST.originalx, CONST.originaly)
        ctx.restore()
    }
}