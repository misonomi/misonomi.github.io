import CONST from './const.js';

export default class {
    constructor() {
        this.image = document.getElementById('logo');
    }
    draw(ctx) {
        ctx.drawImage(this.image, CONST.logo.x, CONST.logo.y);
    }
}
