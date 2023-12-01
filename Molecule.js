let MoleculeTypes = {
    Eau: {
        mass:18,
        color: [0,100,255]
    },
    //pour chercher ex: eau masse moleculaire
    //copier pour ajouter
    // Eau: {
    //     mass:18,
    //     color: [0,100,255]
    // },
    Air: {
        mass:29,
        color: [200,200,255]
    },
    Mercure: {
        mass:200,
        color: [200,200,255]
    },
    Carbone: {
        mass:12,
        color: [80,60,90]
    },
    Argon: {
        mass:40,
        color: [200,180,40]
        },
}

class Molecule {
    constructor(x,y, vx, vy, type ,i) {
        this.i = i;

        this.x = x;
        this.y = y;

        this.vx =  vx;
        this.vy =  vy;
        
        this.type = type;

        this.mass = MoleculeTypes[type].mass
    
        this.color = this.selectColor();

        this.size = map(this.mass, 0, 200, 10, 40)
    }

    selectColor() {
        return color(
            MoleculeTypes[this.type].color[0],
            MoleculeTypes[this.type].color[1],
            MoleculeTypes[this.type].color[2]
        );
        //     random(0, 255),
        //     random(0, 255),
        //     random(0, 255)
        //);
    }


    draw() {


        noStroke();
        fill(this.color);
        circle(this.x, this.y, this.size);

        if (DETAILS){
            stroke(0);
            let v = createVector(this.vx, this.vy)
            v.normalize();

            line(this.x,this.y,5 * TEMPERATURE * v.x + this.x,5 * TEMPERATURE * v.y + this.y);
            
        fill(150)
        textSize(10);
        text(
            
            "ID: " + this.i + "\n" +
            "Type: " + this.type + "\n" +
            "Mass: " + this.mass.toFixed(2) + "u\n",
            this.x-15,
            this.y-30
        );
        }
    }

    move() {
        this.x = this.x + this.vx * TEMPERATURE;
        this.y = this.y + this.vy * TEMPERATURE;

        if (this.x > width || this.x < 0){
            this.vx = -this.vx * 0.95
        }

        if (this.y > height || this.y < 0){
            this.vy = -this.vy * 0.95
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
        
            if (d < this.size/2 + molecules[i].size/2) {

                let sumX = this.vx + molecules[i].vx;
                let sumY = this.vy + molecules[i].vy;

                
                this.vx = -sumX/2;
                this.vy = -sumY/2;

                molecules[i].vx = sumX/2;
                molecules[i].vy = sumY/2;

                this.move();
                this.move();
                this.move();

                this.color = this.selectColor();

            }
        }

    }
}