//https://www.red3d.com/cwr/boids/

var boids = [];

var amount = 200;

var canvas;

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    for (let i = 0; i < amount; i++) {
        boids.push(new Boid());
    }

}

function draw() {
    background(201);

    boids.forEach(boid => {
        boid.edges();
        boid.flock(boids);
        boid.show();
        boid.update();
    });

}