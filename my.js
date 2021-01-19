const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const restart = document.getElementById('restart')
canvas.width = 650;
canvas.height = 650;
let score = 0;
let gameFrame = 0;
ctx.font = '35px Arial';

const movement = {
    x: 50,
    y: 50,
    click: false
}
window.addEventListener("keydown", function(event){
    movement.click = true;
    player.move(event.key);
});
window.addEventListener("keyup", function(event){
    movement.click = false;
})

const playersprite = new Image();
playersprite.src = "person.png";
class Player {
    constructor(){
        this.x = canvas.width-600;
        this.y = canvas.height-600;
        this.width = 50;
        this.height = 50;
        this.speed = 9;
        this.moving = false;
        this.position = this.x;
    }
    draw(){
        ctx.drawImage(playersprite, this.x, this.y, this.width, this.height);
    }
    move(key){
        if (key == "ArrowRight" && player.x < 550){this.x += 50;}
        if (key == "ArrowLeft" && player.x > 50){this.x -= 50;}
        if (key == "ArrowUp" && player.y > 50){this.y -= 50;}
        if (key == "ArrowDown" && player.y < 550){this.y += 50;}
    }
}
const player = new Player();

//bubbles
let bubblesArray = [];
class Bubble {
    constructor(){
        this.x =canvas.width + 50;
        this.y = (Math.random() * (canvas.height - 150)) + 75;
        this.radius = 25;
        this.speed = Math.random() * 2 + 1;
        this.distance;
        this.counted = false;
    }
    update(){
        this.x -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
        this.speed += score/5000;
        console.log(this.speed);
    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

function handleBubbles(){
    if(gameFrame % 50 ==0){
        bubblesArray.push(new Bubble());
    }
    for (let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.position){
            if (!bubblesArray[i].counted){
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
            }
        }
        if (bubblesArray[i].x < 75){
            score--;
            bubblesArray.splice(i, 1);
        }
        bubblesArray[i].draw();  
    }
}
let timer;

restart.addEventListener('click', resetCanvas);
function resetCanvas(){
    score = 0;
    bubblesArray = [];
    console.log(bubblesArray);
    cancelAnimationFrame(timer);
    animate();
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBubbles();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 60, 34);
    gameFrame++;
    timer = requestAnimationFrame(animate);
}
animate();