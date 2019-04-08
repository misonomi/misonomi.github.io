import { STAT } from './kisekae/stat.js';
import CONST from './kisekae/const.js';
import Shoji from './kisekae/shoji.js';
import CTS from './kisekae/cts.js';
import Logo from './kisekae/logo.js';
import Command from './kisekae/command.js';
const canvas = document.getElementById('kisekae');
const ctx = canvas.getContext('2d');
ctx.font = 'bold 30px';

const bg = document.getElementById('bg');
let shoji = new Shoji(document.getElementById('shoji'));
let clicktostart = new CTS(document.getElementById('cts'));
let logo = new Logo(document.getElementById('logo'));
let command = new Command();


canvas.addEventListener('click', onClick, false);

function frame() {
    switch(command.getStat()) {
        case STAT.ready:
            draw_ready();
            break;

        case STAT.game:
            shoji.close();
            draw();
            break;
        
        case STAT.talk:


        default:
    }
}

setInterval(frame, 10);

///////////////////////////////////////////////////////////////////////////////

function onClick(e) {
    command.click(e);
}

function draw_ready() {
    ctx.drawImage(bg, 0, 0);
    shoji.draw(ctx);
    logo.draw(ctx);
    clicktostart.draw(ctx);
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    shoji.draw(ctx);
    canvas.css('transform', 'scale('+Math.min((CONST.originalx / window.innerWidth), (CONST.originaly / window.innerHeight), 1)+')');
}