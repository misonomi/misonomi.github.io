import CONST from './const.js';

export default class {
    constructor() {
        this.iamge = document.getElementById("caasko_blue_normal");
        this.x = CONST.casko.x;
        this.y = CONST.casko.y;
    }
    kisekae(image) {
        this.image = document.getElementById(image);
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y);
    }
}
