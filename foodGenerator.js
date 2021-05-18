import {Food} from "./food.js";

export class FoodGenerator{
    // Private
    food;

    // Public
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    get Food(){
        return this.food;
    }

    set Food(food){
        this.food = food;
    }

    generateFood(scale){
        this.Food = new Food(this.getRandomInteger(0, this.canvasWidth/scale, scale),
            this.getRandomInteger(0, this.canvasHeight/scale, scale),
            scale);
    }

    renderFood(canvasContext){
        this.Food.render(canvasContext);
    }

    // Private
    getRandomInteger(min, max, scale) {
        scale.toFixed(2);
        return Math.abs((Math.floor(Math.random() * (max - min + 1) ) + min) * scale - scale);
    }
}

// TODO Make the food spawn only on the ground and not on the snake