const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 650;

const keys = [];

let player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

let playerSpirite = player;

const playerSprite = new Image();
playerSpirite.src = "char.png";
const background = new Image();
background.src = "background.png";



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 0,0, player.width, player.
    height, 50, 50, player.width, player.height);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("keydown", function(e){

});

window.addEventListener("keyup", function(e){

});