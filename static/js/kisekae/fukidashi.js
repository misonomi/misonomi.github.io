import WORDS from './words.js';
const x = 10;
const y = 800;
const margin = 30;

export default class {
    constructor() {
        this.image = document.getElementById('fukidashi');
        this.sequence = [];
        this.seqptr = 0;
        this.char = 0;
    }
    init(seq) {
        this.sequence = WORDS[seq];
        this.seqptr = 0;
        this.char = 0;
    }
    next() {
        this.seqptr++;
        this.char = 0;
        if (this.seqptr <= this.sequence.lines.length) {
            return this.sequence.next;
        }
    }
    frame() {
        if  (this.char < this.sequence.lines[this.seqptr].length) {
            this.char++;
        }
    }
    draw(ctx) {
        ctx.drawImage(image, x, y);
        ctx.fillText(this.sequence.lines[this.seqptr].substr(0, this.char), x + margin, y + margin);
    }
}
