const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 650;



let player = {
    sprite: new Image(),
    place: new Image(),
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 9,
    moving: false,
    init: function(){
        this.sprite.src = "person.png";
        this.place.src = "place.png";
    },
    draw: function(){
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        
    },
    paint: function(key){
        if(key == " "){drawImage(this.place, this.x, this.y, this.width, this.height);}
    },

    move: function(key){
        console.log(key);
        if (key == "ArrowRight" && player.x < 550){this.x += 50;}
        if (key == "ArrowLeft" && player.x > 50){this.x -= 50;}
        if (key == "ArrowUp" && player.y > 50){this.y -= 50;}
        if (key == "ArrowDown" && player.y < 550){this.y += 50;}
        
    }
    /*action: function(space){
        console.log(space);
        if (space == " "){action.draw();}
    }*/
};

/*let action = {
    place: new Image(),
    width: 50,
    height: 50,
    init: function(){this.place.src = "place.png";},
    draw: function(key){
        if(key == " "){this.place, player.x, player.y, player.
            width, player.height;}
        },
    }
*/
let game = {
    background: new Image(),
    init: function(){
        this.background.src = "background.png";
        player.init();
    },
    draw: function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        player.draw();
    }
}


function animate(){
    game.draw();
    requestAnimationFrame(animate);
    /*if (key ==  " "){action.draw;}*/
}

window.addEventListener("keydown", function(event){
    console.log(event);
    player.move(event.key);
});

window.addEventListener("keypress", function(e){
    console.log(e);
    game.draw(e.key)
});

game.init();
animate();