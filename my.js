const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const play = document.getElementById('start')
const pause = document.getElementById('pause')
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
        this.x = canvas.width + 50;
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
        /*if (score> 1000){
            this.speed++;
        }*/
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
        bubblesArray[i].draw();  
    }
    for (let i = 0; i < bubblesArray.length; i++){
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
            bubblesArray.splice(i, 1);
        }
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.position){
            if (!bubblesArray[i].counted){
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
            }
        }         
    }
}

const livessprite1 = new Image();
livessprite1.src = "1.png";
const livessprite2 = new Image();
livessprite2.src = "2.png";
const livessprite3 = new Image();
livessprite3.src = "3.png";
class Lives {
    constructor(){
        this.const = 3;
    }
    update(){
        ctx.fillStyle = 'black';
        ctx.fillText(lives.const, 568, 36);
        if(this.const == 3){
            ctx.drawImage(livessprite3, 608, 5, 40, 40);
        }
        if(this.const == 2){
            ctx.drawImage(livessprite2, 608, 4, 40, 40);
        }
        if(this.const == 1){
            ctx.drawImage(livessprite1, 608, 4, 40, 40);
        }

        for (let i = 0; i < bubblesArray.length; i++){
            bubblesArray[i].update();
            if (bubblesArray[i].x < 75){
                this.const--;
                bubblesArray.splice(i, 1);
            }
        }
    }
}
const lives = new Lives();


let end = {
    update: function(){
        if (lives.const == 0){
            
            animateGameOver();
        }
    }
}

let timer;
/*play.addEventListener('click', playCanvas);
function playCanvas(){
    if (animate() == false){
        requestAnimationFrame(animate);
    }
}   
pause.addEventListener('click', pauseCanvas);
function pauseCanvas(){
    cancelAnimationFrame();
}*/
restart.addEventListener('click', resetCanvas);
function resetCanvas(){
    score = 0;
    lives.const = 3;
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
    lives.update();
    end.update();
    timer = requestAnimationFrame(animate);
}
animate();

function animateGameOver(){
    ctx.fillStyle = 'red';
    ctx.font = '50px Habana';
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
    cancelAnimationFrame();
}