import WORDS from './words.js';
const x = 100;
const y = 680;
const marginx = 100;
const marginy = 150;

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
        console.log(this.sequence);
    }
    next() {
        this.seqptr++;
        this.char = 0;
        console.log(this.seqptr +","+ this.sequence.lines.length);
        if (this.seqptr >= this.sequence.lines.length) {
            return this.sequence.next;
        }
    }
    frame() {
        if  (this.char < this.sequence.lines[this.seqptr].length) {
            this.char++;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, x, y);
        ctx.fillText(this.sequence.lines[this.seqptr].substr(0, this.char), x + marginx, y + marginy);
    }
}
