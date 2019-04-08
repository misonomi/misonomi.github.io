import { STAT } from './kisekae/stat.js';
import CONST from './kisekae/const.js';
import Shoji from './kisekae/shoji.js';
import Command from './kisekae/command.js';
const canvas = document.getElementById('kisekae');
const ctx = canvas.getContext('2d');
ctx.font = 'bold 30px';

const bg = document.getElementById('bg');
let shoji = new Shoji(document.getElementById('shoji'));
let command = new Command();


canvas.addEventListener('click', onClick, false);

function frame() {
    switch(command.getStat()) {
        case STAT.init:
            shoji.open();
            break;
        case STAT.game:
            shoji.close();
            break;
        default:
    }
    draw();
}

setInterval(frame, 10);

///////////////////////////////////////////////////////////////////////////////

function onClick(e) {
    command.click(e);
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    shoji.draw(ctx);
    canvas.css('transform', 'scale('+Math.min((CONST.originalx / window.innerWidth), (CONST.originaly / window.innerHeight), 1)+')');
}