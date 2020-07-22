import { STAT } from './stat.js'
import CONST from './const.js'
import Command from './command.js'

let command
let canvas
let ctx
let display_canvas
let display_ctx
let scale

window.onload = async () => {

  funcSetup()
          
  /////////////////// instantiate classes and so on
  
  command = await new Command()
  
  /////////////////// initialize canvas
  
  display_canvas = document.getElementById('kisekae')
  display_ctx = display_canvas.getContext('2d')
  
  /////////////////// initialize buffered canvas
  
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
  
  canvas.width = CONST.originalx
  canvas.height = CONST.originaly
  
  /////////////////// add event listener
  
  display_canvas.addEventListener('click', onClick, false)
  display_canvas.addEventListener('keydown', onKeyDown, false)
  setInterval(frame, 10)
}

function frame() {
  switch(command.get_stat()) {
    case STAT.ready:
    command.proc_ready(); command.draw_ready(ctx)
    break

    ///////
    
    case STAT.pre_talk:
    command.proc_pre_talk(); command.draw_talk(ctx)
    break
    
    case STAT.talk:
    command.proc_talk(); command.draw_talk(ctx)
    break

    ///////

    case STAT.pre_select:
    command.proc_pre_select(); command.draw_select(ctx)
    break

    case STAT.select:
    command.proc_select(); command.draw_select(ctx)
    break

    case STAT.post_select:
    command.proc_post_select(); command.draw_select(ctx)
    break

    ///////
    
    case STAT.pre_game:
    command.proc_pre_game(); command.draw_pre_game(ctx)
    break
    
    case STAT.wait_game:
    command.proc_wait_game(); command.draw_wait_game(ctx)
    break

    case STAT.game:
    command.proc_game(); command.draw_game(ctx)
    break

    case STAT.monologue_game:
    command.proc_mono_game(); command.draw_mono_game(ctx)
    break

    case STAT.break_game:
    command.proc_break_game(); command.draw_break_game(ctx)
    break

    ///////

    case STAT.pre_extragame:
    command.proc_pre_extragame(); command.draw_pre_extragame(ctx)
    break

    case STAT.wait_extragame:
    command.proc_wait_extragame(); command.draw_wait_extragame(ctx)
    break

    case STAT.extragame:
    command.proc_extragame(); command.draw_extragame(ctx)
    break

    ///////

    case STAT.shake:
    command.proc_shake(); command.draw_shake(ctx)
    break

    ///////

    case STAT.show:
    command.proc_show(); command.draw_show(ctx)
    break

    ///////

    case STAT.pre_cg:
    command.proc_pre_cg(); command.draw_pre_cg(ctx)
    break

    case STAT.cg:
    command.proc_cg(); command.draw_cg(ctx)
    break

    case STAT.post_cg:
    command.proc_post_cg(); command.draw_post_cg(ctx)
    break

    ///////

    case STAT.pre_ed:
    command.proc_pre_ed(); command.draw_pre_ed(ctx)
    break

    case STAT.ed:
    command.proc_ed(); command.draw_ed(ctx)
    break

    ///////

    default:
  }
  resize()
}

function onClick(e) {
  const rect = e.target.getBoundingClientRect()
  clicked((e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale)
}

function onKeyDown(e) {
  switch(e.keyCode) {
    case 32:
    case 64:
    clicked(0, 0)
    break

    default:
  }
}

async function clicked(x, y) {
  switch(command.get_stat()) {
    case STAT.ready:
    command.click_ready()
    break
    
    case STAT.talk:
    command.click_talk()
    break

    case STAT.select:
    command.click_select(x, y)
    break

    case STAT.wait_game:
    command.click_wait_game(x, y)
    break
    case STAT.game:
    command.click_game(x, y)
    break
    case STAT.monologue_game:
    command.click_mono_game()
    break

    case STAT.wait_extragame:
    command.click_wait_extragame(x, y)
    break
    case STAT.extragame:
    command.click_extragame(x, y)
    break

    case STAT.cg:
    command.click_cg()
    break

    case STAT.ed:
    command = await new Command()
    break

    default:
  }
  console.log('clicked: ' + x + ', ' + y)
}

function resize() {
  scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1)

  display_canvas.width = CONST.originalx * scale
  display_canvas.height = CONST.originaly * scale
  display_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 
    0, 0, display_canvas.width, display_canvas.height)
}

function funcSetup() {
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