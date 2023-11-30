let molecules = [];
let N = 100;

let DETAILS = false;
let button;

let TEMPERATURE = 0.5
let slider;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight - 50
    );

    button = createButton("Show Details")
        button.mousePressed(() => {
            DETAILS = !DETAILS;
        })

    slider = createSlider(0.1 ,5, 0.1,0.01)
    slider.size(width-110);

    for (let i = 0; i < N; i++) {
        molecules[i] = new Molecule(
            random(0, width),
            random(0, height),
            i
        );

    }

    console.log(molecules);
}

function draw() {
    background(51);

    TEMPERATURE = slider.value();
    //dessiner chaque molecule
    for (let i = 0; i < N; i++) {
        molecules[i].draw();
        molecules[i].move();

        molecules[i].collision(molecules);

    }
}
