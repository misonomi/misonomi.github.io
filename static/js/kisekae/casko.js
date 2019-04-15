import { DRESS, FACE } from './stat.js';
const x = 0;
const y = 0;

export default class {
    constructor() {
        this.iamge = document.getElementById(DRESS.blue);
        this.face = document.getElementById(FACE.normal);
        this.x = x;
        this.y = y;
    }
    kisekae(image) {
        this.image = document.getElementById(image);
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y);
        ctx.drawImage(this.face, this.x + faceoffsetx, this.y + faceoffsety);
    }
}
