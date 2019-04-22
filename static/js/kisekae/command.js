import { STAT, DRESS } from './stat.js'
import CONST from './const.js'
import Shoji from './shoji.js'
import CTS from './cts.js'
import Logo from './logo.js'
import Fukidashi from './fukidashi.js'
import Dresser from './dresser.js'
import Tablet from './tablet.js'
import Inst from './inst.js'
import Casko from './casko.js'
import Cg from './cg.js'
import Words from './words.js'

let stage = 3
let stat = STAT.ready

export default class {
    constructor() {
        this.casko = new Casko()

        this.shoji = new Shoji()
        this.clicktostart = new CTS()
        this.logo = new Logo()
        this.fukidashi = new Fukidashi()

        this.dresser_miko = new Dresser(DRESS.miko)
        this.dresser_maid = new Dresser(DRESS.maid)
        this.dresser_mizugi = new Dresser(DRESS.mizugi)
        this.dresser_gymsuit = new Dresser(DRESS.gymsuit)
        this.dresser_sarashi = new Dresser(DRESS.sarashi)

        this.tablet = []
        for (let i = stage - 1; i >= 0; i--) {
            this.tablet.push(new Tablet(i))
        }
        this.inst = new Inst()

        this.words = new Words()

        this.next_dress = DRESS.blue
    }
    get_stat() {
        return stat
    }

    talkinit(seq) {
        stat = STAT.talk
        this.talkframe = CONST.talk_interval
        this.words.init(seq)
        this.fukidashi.set(this.words.text())
        this.casko.update(this.words.emote())
    }
    talkinit_choose(seq) {
        this.talkinit('choose_' + seq)
    }
    selectinit() {
        stat = STAT.select
        this.talkframe = CONST.talk_interval
        this.words.init('select')
        this.fukidashi.set(this.words.text())
        this.casko.update(this.words.emote())
    }
    gameinit() {
        stat = STAT.pre_game
    }
    cginit(name) {
        this.cg = new Cg(name)
        this.words.init(name)
        this.fukidashi.set(this.words.text())
        stat = STAT.pre_cg
    }

///////////////////

    click_ready() {
        this.talkinit('intro')
    }
    click_talk() {
        switch (this.words.next()) {
            case STAT.ready:
                stat = STAT.init
                break

            case STAT.select:
                this.selectinit()
                break

            case STAT.game:
                this.gameinit()
                break

            default:
                stat = STAT.talk
                this.fukidashi.set(this.words.text())
                this.casko.update(this.words.emote())
        }
    }
    click_select(x, y) {
        if (this.dresser_miko.clicked(x, y)) {
            this.next_dress = DRESS.miko
            this.talkinit_choose(this.next_dress)
        }
        if (this.dresser_maid.clicked(x, y)) {
            this.next_dress = DRESS.maid
            this.talkinit_choose(this.next_dress)
        }
        if (this.dresser_mizugi.clicked(x, y)) {
            this.next_dress = DRESS.mizugi
            this.talkinit_choose(this.next_dress)
        }
        if (this.dresser_gymsuit.clicked(x, y)) {
            this.next_dress = DRESS.gymsuit
            this.talkinit_choose(this.next_dress)
        }
        if (this.dresser_sarashi.clicked(x, y)) {
            this.next_dress = DRESS.sarashi
            this.talkinit_choose(this.next_dress)
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].break()) {
                stage--
                this.tablet.pop()
                if (this.tablet.length <= 0) {
                    this.cginit(this.next_dress)
                } else {
                    stat = STAT.post_game
                }
            }
            console.log('[HIT]')
        }
    }
    click_cg() {
        switch (this.words.next()) {
            case null:
                this.fukidashi.set(this.words.text())
                this.casko.update(this.words.emote())
            
            default:
                this.talkinit('outro')
        }
    }

///////////////////

    proc_talk() {
        this.talkframe--
        if (this.talkframe < 0) {
            this.fukidashi.escapement()
            this.talkframe = CONST.talk_interval
        }
    }
    proc_select() {
        if (stage <= 0) {
            this.talkinit('outro')
            return
        }
        this.proc_talk()
    }
    proc_game() {
        if (stage <= 0) {
            this.talkinit('outro')
            return
        }
        
        this.tablet[this.tablet.length - 1].proc()

        this.timer++
        if (this.timer > CONST.timelimit) {
            stage--
            stat = STAT.post_game
        }
    }
    proc_pre_game() {
        if (!this.shoji.close()) {
            stat = STAT.game
        }
    }
    proc_post_game() {
        if (!this.shoji.open()) {
            this.talkinit(this.next_dress)
        }
    }
    proc_pre_cg() {
        if (!this.cg.pan()) {
            stat = STAT.cg
        }
    }

///////////////////

    draw_ready(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.logo.draw(ctx)
        this.clicktostart.draw(ctx)
    }
    draw_talk(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.fukidashi.draw(ctx)
    }
    draw_select(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.fukidashi.draw(ctx)
        this.dresser_miko.draw(ctx)
        this.dresser_maid.draw(ctx)
        this.dresser_mizugi.draw(ctx)
        this.dresser_gymsuit.draw(ctx)
        this.dresser_sarashi.draw(ctx)
    }
    draw_game(ctx) {
        this.shoji.draw(ctx)
        for (const t of this.tablet) {
            t.draw(ctx)
        }
    }
    draw_cg(ctx) {
        this.cg.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_pre_game(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_post_game(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
    }
}
