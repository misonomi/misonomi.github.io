import { STAT, DRESS, DIFFIC } from './stat.js'
import CONST from './const.js'
import Shoji from './shoji.js'
import CTS from './cts.js'
import Logo from './logo.js'
import Fukidashi from './fukidashi.js'
import Dresser from './dresser.js'
import Tablet from './tablet.js'
import Shock from './shock.js'
import Inst from './inst.js'
import Sight from './sight.js'
import Conscience from './conscience.js'
import Break from './break.js'
import Casko from './casko.js'
import Cg from './cg.js'
import TFP from './tfp.js'
import Words from './words.js'
import Kirakira from './kirakira.js'
import AudioManager from './audio.js'

let stat = STAT.ready
let next_dress = DRESS.blue

export default class {
    constructor() {
        return (async () => {

            this.audio = new AudioManager()
    
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
            this.shock = new Shock()
            this.inst = new Inst()
            this.sight = new Sight()
            this.conscience = new Conscience()
    
            this.words = new Words()

            this.readyinit()
    
            return this
        })()
    }
    get_stat() {
        return stat
    }
    set_word(seq) {
        this.words.init(seq)
        this.update_word()
    }
    update_word() {
        this.fukidashi.set(this.words.text())
        this.casko.update(this.words.emote())
    }
    end_game() {
        this.stage--
        stat = STAT.show
    }

    dresser_ready() {
        const done_mk = this.dresser_miko.ready()
        const done_md = this.dresser_maid.ready()
        const done_mz = this.dresser_mizugi.ready()
        const done_gs = this.dresser_gymsuit.ready()
        const done_sr = this.dresser_sarashi.ready()

        return done_mk || done_md || done_mz || done_gs || done_sr
    }
    dresser_unready() {
        const done_md = this.dresser_miko.unready()
        const done_mk = this.dresser_maid.unready()
        const done_mz = this.dresser_mizugi.unready()
        const done_gs = this.dresser_gymsuit.unready()
        const done_sr = this.dresser_sarashi.unready()

        return done_mk || done_md || done_mz || done_gs || done_sr
    }

/////////////////// init methods

    readyinit() {
        this.set_word('ready')
        stat = STAT.ready
    }
    talkinit(seq) {
        this.set_word(seq)
        stat = STAT.pre_talk
    }
    selectinit() {
        this.set_word('select' + (this.stagenum - this.stage))
        stat = STAT.pre_select
    }
    gameinit() {
        this.break = new Break()
        this.kirakira = new Kirakira()

        this.sight.init()
        this.conscience.init()
        if (this.tablet.length > 0) { this.tablet[this.tablet.length - 1].calm() }
        stat = STAT.pre_game
    }
    cginit(name) {
        this.cg = new Cg(name)
        this.set_word('cg_'+ name)
        stat = STAT.pre_cg
    }
    edinit() {
        this.tfp = new TFP()
        stat = STAT.pre_ed
    }
    extracginit() {
        this.set_word('extracg')
        stat = STAT.pre_extracg
    }

/////////////////// click methods

    click_ready() {
        // FIXME store difficulty data itself
        this.stagenum = DIFFIC.normal.stagenum

        this.stage = this.stagenum
        
        for (let i = this.stage - 1; i >= 0; i--) {
            this.tablet.push(new Tablet(i))
        }

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

            case STAT.ed:
            this.edinit()
            break

            case null:
            this.update_word()
            break

            default:
            console.error('unexpected stat:')
        }
    }
    click_select(x, y) {
        if (this.dresser_miko.clicked(x, y)) {
            next_dress = DRESS.miko
        } else if (this.dresser_maid.clicked(x, y)) {
            next_dress = DRESS.maid
        } else if (this.dresser_mizugi.clicked(x, y)) {
            next_dress = DRESS.mizugi
        } else if (this.dresser_gymsuit.clicked(x, y)) {
            next_dress = DRESS.gymsuit
        } else if (this.dresser_sarashi.clicked(x, y)) {
            next_dress = DRESS.sarashi
        // if dresser is not clicked, dont proceed scene
        } else { return }
        stat = STAT.post_select
    }
    click_wait_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            stat = STAT.game
            console.log('[HIT]')
            this.shock.ignite(x, y)
        } else if (this.conscience.clicked(x, y)) {
            this.set_word('changing_' + next_dress)
            stat = STAT.monologue_game
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].is_broken()) {
                this.tablet.pop()
                this.inst.next()
                if (this.tablet.length === 0) {
                    if (next_dress === DRESS.sarashi) {
                        this.extracginit()
                    } else {
                        this.cginit(next_dress)
                    }
                } else {
                    stat = STAT.break_game
                }
            }
            console.log('[HIT]')
            this.shock.ignite(x, y)
        } else {
            this.shock.smallignite(x, y)
        }
    }
    click_mono_game() {
        if (this.words.next() == null) {
            this.update_word()
        } else {
            this.end_game()
        }
    }
    click_cg() {
        switch (this.words.next()) {
            case STAT.ed:
            stat = STAT.post_cg
            break
            
            case null:
            this.update_word()
            break

            default:
            console.error('unexpected stat:')
        }
    }

/////////////////// proc methods

    proc_ready() {
        this.fukidashi.proc(this.audio)
        this.clicktostart.proc()
    }

    ///////

    proc_pre_talk() {
        if (!this.shoji.open()) { return }
        
        stat = STAT.talk
    }
    proc_talk() {
        this.fukidashi.proc(this.audio)
    }

    ///////

    proc_pre_select() {
        if (this.stage <= 0) {
            if(this.tablet.length === this.stagenum) {
                this.talkinit('trueed')
            } else {
                this.talkinit('normaled')
            }
            return
        }
        const done_c = this.casko.dodge()
        const done_d = this.dresser_ready()
        if (!(done_c && done_d)) { return }
        
        stat = STAT.select
    }
    proc_select() {
        this.fukidashi.proc(this.audio)
    }
    proc_post_select() {
        const done_c = this.casko.dodge_back()
        const done_d = this.dresser_unready()
        if (!(done_c && done_d)) { return }
        
        this.talkinit('choose_' + next_dress)
    }

    ///////

    proc_pre_game() {
        if (!this.shoji.close()) { return }
        
        const done_t = this.sight.ready()
        const done_c = this.conscience.ready()
        if (!done_t || !done_c) { return }

        // post_gameだと間に合わない（着替えるのが見えてしまう）
        this.casko.kisekae(next_dress)
        stat = STAT.wait_game
    }
    proc_wait_game() {
        this.inst.proc()
    }
    proc_game() {
        if (this.tablet.length > 0) {
            this.tablet[this.tablet.length - 1].proc()
        }
        this.shock.proc()

        if (!this.sight.tick()) { return }

        this.end_game()
    }
    proc_mono_game() {
        this.fukidashi.proc(this.audio)
    }
    proc_break_game() {
        this.shock.proc()

        const done_t = this.sight.tick()
        const done_b = this.break.proc()
        if (!done_t || !done_b) { return }

        this.end_game()
    }

    ///////

    proc_show() {
        const done_k = this.kirakira.fadeout()
        const done_s = this.shoji.open()
        if (!done_k || !done_s) { return }

        this.talkinit(next_dress)
    }

    ///////

    proc_pre_cg() {
        const done_c = this.cg.pan()
        const done_k = this.kirakira.fadeout()
        const done_s = this.shoji.open()
        if (!done_c || !done_k || !done_s) { return }

        stat = STAT.cg
    }
    proc_cg() {
        this.fukidashi.proc(this.audio)
    }
    proc_post_cg() {
        if (!this.shoji.close()) { return }

        this.edinit()
    }

    ///////

    proc_pre_extracg() {
        if (!this.shoji.extraopen()) { return }

        stat = STAT.extracg
    }
    proc_extracg() {
        this.fukidashi.proc(this.audio)
    }

    ///////

    proc_pre_ed() {
        if (!this.shoji.close()) { return }

        if (!this.tfp.setup()) { return }

        stat = STAT.ed
    }
    proc_ed() {
        this.tfp.proc()
    }

/////////////////// draw methods

    draw_ready(ctx) {
        this.casko.draw(ctx)
        this.fukidashi.draw(ctx)
        this.shoji.draw(ctx)
        this.logo.draw(ctx)
        this.clicktostart.draw(ctx)
    }

    ///////

    draw_talk(ctx) {
        this.casko.draw(ctx)
        this.fukidashi.draw(ctx)
        this.shoji.draw(ctx)
    }

    ///////

    draw_select(ctx) {
        this.casko.draw(ctx)
        this.fukidashi.draw(ctx)
        this.shoji.draw(ctx)
        this.dresser_miko.draw(ctx)
        this.dresser_maid.draw(ctx)
        this.dresser_mizugi.draw(ctx)
        this.dresser_gymsuit.draw(ctx)
        this.dresser_sarashi.draw(ctx)
    }

    ///////

    draw_pre_game(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.sight.draw(ctx, this.tablet[this.tablet.length - 1].get_ap())
        this.conscience.draw(ctx)
    }
    draw_wait_game(ctx) {
        this.draw_game(ctx)
        this.inst.draw(ctx)
        this.conscience.draw(ctx)
    }
    draw_game(ctx) {
        this.shoji.draw(ctx)
        for (const t of this.tablet) {
            t.draw(ctx)
        }
        this.sight.draw(ctx, this.tablet[this.tablet.length - 1].get_ap())
        this.shock.draw(ctx)
    }
    draw_mono_game(ctx) {
        this.shoji.draw(ctx)
        for (const t of this.tablet) {
            t.draw(ctx)
        }
        this.fukidashi.draw(ctx)
    }
    draw_break_game(ctx) {
        this.shoji.draw(ctx)
        for (const t of this.tablet) {
            t.draw(ctx)
        }
        this.sight.draw(ctx, { full: 1, current: 0 })
        this.shock.draw(ctx)
        this.break.draw(ctx)
    }

    ///////

    draw_show(ctx) {
        this.casko.draw(ctx)
        this.kirakira.draw(ctx)
        this.shoji.draw(ctx)
    }

    ///////

    draw_pre_cg(ctx) {
        this.cg.draw(ctx)
        this.kirakira.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_cg(ctx) {
        this.cg.draw(ctx)
        this.fukidashi.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_post_cg(ctx) {
        this.cg.draw(ctx)
        this.shoji.draw(ctx)
    }

    //////
    
    draw_pre_extracg(ctx) {
        this.shoji.extradraw(ctx)

    }
    draw_extracg(ctx) {
        this.shoji.draw(ctx)
        this.fukidashi.draw(ctx)
    }

    ///////

    draw_pre_ed(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
        this.tfp.draw(ctx)
    }
    draw_ed(ctx) {
        this.shoji.draw(ctx)
        this.tfp.draw(ctx)
    }

    ///////
    
}
