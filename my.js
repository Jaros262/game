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
/*--------------------------Ints--------------------------*/

/*-------------------------Sounds-------------------------*/
const break1 = document.createElement('audio');
break1.src = 'sounds/break1.ogg';
const break2 = document.createElement('audio');
break2.src = 'sounds/break2.ogg';
const hurt = document.createElement('audio');
hurt.src = 'sounds/hurt.mp3';
const gameOver = document.createElement('audio');
gameOver.src = 'sounds/GameOver.ogg';
break1.volume = 0.1;
break2.volume = 0.1;
hurt.volume = 0.1;
gameOver.volume = 0.2;
/*-------------------------Sounds-------------------------*/

/*-----------------------Keybodard------------------------*/
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
/*------------------------Player-------------------------*/

/*-----------------------Objects-------------------------*/
let bubblesArray = [];
class Bubble {
    constructor(){
        this.x = canvas.width + 50;
        this.y = (Math.random() * (canvas.height - 150)) + 75;
        this.radius = 25;
        this.speed = Math.random() * 2 + 1;
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
                hurt.play();
                this.const--;
                bubblesArray.splice(i, 1);
            }
        }
    }
}
const lives = new Lives();
/*---------------------Properties------------------------*/

/*----------------------Game Over------------------------*/
let end = {
    update: function(){
        if (lives.const == 0){
            
            animateGameOver();
        }
    }
}

function animateGameOver(){
    ctx.fillStyle = 'red';
    ctx.font = '50px Habana';
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
    gameOver.play();
    cancelAnimationFrame();
}
/*----------------------Game Over------------------------*/

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
let timer;
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
    end.update();
    timer = requestAnimationFrame(animate);
}
animate();
/*-----------------------Animate-------------------------*/