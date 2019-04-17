import { STAT } from './kisekae/stat.js'
import CONST from './kisekae/const.js'
import Command from './kisekae/command.js'

export default {
    name: 'kisekae',
    data() {
        return {
            canvas: nil,
            ctx: nil,
            display_canvas: nil,
            display_ctx: nil,
            scale: 1,
            bg: new Image(),
            command: new Command(),
        }
    },
    mounted() {
        /////////////////// initialize canvas

        this.display_canvas = document.getElementById('kisekae')
        this.display_ctx = this.display_canvas.getContext('2d')

        /////////////////// initialize buffered canvas

        this.canvas = document.createElement('canvas')
        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.originaly
        this.ctx = this.canvas.getContext('2d')
        this.ctx.font = '100px Arial'
        this.ctx.textAlign = 'center'

        /////////////////// instantiate classes and so on

        this.bg.src = '../../images/kisekae/bg.png'

        /////////////////// add event listener

        this.display_canvas.addEventListener('click', this.onClick, false)
        
        /////////////////// main loop

        this.setInterval(this.frame, 10)
    },
    methods: {
        frame() {
            this.ctx.drawImage(this.bg, 0, 0)
            switch(this.command.get_stat()) {
                case STAT.ready:
                this.command.draw_ready(this.ctx)
                    break
                
                case STAT.talk:
                this.command.proc_talk()
                this.command.draw_talk(this.ctx)
                    break
        
                case STAT.select:
                this.command.proc_select()
                this.command.draw_select(this.ctx)
                    break
        
                case STAT.game:
                this.command.proc_game()
                this.command.draw_game(this.ctx)
                    break
        
                case STAT.cg:
                this.command.draw_cg(this.ctx)
                    break
        
                ///////////
                
                case STAT.pre_game:
                this.command.proc_pre_game()
                this.command.draw_pre_game(this.ctx)
                    break
        
                case STAT.post_game:
                this.command.proc_post_game()
                this.command.draw_post_game(this.ctx)
                    break
        
                case STAT.pre_cg:
                this.command.proc_pre_cg()
                this.command.draw_cg(this.ctx)
                    break
        
                default:
            }
            this.resize()
        },

        onClick(e) {
            let rect = e.target.getBoundingClientRect()
            let x = (e.clientX - rect.left) / this.scale
            let y = (e.clientY - rect.top) / this.scale
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
        
                case STAT.game:
                this.command.click_game(x, y)
                    break
        
                case STAT.cg:
                this.command.click_cg()
                    break
        
                default:
            }
            console.log('clicked: ' + x + ', ' + y)
        },

        resize() {
            this.scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1)
        
            this.display_canvas.width = CONST.originalx * scale
            this.display_canvas.height = CONST.originaly * scale
            this.display_ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 
                0, 0, this.display_canvas.width, this.display_canvas.height)
        },
    },
    template: `<canvas id="kisekae"></canvas>`
}