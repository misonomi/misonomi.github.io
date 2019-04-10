import { STAT } from './kisekae/stat.js';
import CONST from './kisekae/const.js';
import Command from './kisekae/command.js';

/////////////////// initialize canvas

const display_canvas = document.getElementById('kisekae');
const display_ctx = display_canvas.getContext('2d');
let scale = 1;

/////////////////// initialize buffered canvas

const canvas = document.createElement('canvas');
canvas.width = CONST.originalx;
canvas.height = CONST.originaly;
const ctx = canvas.getContext('2d');
ctx.font = 'bold 30px';

/////////////////// instantiate classes and so on

const bg = document.getElementById('bg');
let command = new Command();

/////////////////// add event listener

canvas.addEventListener('click', onClick, false);

/////////////////// main loop

function frame() {
    ctx.drawImage(bg, 0, 0);
    switch(command.getStat()) {
        case STAT.ready:
            command.draw_ready(ctx);
            break;
        
        case STAT.talk:
            command.proc_talk();
            command.draw_talk(ctx);
            break;

        case STAT.select:
            command.proc_select();
            command.draw_select(ctx);

        case STAT.game:
            command.proc_game();
            command.draw_game(ctx);
            break;

        case STAT.cg:
            command.draw_cg(ctx);
            break;

        default:
    }
    resize();
}

setInterval(frame, 10);

/////////////////////////////////////// other functions

function onClick(e) {
    let pos = getMousePos(canvas, e);
    let x = pos.x / scale;
    let y = pos.y / scale;
    switch(command.getStat()) {
        case STAT.ready:
            command.click_ready();
            break;
        
        case STAT.talk:
            command.click_talk();
            break;

        case STAT.select:
            command.click_select(x, y);
            break;

        case STAT.game:
            command.click_game(x, y);
            break;

        case STAT.cg:
            command.click_cg();
            break;

        default:
    }
}

function resize() {
    scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1);

    display_canvas.width = CONST.originalx * scale;
    display_canvas.height = CONST.originaly * scale;
    display_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 
        (window.innerWidth - display_canvas.width) / 2, (window.innerHeight - display_canvas.height) / 2, display_canvas.width, display_canvas.height);
}
