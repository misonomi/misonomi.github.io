import { STAT } from './kisekae/stat.js';
import CONST from './kisekae/const.js';
import Command from './kisekae/command.js';

/////////////////// initialize canvas

const display_canvas = document.getElementById('kisekae');
const display_ctx = canvas.getContext('2d');
let scale = 1;

/////////////////// initialize buffered canvas

const canvas = document.createElement('canvas');
const ctx = _canvas.getContext('2d');
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

        case STAT.game:
            command.draw(ctx);
            break;
        
        case STAT.talk:
            command.proc_talk();
            command.draw_talk(ctx);
            break;

        default:
    }
    resize();
}

setInterval(frame, 10);

/////////////////////////////////////// other functions

function onClick(e) {
    let pos = getMousePos(canvas, e);
    command.click(pos.x / scale, pos.y / scale);
}

function resize() {
    scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1);

    display_canvas.width = CONST.originalx * scale;
    display_canvas.height = CONST.originaly * scale;
    display_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, display_canvas.width, display_canvas.height);
}
