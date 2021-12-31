
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var lava;
var pl1,pl2,pl3,pl4;

var ball;

var level_state = 1;
var no;
var finish;

function preload()
{
	no = loadSound('no.mp3');
	no.looping = false;
	finish = loadSound('finish.wav');
	finish.looping = false;
}

function setup() {
	createCanvas(1000, 500);


	engine = Engine.create();
	world = engine.world;

	let ball_options = {
		isStatic:false,
		restitution:0.3,
		friction:0,
		density:1.2
	   };

	//Create the Bodies Here.
	lava = new Lava(500,500,1000,20);

	pl1 = new Ground(80,420,150,20);
	pl2 = new Ground(400,350,150,20);
	pl3 = new Ground(680,250,150,20);
	pl4 = new Finish(920,210,150,20);

	ball = Bodies.circle(80,200,20,ball_options);
	World.add(world,ball);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  lava.show();
  pl1.show();
  pl2.show();
  pl3.show();
  pl4.show();

  gameOver();

  if (ball.position.x <= 10)
  {
	  ball.position.x = 15;
  }

  if (ball.position.x >= 990)
  {
	  ball.position.x = 985;
  }

  if (ball.position.x > 850 && ball.position.x > 200)
  {
	swal(
		{
		  title: `You won`,
		  text: "Thanks for playing!!",
		  icon: "succes",
		  confirmButtonText: "Play Again"
		},
		function(isConfirm) {
		  if (isConfirm) {
			location.reload();
		  }
		}
	  );
	  finish.play();
  }

  console.log(ball.position.x);
  ellipse(ball.position.x,ball.position.y,20);
  drawSprites();
 
}

function keyPressed()
{
	if (keyCode === UP_ARROW && ball.position.y <= 450) 
	{
		Matter.Body.applyForce(ball,ball.position,{x:0,y:-30});
	}

	if (keyCode === LEFT_ARROW && ball.position.y <= 450) 
	{
		Matter.Body.applyForce(ball,ball.position,{x:-15,y:0});
	}

	if (keyCode === RIGHT_ARROW && ball.position.y <= 450) 
	{
		Matter.Body.applyForce(ball,ball.position,{x:15,y:0});
	}
}

function gameOver()
{
	if (ball.position.y >= 470)
	{
		swal(
			{
			  title: `Game Over!!!`,
			  text: "Thanks for playing!!",
			  icon: "succes",
			  confirmButtonText: "Play Again"
			},
			function(isConfirm) {
			  if (isConfirm) {
				location.reload();
			  }
			}
		  );
		no.play();
	}
}
