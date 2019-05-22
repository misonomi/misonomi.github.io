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
import Timer from './timer.js'
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
            this.timer = new Timer()
    
            this.words = new Words()
    
            this.kirakira = new Kirakira()

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

    dresser_ready() {
        const finish_mk = this.dresser_miko.ready()
        const finish_md = this.dresser_maid.ready()
        const finish_mz = this.dresser_mizugi.ready()
        const finish_gs = this.dresser_gymsuit.ready()
        const finish_sr = this.dresser_sarashi.ready()

        return finish_mk || finish_md || finish_mz || finish_gs || finish_sr
    }
    dresser_unready() {
        const finish_md = this.dresser_miko.unready()
        const finish_mk = this.dresser_maid.unready()
        const finish_mz = this.dresser_mizugi.unready()
        const finish_gs = this.dresser_gymsuit.unready()
        const finish_sr = this.dresser_sarashi.unready()

        return finish_mk || finish_md || finish_mz || finish_gs || finish_sr
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
        this.kirakira.init()
        this.timer.init()
        if (this.tablet.length > 0) { this.tablet[this.tablet.length - 1].calm() }
        stat = STAT.pre_game
    }
    cginit(name) {
        this.cg = new Cg(name)
        this.set_word('ed_'+ name)
        stat = STAT.pre_cg
    }
    edinit() {
        this.tfp = new TFP()
        stat = STAT.pre_ed
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
            console.log('unexpected stat:')
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
        }
    }
    click_game(x, y) {
        if (this.tablet[this.tablet.length - 1].clicked(x, y)) {
            if (this.tablet[this.tablet.length - 1].is_broken()) {
                this.tablet.pop()
                this.inst.next()
                this.timer.end()
            }
            console.log('[HIT]')
            this.shock.ignite(x, y)
        } else {
            this.shock.smallignite(x, y)
        }
    }
    click_cg() {
        switch (this.words.next()) {
            case STAT.talk:
            stat = STAT.post_cg
            break

            case STAT.ready:
            this.readyinit()
            break
            
            case null:
            this.update_word()
            break

            default:
            console.log('unexpected stat:')
        }
    }
    click_ed() {
        stat = STAT.ready
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
            this.talkinit('outro')
            return
        }
        const finish_c = this.casko.dodge()
        const finish_d = this.dresser_ready()
        if (!(finish_c && finish_d)) { return }
        
        stat = STAT.select
    }
    proc_select() {
        this.fukidashi.proc(this.audio)
    }
    proc_post_select() {
        const finish_c = this.casko.dodge_back()
        const finish_d = this.dresser_unready()
        if (!(finish_c && finish_d)) { return }
        
        this.talkinit('choose_' + next_dress)
    }

    ///////

    proc_pre_game() {
        if (!this.shoji.close()) { return }
        
        if (!this.timer.ready()) { return }

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

        if (!this.timer.tick()) { return }

        this.stage--
        console.log('kisekae to ' + next_dress)
        this.casko.kisekae(next_dress)
        stat = STAT.post_game
    }
    proc_post_game() {
        this.shock.proc()

        const finish_s = this.shoji.open()
        const finish_k = this.kirakira.fadeout()
        if (!(finish_s && finish_k)) { return }

        // 鍵を壊し切った場合
        if (this.tablet.length <= 0) {
            this.cginit(next_dress)
        } else {
            this.talkinit(next_dress)
        }
    }

    ///////

    proc_pre_cg() {
        if (!this.cg.pan()) { return }

        stat = STAT.cg
    }
    proc_cg() {
        this.fukidashi.proc(this.audio)
    }
    proc_post_cg() {
        if (!this.shoji.close()) { return }

        new Promise((resolve) => setTimeout(resolve, CONST.cg.wait))
        .then(() => {
            this.talkinit('outro')
        })
    }

    ///////

    proc_pre_ed() {
        if (!this.shoji.close()) { return }

        if (!this.TFP.setup()) { return }

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
        this.timer.draw(ctx)
    }
    draw_wait_game(ctx) {
        this.draw_game(ctx)
        this.inst.draw(ctx)
    }
    draw_game(ctx) {
        this.shoji.draw(ctx)
        for (const t of this.tablet) {
            t.draw(ctx)
        }
        this.timer.draw(ctx)
        this.shock.draw(ctx)
    }
    draw_post_game(ctx) {
        if (this.tablet.length > 0) {
            this.casko.draw(ctx)
        } else {
            ctx.clearRect(0, 0, CONST.originalx, CONST.originaly)
        }
        this.kirakira.draw(ctx)
        this.shoji.draw(ctx)
        this.shock.draw(ctx)
    }

    ///////

    draw_cg_min(ctx) {
        this.cg.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_cg(ctx) {
        this.cg.draw(ctx)
        this.fukidashi.draw(ctx)
        this.shoji.draw(ctx)
    }

    ///////

    draw_pre_ed(ctx) {
        this.casko.draw(ctx)
        this.shoji.draw(ctx)
    }
    draw_ed(ctx) {
        this.shoji.draw(ctx)
        this.tfp.draw(ctx)
    }

    ///////
    
}
