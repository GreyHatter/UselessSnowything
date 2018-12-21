class SnowFlake {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = z * 7 + 2;
        this.pos = createVector(x, y);
        //this.angle = random(0, 2 * PI);
        this.createVector();
        this.acc = [0, 0.001];
    }

    createVector() {
        this.z = random(0, 1);
        let speed = random(1, 3) * this.z;
        this.vel = createVector(0, speed);
        this.acc = [0, random(0.001, 0.005)];
    }

    draw() {
        //Bounds checking
        if (this.pos.y > height) {
            this.pos.y = random(0, height);
            this.createVector();
        }

        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);

        noStroke();
        fill(255, this.z * 120);
        rectMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.radius);
    }

}

class ChristmasTree {
    constructor() {
        this.stemWidth = 50;
        this.stemHeight = 100;
        this.treeWidth = 200;
        this.treeHeight = 500;

    }

    draw() {
        var topTree = createVector(width/2,height-this.stemHeight-this.treeHeight);
        beginShape();
        fill(0,255,0);
        vertex(width/2-this.treeWidth/2, height-this.stemHeight);
        vertex(topTree.x,topTree.y);
        vertex(width/2+this.treeWidth/2, height-this.stemHeight);
        endShape();

        fill(255,255,0);
        beginShape();
        let step = 2 * PI / 7;
        for(let i = 0; i < 14; i++) {
            let rad = 7 * (2*(i%2+1));
            let offset = -step/5;
            vertex(topTree.x + cos(step*i-offset) * rad, topTree.y + sin(step * i-offset)* rad);
        }
        endShape();
        fill(200, 100, 100);
        rectMode(CORNER);
        rect(width / 2 - this.stemWidth / 2, height - this.stemHeight, this.stemWidth, this.stemHeight);
    }
}

//variables
let snowballs;
let cmtree;
let hmsnowballs;

function setup() {
    createCanvas(600, 800);
    background(0);
    hmsnowballs = 1000;
    snowballs = new Array(snowballs);
    for (let i = 0; i < hmsnowballs; i++) {
        snowballs[i] = new SnowFlake(random(0, width), random(0, height), random(0, 1));
    }

    cmtree = new ChristmasTree();

}

function draw() {
    clear();
    background(0);

    //draw christmas tree
    cmtree.draw();
    //draw snow
    snowballs.map(function (x) {
        x.draw();
    });


}
