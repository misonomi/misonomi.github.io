import CONST from './const.js';

export default class {
    constructor() {
        this.image = document.getElementById('cts');
        this.x = (CONST.originalx - image.width) / 2;
        this.y = CONST.cts.y;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}
