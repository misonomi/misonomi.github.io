export default class {
    constructor(image) {
        this.left = image;
        this.right = image;

        this.leftx = 20;
        this.rightx = 800;
    }
    draw(ctx) {
        ctx.drawImage(left, leftx, 0);
        ctx.drawImage(right, rightx, 0);
    }
}