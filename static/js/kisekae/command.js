import { STAT, DRESS } from './stat.js';
import Shoji from './shoji.js';
import CTS from './cts.js';
import Logo from './logo.js';
import Fukidashi from './fukidashi.js';
import Dresser from './dresser.js';
import Tablet from './tablet.js';
import Casko from './casko.js';

let cleared = 0;
let stat = STAT.ready;

export default class {
    constructor() {
        this.casko = new Casko();

        this.shoji = new Shoji();
        this.clicktostart = new CTS();
        this.logo = new Logo();
        this.fukidashi = new Fukidashi();

        this.dresser_miko = new Dresser(DRESS.miko);
        this.dresser_maid = new Dresser(DRESS.maid);
        this.dresser_bikini = new Dresser(DRESS.bikini);
        this.dresser_wasureta = new Dresser(DRESS.wasureta);
        this.dresser_sarashi = new Dresser(DRESS.sarashi);

        this.tablet = [
            new Tablet(4),
            new Tablet(3),
            new Tablet(2),
            new Tablet(1),
            new Tablet(0),
        ]

        this.next_dress = DRESS.blue;
    }
    getStat() {
        return stat;
    }

    talkinit(seq) {
        stat = STAT.talk;
        this.fukidashi.init(seq);
    }
    talkinit_choose(seq) {
        talkinit('choose_' + seq);
    }

///////////////////

    click_ready() {
        talkinit('intro');
    }
    click_talk() {
        let next = this.fukidashi.next();
        if (next) { stat = next; }
    }
    click_select(x, y) {
        if (this.dresser_miko.isOn(x, y)) {
            this.next_dress = DRESS.miko;
            talkinit_choose(this.next_dress);
        }
        if (this.dresser_maid.isOn(x, y)) {
            this.next_dress = DRESS.maid;
            talkinit_choose(this.next_dress);
        }
        if (this.dresser_bikini.isOn(x, y)) {
            this.next_dress = DRESS.bikini;
            talkinit_choose(this.next_dress);
        }
        if (this.dresser_wasureta.isOn(x, y)) {
            this.next_dress = DRESS.wasureta;
            talkinit_choose(this.next_dress);
        }
        if (this.dresser_sarashi.isOn(x, y)) {
            this.next_dress = DRESS.sarashi;
            talkinit_choose(this.next_dress);
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].break()) {
                cleared++;
                this.tablet.pop();
                talkinit(this.next_dress);
            }
        }
        stat = STAT.ready;
    }
    click_cg() {
        talkinit('outro');
    }

///////////////////

    proc_talk() {
        this.fukidashi.frame();
    }
    proc_select() {
        if (this.tablet.length <= 0) {
            talkinit('outro');
        }
    }
    proc_game() {
        if (this.tablet.length <= 0) {
            talkinit('outro');
        }
        this.tablet[this.tablet.length - 1].frame();

        this.timer++;
        if (this.timer > timelimit) {
            talkinit(this.next);
        }
    }

///////////////////

    draw_ready(ctx) {
        this.shoji.draw(ctx);
        this.logo.draw(ctx);
        this.clicktostart.draw(ctx);
    }
    draw_talk(ctx) {
        this.shoji.draw(ctx);
        this.fukidashi.draw(ctx);
    }
    draw_select(ctx) {
        this.shoji.draw(ctx);
        this.fukidashi.draw(ctx);
        this.dresser_miko.draw(ctx);
        this.dresser_maid.draw(ctx);
        this.dresser_bikini.draw(ctx);
        this.dresser_wasureta.draw(ctx);
        this.dresser_sarashi.draw(ctx);
    }
    draw_game(ctx) {
        this.shoji.draw(ctx);
        for (const t of this.tablet) {
            t.draw(ctx);
        }
    }
    draw_cg(ctx) {
        this.shoji.draw(ctx);
    }
}
