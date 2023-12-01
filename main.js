let molecules = [];
let N = 0;
let espaceBouton = 50;

let DETAILS = true;
let button;

let TEMPERATURE = 0.5
let slider;

let prevMouseX = 0;
let prevMouseY = 0;

let isDragging = false;
let currentType = "Eau"

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight - 50
    );

    button = createButton("Show Details")
        button.mousePressed(() => {
            DETAILS = !DETAILS;
        })

        console.log(MoleculeTypes);

        for (let typeName in MoleculeTypes) {
        createButton(typeName).mousePressed(() => {
            
            currentType = typeName;
        });
        }


    slider = createSlider(0.1 ,5, 0.1,0.01)
    slider.size(width-110);

    for (let i = 0; i < N; i++) {
        molecules[i] = new Molecule(
            random(0, width),
            random(0, height),
            random(-3, 3),
            random(-3, 3),
            i
        );
    }

    // molecules[0] = new Molecule(400, 400, 10, 10, 0);
    // molecules[1] = new Molecule(500, 500, -10, -10 ,1);
}

function draw() {
    background(51);

    TEMPERATURE = slider.value();
    //dessiner chaque molecule
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].draw();
        molecules[i].move();

        molecules[i].collision(molecules);


    }

    if (isDragging) {
        stroke(0);
        line(prevMouseX, prevMouseY, mouseX, mouseY)
    }

}


function mousePressed() { 
    console.log(mouseX, mouseY);

    prevMouseX = mouseX

    prevMouseY = mouseY


}

function mouseDragged(){

    if (mouseY > height - espaceBouton) return
    if (prevMouseY > height - espaceBouton) return

    isDragging = true;

    


}


function mouseReleased(){
    isDragging = false;
                            //peut changer
    if (prevMouseY > height - espaceBouton) return

    let dx = prevMouseX - mouseX;
    let dy = prevMouseY - mouseY;

    molecules.push(
        new Molecule(
            prevMouseX,
            prevMouseY,
            dx * 0.1,
            dy * 0.1,
            currentType,
            molecules.length
            )
        );
}