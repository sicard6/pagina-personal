class Boid {

    constructor() {
        this.r = 8;
        //this.position = createVector(random(width), random(height));
        this.position = createVector(width / 2, height / 2);
        this.velocity = p5.Vector.random2D();
        this.aceleration = createVector();
        this.velocity.setMag(random(1, 5));
        this.maxForce = 0.05;
        this.perseptionRad = 100;
        this.maxSpeed = 4;

    }

    // what happens if a boid exceeds the edge of the screen.
    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < -5) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < -5) {
            this.position.y = height;
        }
    }

    //applies the flock fisics to the boid.
    flock(boids) {
        let alignment = this.align(boids); //force 1
        let cohesion = this.cohesion(boids); // force 2
        let separation = this.separation(boids); // force 3
        //let all = this.allInOne(boids);
        let mouserepell = this.mouserepell(); //force 4

        mouserepell.mult(5);
        separation.mult(1.2);

        this.aceleration.add(cohesion);
        this.aceleration.add(alignment);
        this.aceleration.add(separation);
        //this.aceleration.add(all);
        this.aceleration.add(mouserepell);

    }

    //essential function that align the boid with it's neighbours (velocity).
    align(boids) {
        let avg = createVector(); // average from other vectors boids (velocities)
        let total = 0;
        boids.forEach(boid => {
            if (boid != this && this.position.dist(boid.position) < this.perseptionRad) {
                avg.add(boid.velocity);
                total++;
            }
        });
        // avg becomes the steering in witch the boid is boing to head into.
        if (total > 0) {
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    //essential function that align the boid with it's neighbours average positions.
    cohesion(boids) {
        let avg = createVector(); // average from other vectors boids (position)
        let total = 0;
        boids.forEach(boid => {
            if (boid != this && this.position.dist(boid.position) < this.perseptionRad) {
                avg.add(boid.position);
                total++;
            }
        });
        // avg becomes the steering in witch the boid is boing to head into (positions).
        if (total > 0) {
            avg.div(total);
            avg.sub(this.position);
            avg.sub(this.velocity);
            avg.setMag(this.maxSpeed);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    //essential function that align the boid with it's neighbours negative average positions.
    separation(boids) {
        let avg = createVector(); // average from other vectors boids (position)
        let total = 0;
        boids.forEach(boid => {
            let d = this.position.dist(boid.position);
            if (boid != this && d < this.perseptionRad && d != 0) {
                let force = p5.Vector.sub(this.position, boid.position);
                force.div(d * 0.005);
                avg.add(force);
                total++;
            }
        });
        // avg becomes the steering in witch the boid is boing to head into (positions).
        if (total > 0) {
            avg.div(total);
            avg.sub(this.velocity);
            avg.setMag(this.maxSpeed);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    //all flocking for optimization process
    allInOne(boids) {
        let avg = createVector();
        let total = 0;
        boids.forEach(boid => {
            let d = this.position.dist(boid.position);
            if (boid != this && d < this.perseptionRad) {

                //align
                avg.add(boid.velocity);

                //separation
                let force = p5.Vector.sub(this.position, boid.position);
                force.div(d * 0.005);
                avg.add(force);

                //cohesion
                avg.add(boid.position);

                total++;
            }
        });

        if (total > 0) {
            //align
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);

            //separation
            avg.div(total);
            avg.sub(this.position);
            avg.sub(this.velocity);
            avg.setMag(this.maxSpeed);
            avg.limit(this.maxForce);

            //cohesion
            avg.div(total);
            avg.sub(this.position);
            avg.sub(this.velocity);
            avg.setMag(this.maxSpeed);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    //forces that repell the cursor.
    mouserepell() {
        let avg = createVector(); // average from other vectors boids (position)
        let mousPosition = createVector(mouseX, mouseY);
        let d = this.position.dist(mousPosition);
        if (d < this.perseptionRad) {
            let force = p5.Vector.sub(this.position, mousPosition);
            force.mult((1 / d));
            avg.add(force);
        }
        // avg becomes the steering in witch the boid is boing to head into (positions).
        avg.setMag(this.maxSpeed);
        avg.limit(this.maxForce);
        return avg;
    }

    //Shows the boid
    show() {

        //let angle = atan2(mouseY - this.position.y, mouseX - this.position.x) + PI / 2;
        let angle = this.velocity.heading() + PI / 2;

        //Display the arrow
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        //fill(102, 0, 204);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        pop();
    }
    //update the boid given the velocity and aceleration of the particle.
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.aceleration);
        this.velocity.limit(this.maxSpeed);
        this.aceleration.mult(0);

    }

}