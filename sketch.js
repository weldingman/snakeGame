var agent;
var food;
var gameStatus = true;
var tail = [];
var tempPos;
var tempTail = [];

function setup() {
  createCanvas(400, 400);
  agent = {x:200, y:200, w:10, h:10, posX:0, posY:0, 
             speed:0.5,   dirX:0, dirY:0, score:0, tail:[]};
  food = {x:int(random(0,40)) * 10, 
          y:int(random(0, 40)) * 10, s:10};
  tempPos = {x:agent.posX, y:agent.posY};
}

function draw() {
  background(0);
  show();
  move();
  updateFood();
  showTail();
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
  if(agent.posX != tempPos.x || agent.posY != tempPos.y){
    
    // console.log(tempTail);
    
    if(tail.length > 0){
      tail[0].x = tempPos.x;
      tail[0].y = tempPos.y;
      
    }
    
    // tempTail = [...tail];
    tempPos.x = agent.posX;
    tempPos.y = agent.posY;
    shiftTail();
  }
}

function showTail(){
  for(var i = 0; i < tail.length; i++){
    fill("light_green");
    rect(tail[i].x, tail[i].y, agent.w, agent.h);
  }
}

function shiftTail(){
  var arr = [...tail]
  for(var i = 1; i < tail.length; i++){
    tail[i] = arr[i-1];
    // tempTail[i] = arr[i - 1];
  }
}

function updateFood(){
  fill("red");
  rect(food.x, food.y, food.s, food.s);
  if(food.x == agent.posX && food.y == agent.posY){
    food.x = int(random(1,39)) * food.s;
    food.y = int(random(1,39)) * food.s;
    agent.score += 1;
    agent.speed += 0.1;
    if(tail.length == 0){
      tail.push({x:agent.posX, y:agent.posY});
      tempTail.push(tail[tail.length - 1]);
    }
    else{
      tail.push(tail[tail.length - 1]);
      tempTail.push(tail[tail.length - 1]);
      // console.log(tempTail);
      // console.log(tail);
      // console.log(agent);
    }
  }
}

function show(){
  fill(255);
  textSize(30);
  text(agent.score, 300, 30);
  fill("white");
  rect(agent.posX, agent.posY, agent.w, agent.h);
}