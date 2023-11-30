class Molecule {
    constructor(x,y,i) {
        this.i = i;

        this.x = x;
        this.y = y;

        this.vx =  random(-3, 3);
        this.vy =  random(-3, 3);
        
        this.mass = random(7, 19);
    
        this.color = this.selectColor();
    }

    selectColor() {
        return color(
            random(0, 255),
            random(0, 255),
            random(0, 255)
        );
    }


    draw() {


        noStroke();
        fill(this.color);
        circle(this.x, this.y, this.mass)

        if (DETAILS){
            
        fill(150)
        textSize(10);
        text(
            
            "ID: " + this.i + "\n" +
            "Mass: " + this.mass.toFixed(2) + "Kg\n",
            this.x-15,
            this.y-30
        );
        }
    }

    move() {
        this.x = this.x + this.vx * TEMPERATURE;
        this.y = this.y + this.vy * TEMPERATURE;

        if (this.x > width || this.x < 0){
            this.vx = -this.vx
        }

        if (this.y > height || this.y < 0){
            this.vy = -this.vy
        }
        this.x = min(max(this.x, 0), width);
        this.y = min(max(this.y, 0), height);
    }

    collision(molecules) {
        for (let i = 0; i < molecules.length; i++) {
            if (this.i === molecules[i].i) continue;
            
            let d = dist(
                this.x,
                this.y,
                molecules[i].x,
                molecules[i].y
            );
            
            if (d < this.mass/2 + molecules[i].mass/2) {
                this.vx = -this.vx;
                this.vy = -this.vy;

                this.move();

                this.color = this.selectColor();

            }
        }

    }
}