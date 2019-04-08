const x = (1920 - 597) / 2;
const y = 700;

export default class {
    constructor(image) {
        this.image = image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, x, y);
    }
}