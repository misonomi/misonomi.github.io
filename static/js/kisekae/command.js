import { STAT, DRESS } from './stat.js'
import Shoji from './shoji.js'
import CTS from './cts.js'
import Logo from './logo.js'
import Fukidashi from './fukidashi.js'
import Dresser from './dresser.js'
import Tablet from './tablet.js'
import Inst from './inst.js'
import Timer from './timer.js'
import Casko from './casko.js'
import Cg from './cg.js'
import Words from './words.js'
import Kirakira from './kirakira.js'

let stage = 3
let stat = STAT.ready
let next_dress = DRESS.blue

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
        this.timer = new Timer()

        this.words = new Words()

        this.kirakira = new Kirakira()

        this.readyinit()
    }
    get_stat() {
        return stat
    }
    set_word(seq) {
        this.words.init(seq)
        this.fukidashi.set(this.words.text())
        this.casko.update(this.words.emote())
    }

    dresser_ready() {
        const a = this.dresser_miko.ready()
        const b = this.dresser_maid.ready()
        const c = this.dresser_mizugi.ready()
        const d = this.dresser_gymsuit.ready()
        const e = this.dresser_sarashi.ready()

        return a || b || c || d || e
    }
    dresser_unready() {
        const a = this.dresser_miko.unready()
        const b = this.dresser_maid.unready()
        const c = this.dresser_mizugi.unready()
        const d = this.dresser_gymsuit.unready()
        const e = this.dresser_sarashi.unready()

        return a || b || c || d || e
    }

///////////////////

    readyinit() {
        stat = STAT.ready
        this.set_word('ready')
    }
    talkinit(seq) {
        stat = STAT.talk
        this.set_word(seq)
    }
    talkinit_choose(seq) {
        this.talkinit('choose_' + seq)
    }
    selectinit() {
        stat = STAT.pre_select
        this.set_word('select')
    }
    gameinit() {
        this.timer.init()
        this.kirakira.init()
        stat = STAT.pre_game
    }
    cginit(name) {
        this.cg = new Cg(name)
        this.set_word('ed_'+ name)
        stat = STAT.pre_cg
    }

///////////////////

    click_ready() {
        this.talkinit('intro')
    }
    click_talk() {
        switch (this.words.next()) {
            case STAT.ready:
            this.readyinit()
            break

            case STAT.select:
            this.selectinit()
            break

            case STAT.game:
            this.gameinit()
            break

            case null:
            this.fukidashi.set(this.words.text())
            this.casko.update(this.words.emote())

            default:
            console.log('unexpected stat:')
        }
    }
    click_select(x, y) {
        if (this.dresser_miko.clicked(x, y)) {
            next_dress = DRESS.miko
            stat = STAT.post_select
        }
        if (this.dresser_maid.clicked(x, y)) {
            next_dress = DRESS.maid
            stat = STAT.post_select
        }
        if (this.dresser_mizugi.clicked(x, y)) {
            next_dress = DRESS.mizugi
            stat = STAT.post_select
        }
        if (this.dresser_gymsuit.clicked(x, y)) {
            next_dress = DRESS.gymsuit
            stat = STAT.post_select
        }
        if (this.dresser_sarashi.clicked(x, y)) {
            next_dress = DRESS.sarashi
            stat = STAT.post_select
        }
    }
    click_wait_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            this.tablet[this.tablet.length - 1].break()
            stat = STAT.game
            console.log('[HIT]')
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].break()) {
                stage--
                this.tablet.pop()
                stat = STAT.post_game
            }
            console.log('[HIT]')
        }
    }
    click_cg() {
        switch (this.words.next()) {
            case STAT.talk:
            this.talkinit('outro')
            
            case null:
            this.fukidashi.set(this.words.text())
            this.casko.update(this.words.emote())

            default:
            console.log('unexpected stat:')
        }
    }

///////////////////

    proc_ready() {
        this.fukidashi.escapement()
    }
    proc_talk() {
        this.fukidashi.escapement()
    }
    proc_select() {
        this.fukidashi.escapement()
    }
    proc_game() {
        this.tablet[this.tablet.length - 1].proc()

        if (this.timer.tick()) {
            stage--
            stat = STAT.post_game
        }
    }

    ///////////////

    proc_pre_select() {
        if (stage <= 0) {
            this.talkinit('outro')
            return
        }
        const a = this.casko.dodge()
        const b = this.dresser_ready()

        if (a && b) {
            stat = STAT.select
        }
    }
    proc_post_select() {
        const a = this.casko.dodge_back()
        const b = this.dresser_unready()
        if (a && b) {
            this.talkinit_choose(next_dress)
        }
    }
    proc_pre_game() {
        if (this.shoji.close()) {
            stat = STAT.wait_game
        }
    }
    proc_wait_game() {

    }
    proc_post_game() {
        const a = this.shoji.open()
        const b = this.kirakira.fadeout()
        if (a && b) {
            // 鍵を壊し切った場合
            if (this.tablet.length <= 0) {
                this.cginit(next_dress)
            } else {
                this.talkinit(next_dress)
            }
        }
    }
    proc_pre_cg() {
        if (this.cg.pan()) {
            stat = STAT.cg
        }
    }

///////////////////

    draw_ready(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.fukidashi.draw(ctx)
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
    draw_pre_select(ctx) {
        this.draw_select(ctx)
    }
    draw_post_select(ctx) {
        this.draw_select(ctx)
    }
    draw_pre_game(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_wait_game(ctx) {
        this.draw_game(ctx)
        this.inst.draw(ctx)
    }
    draw_post_game(ctx) {
        if (this.tablet.length > 0) {
            this.casko.draw(ctx)
        }
        this.kirakira.draw(ctx)
        this.shoji.draw(ctx)
    }
}
