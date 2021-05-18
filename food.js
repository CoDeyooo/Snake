export class Food{
    constructor(x, y, scale){
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    render(canvasContext){
        canvasContext.fillStyle = "#33FF33";
        canvasContext.fillRect(this.x, this.y, this.scale, this.scale);
    }
}

