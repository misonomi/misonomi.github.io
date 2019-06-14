import { STAT } from '../kisekae/stat.js'
import CONST from '../kisekae/const.js'
import Command from '../kisekae/command.js'

export default {
    name: 'kisekae',
    data() {
        return {
            canvas: null,
            ctx: null,
            display_canvas: null,
            display_ctx: null,
            scale: 1,
            bg: null,
            command: null,
        }
    },
    async mounted() {
        document.title = 'Generic Kisekae Shichihenge'

        this.funcSetup()
        
        /////////////////// instantiate classes and so on

        this.command = await new Command()

        /////////////////// initialize canvas

        this.display_canvas = document.getElementById('kisekae')
        this.display_ctx = this.display_canvas.getContext('2d')

        /////////////////// initialize buffered canvas

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.originaly

        /////////////////// add event listener

        this.display_canvas.addEventListener('click', this.onClick, false)
        this.display_canvas.addEventListener('keydown', this.onKeyDown, false)
        
        /////////////////// main loop

        setInterval(this.frame, 10)
    },
    methods: {
        frame() {
            switch(this.command.get_stat()) {
                case STAT.ready:
                this.command.proc_ready(); this.command.draw_ready(this.ctx)
                break

                ///////
                
                case STAT.pre_talk:
                this.command.proc_pre_talk(); this.command.draw_talk(this.ctx)
                break
                
                case STAT.talk:
                this.command.proc_talk(); this.command.draw_talk(this.ctx)
                break

                ///////
        
                case STAT.pre_select:
                this.command.proc_pre_select(); this.command.draw_select(this.ctx)
                break
        
                case STAT.select:
                this.command.proc_select(); this.command.draw_select(this.ctx)
                break

                case STAT.post_select:
                this.command.proc_post_select(); this.command.draw_select(this.ctx)
                break

                ///////
                
                case STAT.pre_game:
                this.command.proc_pre_game(); this.command.draw_pre_game(this.ctx)
                break
                
                case STAT.wait_game:
                this.command.proc_wait_game(); this.command.draw_wait_game(this.ctx)
                break
        
                case STAT.game:
                this.command.proc_game(); this.command.draw_game(this.ctx)
                break

                case STAT.monologue_game:
                this.command.proc_mono_game(); this.command.draw_mono_game(this.ctx)
                break

                case STAT.break_game:
                this.command.proc_break_game(); this.command.draw_break_game(this.ctx)
                break
        
                ///////
        
                case STAT.pre_extragame:
                this.command.proc_pre_extragame(); this.command.draw_pre_extragame(this.ctx)
                break
            
                case STAT.wait_extragame:
                this.command.proc_wait_extragame(); this.command.draw_wait_extragame(this.ctx)
                break
            
                case STAT.extragame:
                this.command.proc_extragame(); this.command.draw_extragame(this.ctx)
                break
    
                ///////
            
                case STAT.shake:
                this.command.proc_shake(); this.command.draw_shake(this.ctx)
                break
    
                ///////

                case STAT.show:
                this.command.proc_show(); this.command.draw_show(this.ctx)
                break

                ///////
        
                case STAT.pre_cg:
                this.command.proc_pre_cg(); this.command.draw_pre_cg(this.ctx)
                break
        
                case STAT.cg:
                this.command.proc_cg(); this.command.draw_cg(this.ctx)
                break
        
                case STAT.post_cg:
                this.command.proc_post_cg(); this.command.draw_post_cg(this.ctx)
                break

                ///////
        
                case STAT.pre_ed:
                this.command.proc_pre_ed(); this.command.draw_pre_ed(this.ctx)
                break
        
                case STAT.ed:
                this.command.proc_ed(); this.command.draw_ed(this.ctx)
                break

                ///////
        
                default:
            }
            this.resize()
        },

        onClick(e) {
            const rect = e.target.getBoundingClientRect()
            this.clicked((e.clientX - rect.left) / this.scale, (e.clientY - rect.top) / this.scale)
        },
        onKeyDown(e) {
            switch(e.keyCode) {
                case 32:
                case 64:
                clicked(0, 0)
                break

                default:
            }
        },

        async clicked(x, y) {
            switch(this.command.get_stat()) {
                case STAT.ready:
                this.command.click_ready()
                break
                
                case STAT.talk:
                this.command.click_talk()
                break
        
                case STAT.select:
                this.command.click_select(x, y)
                break

                case STAT.wait_game:
                this.command.click_wait_game(x, y)
                break
                case STAT.game:
                this.command.click_game(x, y)
                break
                case STAT.monologue_game:
                this.command.click_mono_game()
                break

                case STAT.wait_extragame:
                this.command.click_wait_extragame()
                break
                case STAT.extragame:
                this.command.click_extragame()
                break
        
                case STAT.cg:
                this.command.click_cg()
                break
        
                case STAT.ed:
                this.command = await new Command()
                break
        
                default:
            }
            console.log('clicked: ' + x + ', ' + y)

        },

        resize() {
            this.scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1)
        
            this.display_canvas.width = CONST.originalx * this.scale
            this.display_canvas.height = CONST.originaly * this.scale
            this.display_ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 
                0, 0, this.display_canvas.width, this.display_canvas.height)
        },
        funcSetup() {
            CanvasRenderingContext2D.prototype.fillRoundRect = function (x, y, w, h, r) {
                if (w < 2 * r) { r = w / 2 }
                if (h < 2 * r) { r = h / 2 }
                this.beginPath()
                this.moveTo(x+r, y)
                this.arcTo(x+w, y,   x+w, y+h, r)
                this.arcTo(x+w, y+h, x,   y+h, r)
                this.arcTo(x,   y+h, x,   y,   r)
                this.arcTo(x,   y,   x+w, y,   r)
                this.closePath()
                this.fill()
            }
            CanvasRenderingContext2D.prototype.strokeArc = function (w, x, y, r, start, end) {
                this.lineWidth = w
                this.beginPath()
                this.arc(x, y, r, start, end)
                this.stroke()
            }
            CanvasRenderingContext2D.prototype.strokeArc4 = function (w, x, y, r, start, end) {
                for (let i = 0; i < 2 * Math.PI; i += .5 * Math.PI) {
                    this.strokeArc(w, x, y, r, start + i, end + i)
                }
            }
        }
    },
    template: `<canvas id="kisekae"></canvas>`
}