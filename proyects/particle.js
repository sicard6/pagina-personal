function particle(c , velocidad , gravedad , x, y) {
	this.c = c;
	this.gravedad = gravedad;
	this.velocidadx = random(-1,1)*velocidad;
	this.velocidady = random(-1,1)*velocidad;
	this.x = x;
	this.y = y;

	this.aplyForce = function()
	{
		this.velocidadx = this.velocidadx;
		this.velocidady = this.velocidady + this.gravedad;
	};

	this.move = function()
	{

		this.x = this.x + this.velocidadx;
		this.y = this.y + this.velocidady;
		
	};

	this.view = function()
	{
		this.aplyForce();
		this.move();
		noStroke(0);
		fill(c);
		ellipse(this.x,this.y,4,4);	
	};
} 