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
let intro;
/*--------------------------Ints--------------------------*/

/*--------------------------Menu--------------------------*/
class Menu {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 650;
        this.height = 650;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = '35px Arial';
        ctx.fillText("Menu", canvas.width/2 -45, canvas.height/2 - 200);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
const menu = new Menu();

class PlayB {
    static DEFAULT_SIZE = 200;
    constructor(){
        this.x = canvas.width/2 - 75;
        this.y = canvas.height/2 - 180;
        this.width = 150;
        this.height = 50;
        this.size = PlayB.DEFAULT_SIZE;
        this.pressed = false;

    }
    clicked(){
        cancelAnimationFrame(intro);
        animate();
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '35px Habana';
        ctx.fillText('Play', this.x + 40, this.y + 38);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    clickPlayb(mouseX, mouseY) {
        if (mouseX >= playb.x && mouseX <= playb.x + playb.width && mouseY >= playb.y && mouseY <= playb.y + playb.height && this.pressed == true) { 
            this.clicked();
        } 
    }
}
const playb = new PlayB();

function animateMenu(){
    menu.draw();
    playb.draw();
    intro = requestAnimationFrame(animateMenu);
}
animateMenu();
/*--------------------------Menu--------------------------*/

/*-------------------------Sounds-------------------------*/
const break1 = document.createElement('audio');
break1.src = 'https://opengameart.org/sites/default/files/boulder_drop_0.ogg';
const break2 = document.createElement('audio');
break2.src = 'https://opengameart.org/sites/default/files/rock_break_0.ogg';
const hurt = document.createElement('audio');
hurt.src = 'https://opengameart.org/sites/default/files/ouch1_1.mp3';
const gameOver = document.createElement('audio');
gameOver.src = 'https://opengameart.org/sites/default/files/GameOver_2.ogg';
break1.volume = 0.1;
break2.volume = 0.1;
hurt.volume = 0.1;
gameOver.volume = 0.2;
/*-------------------------Sounds-------------------------*/

/*----------------------Game Objects----------------------*/
const playersprite = new Image();
playersprite.src = "GameObj/wiz1.png";
const livessprite1 = new Image();
livessprite1.src = "GameObj/1h.png";
const livessprite2 = new Image();
livessprite2.src = "GameObj/2h.png";
const livessprite3 = new Image();
livessprite3.src = "GameObj/3h.png";
/*----------------------Game Objects----------------------*/

/*-----------------------Keybodard------------------------*/
canvas.addEventListener('mousedown', (event) => { 
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    playb.pressed = true;
    playb.clickPlayb(x, y);             
});
canvas.addEventListener('mouseup', () => { 
    playb.pressed = false;             
});

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
/*-----------------------Keyboard------------------------*/

/*------------------------Player-------------------------*/

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
        if (key == "ArrowRight" && player.x < 600){this.x += 50;}
        if (key == "ArrowLeft" && player.x > 50){this.x -= 50;}
        if (key == "ArrowUp" && player.y > 50){this.y -= 50;}
        if (key == "ArrowDown" && player.y < 550){this.y += 50;}
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
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.position){
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
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 60, 34);
    ctx.fillStyle = 'red';
    ctx.font = '50px Habana';
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);  
}
/*----------------------Game Over------------------------*/