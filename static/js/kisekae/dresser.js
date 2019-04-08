const width = 30;
const height = 40;

export default class {
    constructor(image, x, y) {
        this.iamge = image;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y);
    }
    isOn(x, y) {
        return ((this.x <= x && x <= this.x + width) && (this.y <= y && y <= this.y + height));
    }
}
