const x = 10;
const y = 800;
const margin = 30;

export default class {
    constructor() {
        this.text = "";
    }
    draw(ctx) {
        ctx.drawImage(this.left, x, y);
        ctx.fillText(this.text, x + margin, y + margin);
    }
}