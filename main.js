import {Snake} from "./snake.js";
import {FoodGenerator} from "./foodGenerator.js";

let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

let foodGenerator = new FoodGenerator(canvas.width, canvas.height);
let snake = new Snake(canvas);
let sounds = [new Audio("./sounds/collectFood.mp3"),
    new Audio("./sounds/death.mp3")];

let gameLoop;
let gameState = "start";

setControls();
foodGenerator.generateFood(20);

draw(); // initial draw

function setControls(){
    document.addEventListener("keypress", function (e){
        switch (e.code){
            case "KeyW":
                if (snake.ySpeed <= 0){
                    snake.move(0, -1);
                }
                break;
            case "KeyS":
                if (snake.ySpeed >= 0){
                    snake.move(0, 1);
                }
                break;
            case "KeyA":
                if (snake.xSpeed <= 0){
                    snake.move(-1, 0);
                }
                break;
            case "KeyD":
                if (snake.xSpeed >= 0){
                    snake.move(1, 0);
                }
                break;
            case "Enter":
                if (gameState !== "play"){
                    reset();
                    gameState = "play";
                }
                break;
        }
    })
}

function reset(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.reset();
    gameLoop = setInterval(update, 1000/10);
}

function update(){
    snake.update();
    if (snake.eat(foodGenerator.Food)){
        sounds[0].play();
        foodGenerator.generateFood(20);
        for (let i = 0; i < snake.body.length; i++){
            while (foodGenerator.food.x === snake.x && foodGenerator.food.y === snake.y){
                foodGenerator.generateFood(20);
            }
        }
    }

    if (snake.isDead()){
        gameState = "gameOver";
        clearInterval(gameLoop);
        sounds[1].play();
    }
    draw();
}

function draw(){
    displayBackground();

    switch (gameState){
        case "start":
            displayStartScreen();
            break;
        case "gameOver":
            snake.render(canvasContext);
            foodGenerator.renderFood(canvasContext);
            displayGameOver();
            break;
        case "play":
            if (!snake.xSpeed && !snake.ySpeed){
                console.log("in it");
                displayControls();
            }
            snake.render(canvasContext);
            foodGenerator.renderFood(canvasContext);
            break;
    }


}

function displayGameOver(){
    canvasContext.fillStyle = "#B32222";
    canvasContext.font = "50px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    canvasContext.fillText(`Score - ${snake.pixelCount}`, canvas.width/2, canvas.height-230);
    canvasContext.font = "15px Arial";
    canvasContext.fillText('Press ENTER to restart', canvas.width/2, canvas.height-200);
}

function displayStartScreen(){
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Welcome To Snake", canvas.width/2, canvas.height/2);
    canvasContext.font = "25px Arial";
    canvasContext.fillText("Press ENTER to start...", canvas.width/2, canvas.height-230);
}

function displayBackground(){
    canvasContext.fillStyle = "#2F4F4F";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function displayControls(){
    canvasContext.fillStyle = "white";
    canvasContext.font = "30px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Use WASD to move", canvas.width/2, 100);
}