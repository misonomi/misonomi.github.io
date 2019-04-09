import CONST from './const.js';
const shojix = 658;
const leftc = (CONST.originalx / 2) - shojix;
const lefto = leftc - shojix; 
const rightc = CONST.originalx / 2;
const righto = rightc + shojix;

const step = 20;

export default class {
    constructor(image) {
        this.left = image;
        this.right = image;
        this.init();
    }
    init() {
        this.leftx = lefto;
        this.rightx = righto;
    }
    draw(ctx) {
        ctx.drawImage(this.left, this.leftx, 0);
        ctx.drawImage(this.right, this.rightx, 0);
    }
    open() {
        if ((this.leftx > lefto) && (this.rightx < righto)) {
            this.leftx -= step;
            this.rightx += step;
            return true;
        } else {
            this.leftx = lefto;
            this.rightx = righto;
            return false;
        }
    }
    close() {
        if ((this.leftx < leftc) && (this.rightx > rightc)) {
            this.leftx += step;
            this.rightx -= step;
            return true;
        } else {
            this.leftx = leftc;
            this.rightx = rightc;
            return false;
        }
    }
}
