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
        ctx.font = '45px Arial';
        ctx.fillText("Menu", canvas.width/2 -45, canvas.height/2 - 200);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
const menu = new Menu();

class PlayB {
    constructor(){
        this.x = canvas.width/2 - 75;
        this.y = canvas.height/2 - 180;
        this.width = 150;
        this.height = 50;
        this.pressed = false;

    }
    clicked(){
        cancelAnimationFrame(menuF);
        playCan = false;
        console.log(hurt.volume);
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
        if (mouseX >= playb.x && mouseX <= playb.x + playb.width && mouseY >= playb.y && mouseY <= playb.y + playb.height && this.pressed == true && playCan == true) { 
            this.clicked();
        } 
    }
}
const playb = new PlayB();

class OptionsB {
    constructor(){
        this.x = canvas.width/2 - 75;
        this.y = canvas.height/2 - 120;
        this.width = 150;
        this.height = 50;
        this.pressed = false;

    }
    clicked(){
        cancelAnimationFrame(menuF);
        playCan = false;
        animateOptions();
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
        ctx.fillText('Options', this.x + 20, this.y + 38);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    clickOptionsb(mouseX, mouseY) {
        if (mouseX >= optionsb.x && mouseX <= optionsb.x + optionsb.width && mouseY >= optionsb.y && mouseY <= optionsb.y + optionsb.height && this.pressed == true) { 
            this.clicked();
        } 
    }
}
const optionsb = new OptionsB();

function animateMenu(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    menu.draw();
    playb.draw();
    optionsb.draw();
    playCan = true;
    volume = volumePrevod / 10;
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
        ctx.font = '45px Arial';
        ctx.fillText("Options", canvas.width/2 -60, canvas.height/2 - 200);
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
        
        //if (volume > 0){
            volumePrevod--;
        //}
        optionsCan = false;
        console.log(volume);
    }
    clicked2(){
        
        //if (volume < 1){
            volumePrevod++;
        //}
        optionsCan = false;
        console.log(volume);
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = '35px Arial';
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
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = '35px Arial';
        ctx.fillText(volumePrevod, this.xpoint + 55, this.ypoint + 27);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
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
            this.clicked1();
        }
    
    }
    clickTriangleb2(mouseX, mouseY){
        if (mouseX >= this.xpoint + this.distance && mouseX <= this.xpoint + this.distance + this.width && mouseY >= this.ypoint && mouseY <= this.ypoint + this.height && this.pressed == true && optionsCan == true) { 
            this.clicked2();
        }
    
    }
    
}

const sounds = new Sounds();

class Back {
    constructor(){
        this.x = canvas.width/2 - 75;
        this.y = canvas.height/2 + 200;
        this.width = 150;
        this.height = 50;
        this.pressed = false;
    }
    clicked(){
        cancelAnimationFrame(optionsF);
        optionsCan = false;
        animateMenu();
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
        ctx.fillText('Back', this.x + 36, this.y + 38);
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
    volume = volumePrevod/10;
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

/*-------------------------Sounds-------------------------*/
break1.volume = volume;
break2.volume = volume;
hurt.volume = volume;
gameOver.volume = volume;
/*-------------------------Sounds-------------------------*/