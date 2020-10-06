var agent;
var food;

function setup() {
  createCanvas(400, 400);
  agent = {x:200, y:200, w:10, h:10, posX:0, posY:0, 
             speed:0.5,   dirX:0, dirY:0, score:0};
  food = {x:int(random(0,40)) * 10, 
          y:int(random(0, 40)) * 10, s:10};
}

function draw() {
  background(0);
  show();
	move();
  updateFood();
}

function mouseClicked() {
	var dirSelectX = mouseX - agent.x;
	var dirSelectY = mouseY - agent.y;
  if(dirSelectX > dirSelectY && dirSelectY > 0){
	agent.dirX = 1;
	agent.dirY = 0;
  }
  if(dirSelectX > -dirSelectY && dirSelectY < 0){
	agent.dirX = -1;
	agent.dirY = 0;
  }
  if(dirSelectY > dirSelectX && dirSelectX > 0){
	agent.dirX = 0;
	agent.dirY = 1;
  }
  if(dirSelectY > -dirSelectX && dirSelectX < 0){
	agent.dirX = 0;
	agent.dirY = -1;
  }
  return false;
}


function move(){
  if(keyIsDown(LEFT_ARROW)){
    agent.dirX = -1;
    agent.dirY = 0;
  }
  if(keyIsDown(RIGHT_ARROW)){
    agent.dirX = 1;
    agent.dirY = 0;
  }
  if(keyIsDown(UP_ARROW)){
    agent.dirX = 0;
    agent.dirY = -1;
  }
  if(keyIsDown(DOWN_ARROW)){
    agent.dirX = 0;
    agent.dirY = 1;
  }
  
  agent.x += agent.dirX * agent.speed;
  agent.y += agent.dirY * agent.speed;
  agent.posX = int(agent.x / agent.w) * agent.w;
  agent.posY = int(agent.y / agent.h) * agent.h;
}

function updateFood(){
  fill("green");
  rect(food.x, food.y, food.s, food.s);
  if(food.x == agent.posX && food.y == agent.posY){
    food.x = int(random(1,39)) * food.s;
    food.y = int(random(1,39)) * food.s;
    agent.score += 1;
    agent.speed += 0.1;
  }
}

function show(){
  fill(255);
  textSize(30);
  text(agent.score, 300, 30);
  fill(111, 237, 38);
  rect(agent.posX, agent.posY, agent.w, agent.h);
}
