import WORDS from './words.js';
const x = 10;
const y = 800;
const margin = 30;

export default class {
    constructor(image) {
        this.image = image;
        this.sequence = [];
        this.seqlen = 0;
        this.seqptr = 0;
        this.char = 0;
    }
    init(seq) {
        this.sequence = WORDS.eval(seq);
        this.seqlen = sequence.length;
        this.seqptr = 0;
        this.char = 0;
    }
    next() {
        this.seqptr++;
        this.char = 0;
        return this.seqptr <= this.seqlen;
    }
    frame() {
        if  (this.char < this.sequence[this.seqptr].length) {
            this.char++;
        }
    }
    draw(ctx) {
        ctx.drawImage(image, x, y);
        ctx.fillText(this.sequence[this.seqptr].substr(0, this.char), x + margin, y + margin);
    }
}
