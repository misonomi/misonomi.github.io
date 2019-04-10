const x = (1920 - 597) / 2;
const y = 700;

export default class {
    constructor() {
        this.image = document.getElementById('cts');
    }
    draw(ctx) {
        ctx.drawImage(this.image, x, y);
    }
}
