/*--------------------------Ints--------------------------*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 650;
let score = 0;
let gameFrame = 1;
let control = 1;
let startF;
let startCan;
let timer;
let menuF;
let menuCan;
let optionsF;
let optionsCan;
let volume;
let soundCounter = 1;
let volumePrevod = 1;
let clicked = false;
let changed = false;
let fix = true;
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
const startsprite = new Image();
startsprite.src = "GameObj/start.jpg";
const playersprite = new Image();
playersprite.src = "GameObj/wiz1.png";
const bubblesprite = new Image();
bubblesprite.src = "GameObj/rock.png";
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
});
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
        if (keys['d'] && this.x < 600){this.x += this.speed;}
        if (keys['a'] && this.x > 50){this.x -= this.speed;}
        if (keys['w'] && this.y > 50){this.y -= this.speed;}
        if (keys['s'] && this.y < 550){ this.y += this.speed;}
    }
}
const player = new Player();
/*------------------------Player-------------------------*/

/*-----------------------Objects-------------------------*/
let bubblesArray = [];
class Bubble {
    static DEFALUT_SIZE = 50;
    constructor(){
        this.x = canvas.width + 50;
        this.y = (Math.random() * (canvas.height - 150)) + 75;
        this.radius = 25;
        this.speed = Math.random() * 1.5 + 0.5;
        this.distance;
        this.counted = false;
        this.size = Bubble.DEFALUT_SIZE;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.angle = 0;
    }
    update(){
        this.x -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
        
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(bubblesprite, this.x - this.radius, this.y - this.radius, this.size, this.size);
        ctx.rotate(this.angle);
        ctx.closePath();
        ctx.stroke();
    }
}
const bubble = new Bubble();

function handleBubbles(){
    if(gameFrame % 50 == 0){
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
        ctx.beginPath();
        ctx.font = '35px Lives';
        ctx.fillStyle = 'black';
        ctx.fillText(lives.const, 566, 36);
        ctx.closePath();
        ctx.stroke();
        if(this.const == 3){
            ctx.drawImage(livessprite3, 608, 6, 40, 40);
        }
        if(this.const == 2){
            ctx.drawImage(livessprite2, 608, 5, 40, 40);
        }
        if(this.const == 1){
            ctx.drawImage(livessprite1, 608, 5, 40, 40);
        }
        if(this.const == 0){
            ctx.drawImage(livessprite0, 608, 5, 40, 40);
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
/*restart.addEventListener('click', resetCanvas);
function resetCanvas(){
    score = 0;
    lives.const = 3;
    bubblesArray = [];
    console.log(bubblesArray);
    cancelAnimationFrame(timer);
    animate();
}*/
/*-----------------------Restart-------------------------*/

/*-----------------------Animate-------------------------*/
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBubbles();
    menuCan = false;
    optionsCan = false;
    startCan = false;
    player.draw(); 
    player.move();
    ctx.beginPath();
    ctx.font = '35px Pixels';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 64, 33);
    ctx.closePath();
    ctx.stroke();
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
    if (fix == true){gameOver.play();}
    menuCan = false;
    optionsCan = false;
    ctx.beginPath();
    ctx.font = '35px Pixels';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 64, 33);
    ctx.fillStyle = 'red';
    ctx.font = '50px Pixels';
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
    ctx.closePath();
    ctx.stroke();
    fix = false; 
    requestAnimationFrame(animateGameOver);
}
/*----------------------Game Over------------------------*/