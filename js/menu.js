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
        ctx.font = '45px Lives';
        ctx.fillText("MENU", canvas.width/2 -58, canvas.height/2 - 200);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
const menu = new Menu();

class PlayB {
    constructor(){
        this.x = canvas.width/2 - 90;
        this.y = canvas.height/2 - 180;
        this.width = 180;
        this.height = 50;
        this.pressed = false;
        this.over = false;
    }
    clicked(){
        cancelAnimationFrame(menuF);
        menuCan = false;
        changeSound();
        console.log('Sounds set to: ',hurt.volume);
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
        ctx.font = '35px Pixels';
        ctx.fillText('Play', this.x + 55, this.y + 34);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    clickPlayb(mouseX, mouseY) {
        if (mouseX >= playb.x && mouseX <= playb.x + playb.width && mouseY >= playb.y && mouseY <= playb.y + playb.height && this.pressed == true && menuCan == true) { 
            this.clicked();
        } 
    }
}
const playb = new PlayB();

class OptionsB {
    constructor(){
        this.x = canvas.width/2 - 90;
        this.y = canvas.height/2 - 120;
        this.width = 180;
        this.height = 50;
        this.pressed = false;
        this.over = false;

    }
    clicked(){
        cancelAnimationFrame(menuF);
        menuCan = false;
        animateOptions(optionsF);
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
        ctx.font = '35px Pixels';
        ctx.fillText('Options', this.x + 18, this.y + 34);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    clickOptionsb(mouseX, mouseY) {
        if (mouseX >= optionsb.x && mouseX <= optionsb.x + optionsb.width && mouseY >= optionsb.y && mouseY <= optionsb.y + optionsb.height && this.pressed == true && menuCan == true) { 
            this.clicked();
        } 
    }
    
}
const optionsb = new OptionsB();

function changeSound(){
    if(changed == false){
            break1.volume = 0.1;
            break2.volume = 0.1;
            hurt.volume = 0.1;
            gameOver.volume = 0.1;
        }
}

function animateMenu(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    menu.draw();
    playb.draw();
    optionsb.draw();
    menuCan = true;
    menuF = requestAnimationFrame(animateMenu);
}
animateMenu();
/*--------------------------Menu--------------------------*/

/*------------------------Options-------------------------*/
class Options {
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
        ctx.font = '45px Lives';
        ctx.fillText("OPTIONS", canvas.width/2 -100, canvas.height/2 - 200);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
const options = new Options();

class Sounds {
    constructor(){
        this.x = canvas.width/2 - 240;
        this.y = canvas.height/2 - 110;
        this.width = 30;
        this.height = 30;
        this.pressed = false;
        this.xpoint = this.x + 150;
        this.ypoint = this.y - 25;
        this.distance = 100;
        this.pressed = false;
    }
    clicked1(){
        if (volumePrevod > 0){
            soundCounter--;
        }
        changed = true;
    }
    clicked2(){
        if (volumePrevod < 10){
            soundCounter++;
        }
        changed = true;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = '35px Lives';
        ctx.fillText("Sounds:", this.x, this.y);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

/*---sipka vlevo---*/
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.moveTo(this.xpoint + this.width, this.ypoint);
        ctx.lineTo(this.xpoint, this.ypoint + 15);
        ctx.lineTo(this.xpoint + this.width, this.ypoint + this.height);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
/*---sipka vlevo---*/

/*------text-------*/
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = '35px Lives';
        ctx.fillText(volumePrevod, this.xpoint + 55, this.ypoint + 27);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
/*------text-------*/

/*---sipka vpravo--*/
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.moveTo(this.xpoint + this.distance, this.ypoint);
        ctx.lineTo(this.xpoint + this.width + this.distance, this.ypoint + 15);
        ctx.lineTo(this.xpoint + this.distance, this.ypoint + this.height);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
/*---sipka vpravo--*/
    }
    clickTriangleb1(mouseX, mouseY){
        if (mouseX >= this.xpoint && mouseX <= this.xpoint + this.width && mouseY >= this.ypoint && mouseY <= this.ypoint + this.height && this.pressed == true && optionsCan == true) { 
            soundSet.clicked1();
            this.clicked1();
            clicked = true;
        }
    
    }
    clickTriangleb2(mouseX, mouseY){
        if (mouseX >= this.xpoint + this.distance && mouseX <= this.xpoint + this.distance + this.width && mouseY >= this.ypoint && mouseY <= this.ypoint + this.height && this.pressed == true && optionsCan == true) { 
            soundSet.clicked2();
            this.clicked2();
            clicked = true;
        }
    
    }
    
}
const sounds = new Sounds();

let soundSet  = {
    clicked1: function(){
        if (volumePrevod > 0){
            volumePrevod--;
        }
        console.log(volumePrevod);
        sounds.clicked = false;
        optionsCan = false;
        break1.volume = volumePrevod/10;
        break2.volume = volumePrevod/10;
        hurt.volume = volumePrevod/10;
        gameOver.volume = volumePrevod/10;
    },
    clicked2: function(){
    if (volumePrevod < 10){
        volumePrevod++;
    }
    console.log(volumePrevod);
    sounds.clicked = false;
    optionsCan = false;
    break1.volume = volumePrevod/10;
    break2.volume = volumePrevod/10;
    hurt.volume = volumePrevod/10;
    gameOver.volume = volumePrevod/10;
    }
}


class Back {
    constructor(){
        this.x = canvas.width/2 - 75;
        this.y = canvas.height/2 + 200;
        this.width = 180;
        this.height = 50;
        this.pressed = false;
    }
    clicked(){
        cancelAnimationFrame(optionsF);
        optionsCan = false;
        animateMenu(menuF);
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
        ctx.font = '35px Pixels';
        ctx.fillText('Back', this.x + 50, this.y + 34);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    clickBackb(mouseX, mouseY) {
        if (mouseX >= back.x && mouseX <= back.x + back.width && mouseY >= back.y && mouseY <= back.y + back.height && this.pressed == true && optionsCan == true) { 
            this.clicked();
        } 
    }
}
const back = new Back();
function animateOptions(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    options.draw();
    sounds.draw();
    back.draw();
    optionsCan = true;
    optionsF = requestAnimationFrame(animateOptions);
}
/*------------------------Options-------------------------*/

/*-----------------------Keybodard------------------------*/
canvas.addEventListener('mousedown', (event) => { 
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    playb.pressed = true;
    optionsb.pressed = true;
    back.pressed = true;
    sounds.pressed = true;
    playb.clickPlayb(x, y);
    optionsb.clickOptionsb(x,y);
    back.clickBackb(x, y);
    sounds.clickTriangleb1(x, y);
    sounds.clickTriangleb2(x, y);           
});
canvas.addEventListener('mouseup', () => { 
    playb.pressed = false;
    optionsb.pressed = false; 
    back.pressed = false;
    sounds.pressed = true;            
});
/*-----------------------Keybodard------------------------*/