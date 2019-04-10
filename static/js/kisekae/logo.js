const x = 1300;
const y = 100;

export default class {
    constructor() {
        this.image = document.getElementById('logo');
    }
    draw(ctx) {
        ctx.drawImage(this.image, x, y);
    }
}
