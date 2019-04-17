import CONST from './const.js'
import { DRESS, FACE } from './stat.js'

export default class {
    constructor() {
        this.image = new Image();
        this.kisekae(DRESS.blue)
        this.update(FACE.normal)
        this.x = CONST.casko.x
        this.y = CONST.casko.y
    }
    kisekae(dress) {
        this.dress = dress
    }
    update(face) {
        if ((typeof face != 'undefined') && (this.face != face)) {
            this.face = face
            this.image.src = '../../images/kisekae/casko/' + this.dress + '_' + this.face + '.png'
        }
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y)
    }
}
