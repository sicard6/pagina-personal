function firework(c , velocidad , gravedad , x, y) 
{
	this.c = c;
	this.gravedad = gravedad;
	this.velocidad = velocidad;
	this.x = x;
	this.y = y;
	this.particlesCount = 80;
	this.particles = [];
	this.exploto = false;
	this.aplyForce = function()
	{
		this.velocidad = this.velocidad + this.gravedad;
		
	};

	this.move = function()
	{
		this.aplyForce();
		this.y = this.y + this.velocidad;
		
	};

	this.view = function()
	{
		if (this.velocidad < 0 )
		{
			this.move();
			fill(255);
			noStroke();
			rect(this.x,this.y,3,10);		
		}else 
		{
			this.move();
			if (!this.exploto)
			{
				//console.log("entre");
				crakersSound.play();
				this.generate();
				this.exploto = true;
			}
			this.explode();
		}	

	};

	this.explode = function()
	{
		for (var i = 0; i < this.particlesCount; i++) {
			this.particles[i].view();
		}
	};
	this.generate= function ()
	{
		for (var i = 0; i < this.particlesCount; i++) {
			this.particles[i] = createParticle(this);
		}
	};
}

function createParticle(father){
	var vel = random(-10,10);
	var x = new particle(father.c,vel, father.gravedad, father.x , father.y);
	return x;
}
