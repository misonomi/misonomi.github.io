import { STAT } from './stat.js';
import Shoji from './shoji.js';
import CTS from './cts.js';
import Logo from './logo.js';
import Fukidashi from './fukidashi.js';

export default class {
    constructor() {
        this.shoji = new Shoji(document.getElementById('shoji'));
        this.clicktostart = new CTS(document.getElementById('cts'));
        this.logo = new Logo(document.getElementById('logo'));
        this.fukidashi = new Fukidashi(document.getElementById('fukidashi'));

        this.stat = STAT.ready;
    }
    getStat() {
        return this.stat;
    }
    click(x, y) {
        switch(this.stat) {
            case STAT.ready:
                this.stat = STAT.talk;
                this.fukidashi.init('first');
                break;
            case STAT.game:
                this.stat = STAT.ready;
                break;
            case STAT.talk:
                if (!this.fukidashi.next()) {
                    this.stat = STAT.game;
                }
            default:
        }
    }

///////////////////

    proc_talk() {
        this.fukidashi.frame();
    }

///////////////////

    draw_ready(ctx) {
        this.shoji.draw(ctx);
        this.logo.draw(ctx);
        this.clicktostart.draw(ctx);
    }
    draw(ctx) {
        this.shoji.draw(ctx);
    }
    draw_talk(ctx) {
        this.shoji.draw(ctx);
        this.fukidashi.draw(ctx);
    }
}
