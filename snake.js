export class Snake{
    constructor(canvas){
        this.scale = 20;
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.body = [];
        this.pixelCount = 0;
    }

    update(){
        let lastIndex = this.body.length - 1;
        for (let i = 0; i < lastIndex; i++){
            this.body[i] = this.body[i+1];
        }

        if (this.pixelCount >= 1){
            this.body[this.pixelCount - 1] = {x:this.x,y:this.y};
        }

        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;

        if (this.x >= this.canvas.width){
            this.x = 0;
        }else if (this.x + this.scale <= 0){
            this.x = this.canvas.width;
        }

        if (this.y >= this.canvas.height){
            this.y = 0;
        }else if (this.y + this.scale <= 0){
            this.y = this.canvas.height;
        }
    }

    eat(food) {
        if (this.x === food.x && this.y === food.y) {
            this.pixelCount++;
            return true;
        }
        return false;
    }

    move(x,y){
        this.xSpeed = x;
        this.ySpeed = y;
    }

    isDead(){
       for (let i = 0; i < this.body.length; i++){
           if (this.body[i].x === this.x && this.body[i].y === this.y){
               return true;
           }
       }
       return false;
    }

    reset(){
        this.x = this.canvas.width/2 - this.scale;
        this.y = this.canvas.height/2 - this.scale;
        this.pixelCount = 0;
        this.body = [];
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    render(canvasContext){
        canvasContext.fillStyle = "white";
        for (let i = 0; i < this.body.length; i++){
            canvasContext.fillRect(this.body[i].x, this.body[i].y, this.scale, this.scale);
        }
        canvasContext.fillRect(this.x, this.y, this.scale, this.scale);
    }
}