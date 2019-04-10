import CONST from './const.js';
const x = CONST.originalx / 2;
const y = 400;
const width = 30;
const height = 30;
const intervaly = 100;
const ap = 30;
const interval = 30;

export default class {
    constructor(id) {
        this.image = document.getElementById('tablet');
        this.x = x;
        this.y = y + (intervaly * id);
        this.ap = ap;
        this.interval = interval;
    }
    clicked(x, y) {
        if (this.interval <= 0) {
            this.interval = interval;
            return (this.x <= x && x <= this.x + width) && (this.y <= y && y <= this.y + height);
        } else {
            return false;
        }
    }
    break() {
        return --this.ap < 0;
    }
    frame() {
        if (this.interval > 0) {
            this.interval--;
        } 
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}
