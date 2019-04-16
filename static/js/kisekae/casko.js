import CONST from './const.js'
import { DRESS, FACE } from './stat.js'

export default class {
    constructor() {
        this.dress = DRESS.blue
        this.face = FACE.normal
        this.image = document.getElementById('casko_' + this.dress + '_' + this.face)
        this.x = CONST.casko.x
        this.y = CONST.casko.y
    }
    kisekae(dress) {
        this.dress = dress
    }
    update(face) {
        if ((typeof face != 'undefined') && (this.face != face)) {
            this.face = face
            this.image = document.getElementById('casko_' + this.dress + '_' + this.face)
        }
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y)
    }
}
