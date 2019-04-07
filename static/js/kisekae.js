import { STAT } from './kisekae/stat.js';
import Shoji from './kisekae/shoji.js';
import Command from './kisekae/command.js';
const canvas = document.getElementById('kisekae');
const ctx = canvas.getContext('2d');
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
    command.click();
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    shoji.draw(ctx);
}