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
const timelimit = 1000;
const talk_interval = 12;

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
        this.dresser_gymsuit = new Dresser(DRESS.gymsuit);
        this.dresser_sarashi = new Dresser(DRESS.sarashi);

        this.tablet = [
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
        this.talkframe = talk_interval;
        this.fukidashi.init(seq);
    }
    talkinit_choose(seq) {
        this.talkinit('choose_' + seq);
    }
    selectinit() {
        stat = STAT.select;
        this.talkframe = talk_interval;
        this.fukidashi.init('select');
    }
    gameinit() {
        stat = STAT.pre_game;
    }

///////////////////

    click_ready() {
        this.talkinit('intro');
    }
    click_talk() {
        let next = this.fukidashi.next();
        if (!next) { return; }
        switch (next) {
            case STAT.init:
                stat = STAT.init;
                break;

            case STAT.select:
                this.selectinit();
                break;

            case STAT.game:
                this.gameinit();
                break;

            default:
                stat = STAT.talk;
        }
    }
    click_select(x, y) {
        if (this.dresser_miko.clicked(x, y)) {
            this.next_dress = DRESS.miko;
            this.talkinit_choose(this.next_dress);
        }
        if (this.dresser_maid.clicked(x, y)) {
            this.next_dress = DRESS.maid;
            this.talkinit_choose(this.next_dress);
        }
        if (this.dresser_bikini.clicked(x, y)) {
            this.next_dress = DRESS.bikini;
            this.talkinit_choose(this.next_dress);
        }
        if (this.dresser_gymsuit.clicked(x, y)) {
            this.next_dress = DRESS.gymsuit;
            this.talkinit_choose(this.next_dress);
        }
        if (this.dresser_sarashi.clicked(x, y)) {
            this.next_dress = DRESS.sarashi;
            this.talkinit_choose(this.next_dress);
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].break()) {
                cleared++;
                this.tablet.pop();
                this.talkinit(this.next_dress);
            }
            console.log('[HIT]')
        }
    }
    click_cg() {
        this.talkinit('outro');
    }

///////////////////

    proc_talk() {
        this.talkframe--;
        if (this.talkframe < 0) {
            this.fukidashi.frame();
            this.talkframe = talk_interval;
        }
    }
    proc_select() {
        if (this.tablet.length <= 0) {
            this.talkinit('outro');
            return;
        }
        this.proc_talk();
    }
    proc_game() {
        if (this.tablet.length <= 0) {
            this.talkinit('outro');
            return;
        }
        
        this.tablet[this.tablet.length - 1].frame();

        this.timer++;
        if (this.timer > timelimit) {
            stat = STAT.post_game;
        }
    }
    proc_pre_game() {
        if (!this.shoji.close()) {
            stat = STAT.game;
        }
    }
    proc_post_game() {
        if (!this.shoji.close()) {
            this.talkinit(this.next_dress);
        }
    }

///////////////////

    draw_ready(ctx) {
        this.casko.draw(ctx);
        this.shoji.draw(ctx);
        this.logo.draw(ctx);
        this.clicktostart.draw(ctx);
    }
    draw_talk(ctx) {
        this.casko.draw(ctx);
        this.shoji.draw(ctx);
        this.fukidashi.draw(ctx);
    }
    draw_select(ctx) {
        this.casko.draw(ctx);
        this.shoji.draw(ctx);
        this.fukidashi.draw(ctx);
        this.dresser_miko.draw(ctx);
        this.dresser_maid.draw(ctx);
        this.dresser_bikini.draw(ctx);
        this.dresser_gymsuit.draw(ctx);
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
    draw_pre_game(ctx) {
        this.casko.draw(ctx);
        this.shoji.draw(ctx);
    }
    draw_post_game(ctx) {
        this.casko.draw(ctx);
        this.shoji.draw(ctx);
    }
}
