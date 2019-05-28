import CONST from './const.js'
import { DRESS, FACE } from './stat.js'

export default class {
    constructor() {
        this.image = new Image(); this.image.src = './images/assembleicon.png'
        this.kisekae(DRESS.blue)
        this.update(FACE.normal)
        this.x = CONST.casko.x
        this.y = CONST.casko.y
    }
    kisekae(dress) {
        console.log('kisekae to ' + dress)
        this.dress = dress
        this.image.src = './images/kisekae/casko/' + this.dress + '_' + FACE.normal + '.png'
    }
    update(face) {
        if ((typeof face != 'undefined') && (this.face != face)) {
            this.face = face
            this.image.src = './images/kisekae/casko/' + this.dress + '_' + this.face + '.png'
        }
    }
    dodge() {
        if (this.x > CONST.casko.dodged_x) {
            this.x -= CONST.casko.dodge_step
            return false
        } else {
            this.x = CONST.casko.dodged_x
            return true
        }
    }
    dodge_back() {
        if (this.x < CONST.casko.x) {
            this.x += CONST.casko.dodge_step
            return false
        } else {
            this.x = CONST.casko.x
            return true
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
