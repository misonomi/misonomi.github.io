import { DRESS, FACE } from './stat.js';
const faceoffsetx = 10;
const faceoffsety = 10;
const x = 0;
const y = 0;

export default class {
    constructor() {
        this.iamge = document.getElementById(DRESS.blue);
        this.face = document.getElementById(FACE.normal);
        this.x = x;
        this.y = y;
    }
    kisekae(dress) {
        this.image = document.getElementById(dress);
    }
    change_face(face) {
        this.image = document.getElementById(face);
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y);
        ctx.drawImage(this.face, this.x + faceoffsetx, this.y + faceoffsety);
    }
}
