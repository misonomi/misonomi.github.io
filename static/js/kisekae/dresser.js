import { DRESS } from './kisekae/stat.js';
const width = 30;
const height = 40;
const pos = {
    miko: {
        x: 300,
        y: 300,
    },
}

export default class {
    constructor(dress) {
        this.iamge = document.getElementById('dresser_' + dress);
        this.diabled_image = document.getElementById('dresser_' + dress + '_disabled');
        this.dress = DRESS[dress];
        this.x = pos[dress].x;
        this.y = pos[dress].y;
        this.active = true;
    }
    clicked(x, y) {
        return ((this.x <= x && x <= this.x + width) && (this.y <= y && y <= this.y + height) && this.active);
    }
    clear() {
        this.active = false;
        this.image = this.diabled_image;
    }
    draw(ctx) {
        ctx.drawImage(this.iamge, this.x, this.y);
    }
}
