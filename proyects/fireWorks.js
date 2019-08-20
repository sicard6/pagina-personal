var fireworks =[];
var g = 0.4;
var cohetes = 10;
var rocketSound;
var crakersSound;

function preload() {
  soundFormats('wav');
  crakersSound = loadSound('assets/Fire_Crackers.wav');
  rocketSound = loadSound('assets/Rocket.wav');
}

function setup() {
	createCanvas(1024,620);
	for (var i = 0; i < cohetes; i++) {
		fireworks[i]= create();
	}
	crakersSound.setVolume(0.1);
	rocketSound.setVolume(0.01);
	frameRate(120);
}

function draw() {
	background(0,15);
	
	for (var i = 0; i < fireworks.length; i++) {
		if (offScreen(fireworks[i]))
		{
			fireworks[i] = create();
		}
		fireworks[i].view();
	}



}

function offScreen(cohet)
{
	return cohet.y > height + 600;
}

function create(){
	rocketSound.play();
	var c = color(random(255),random(255),random(255));
	var vel = random(-22,-14);
	var tempX = random(width);
	var tempY = random(height , height + 25);
	return new firework(c,vel, g, tempX , tempY);
}
