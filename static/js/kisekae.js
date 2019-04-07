import Shoji from './kisekae/shoji';
const canvas = document.getElementById('kisekae');
const ctx = canvas.getContext('2d');
const bg = document.getElementById('bg');
let shoji = new Shoji(document.getElementById('shoji'));
let pos = {
    x: 50,
    y: 50
};

function draw() {

    ctx.drawImage(bg, 0, 0);
    shoji.draw(ctx);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

setInterval(draw, 10);