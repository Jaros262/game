/*--------------------------Ints--------------------------*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const play = document.getElementById('start')
const pause = document.getElementById('pause')
const restart = document.getElementById('restart')
canvas.width = 650;
canvas.height = 650;
let score = 0;
let gameFrame = 0;
let timer;
let menuF;
let menuCan;
let optionsF;
let optionsCan;
let volume;
let soundCounter = 1;
let volumePrevod = 1;
let clicked = false;
/*--------------------------Ints--------------------------*/

/*-------------------------Sounds-------------------------*/
const break1 = document.createElement('audio');
break1.src = 'https://opengameart.org/sites/default/files/boulder_drop_0.ogg';
const break2 = document.createElement('audio');
break2.src = 'https://opengameart.org/sites/default/files/rock_break_0.ogg';
const hurt = document.createElement('audio');
hurt.src = 'https://opengameart.org/sites/default/files/ouch1_1.mp3';
const gameOver = document.createElement('audio');
gameOver.src = 'https://opengameart.org/sites/default/files/GameOver_2.ogg';

/*-------------------------Sounds-------------------------*/

/*----------------------Game Objects----------------------*/
const playersprite = new Image();
playersprite.src = "GameObj/wiz1.png";
const livessprite0 = new Image();
livessprite0.src = "GameObj/0h.png";
const livessprite1 = new Image();
livessprite1.src = "GameObj/1h.png";
const livessprite2 = new Image();
livessprite2.src = "GameObj/2h.png";
const livessprite3 = new Image();
livessprite3.src = "GameObj/3h.png";
/*----------------------Game Objects----------------------*/

/*-----------------------Keybodard------------------------*/
const movement = {
    x: 50,
    y: 50,
    click: false
}

let keys = [];

window.addEventListener("keydown", function(event){
    keys[event.key] = true;
});
window.addEventListener("keyup", function(event){
    delete keys[event.key];
})
/*-----------------------Keyboard------------------------*/

/*------------------------Player-------------------------*/

class Player {
    static DEFALUT_SIZE = 50;
    constructor(){
        this.x = canvas.width-600;
        this.y = canvas.height-600;
        this.size = Player.DEFALUT_SIZE;
        this.speed = 4.5;
    }
    draw(){
        ctx.drawImage(playersprite, this.x, this.y, this.size, this.size);
    }
    move(){
        if (keys['ArrowRight'] && this.x < 600){this.x += this.speed;}
        if (keys['ArrowLeft'] && this.x > 50){this.x -= this.speed;}
        if (keys['ArrowUp'] && this.y > 50){this.y -= this.speed;}
        if (keys['ArrowDown'] && this.y < 550){ this.y += this.speed;}
    }
}
const player = new Player();
/*------------------------Player-------------------------*/

/*-----------------------Objects-------------------------*/
let bubblesArray = [];
class Bubble {
    constructor(){
        this.x = canvas.width + 50;
        this.y = (Math.random() * (canvas.height - 150)) + 75;
        this.radius = 25;
        this.speed = Math.random() * 1.5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
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
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.size){
            if (!bubblesArray[i].counted){
                if (bubblesArray[i].sound == 'sound1'){
                    break1.play();
                } else {
                    break2.play();
                }
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
            }
        }         
    }
}
/*-----------------------Objects-------------------------*/

/*---------------------Properties------------------------*/

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
        if(this.const == 0){
            ctx.drawImage(livessprite0, 608, 4, 40, 40);
        }
        for (let i = 0; i < bubblesArray.length; i++){
            bubblesArray[i].update();
            if (bubblesArray[i].x < 75){
                hurt.play();
                this.const--;
                bubblesArray.splice(i, 1);
            }
        }
    }
}
const lives = new Lives();
/*---------------------Properties------------------------*/

/*-----------------------Play On-------------------------*/
/*play.addEventListener('click', playCanvas);
function playCanvas(){
    if (animate() == false){
        requestAnimationFrame(animate);
    }
}
/*------------------------Pause--------------------------*/   
/*pause.addEventListener('click', pauseCanvas);
function pauseCanvas(){
    cancelAnimationFrame();
}*/
/*------------------------Pause--------------------------*/

/*-----------------------Restart-------------------------*/
restart.addEventListener('click', resetCanvas);
function resetCanvas(){
    score = 0;
    lives.const = 3;
    bubblesArray = [];
    console.log(bubblesArray);
    cancelAnimationFrame(timer);
    animate();
}
/*-----------------------Restart-------------------------*/

/*-----------------------Animate-------------------------*/
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBubbles();
    player.draw(); 
    player.move();
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 60, 34);
    gameFrame++;
    lives.update();
    if (lives.const == 0){
        bubblesArray = [];
        animateGameOver();
    } else {
        timer = requestAnimationFrame(animate);
    }
    
    
}
/*-----------------------Animate-------------------------*/

/*----------------------Game Over------------------------*/
function animateGameOver(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBubbles();
    player.draw();
    lives.update();
    gameOver.play();
    menuCan = false;
    optionsCan = false;
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 60, 34);
    ctx.fillStyle = 'red';
    ctx.font = '50px Habana';
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);  
}
/*----------------------Game Over------------------------*/