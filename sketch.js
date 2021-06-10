var monkey, bananaGroup, backGround, invisibleground, obstacles, stoneGroup, monkeycol, speed;

var monkeyImg, bananaImg, backGroundImg, obstaclesImg, collided;

var score, gamestate, PLAY, END, INITIAL, col;

function preload() {

  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  backGroundImg = loadImage("jungle.jpg");

  bananaImg = loadImage("banana.png");

  obstaclesImg = loadImage("stone.png");
  
  collided = loadImage("Monkey_05.png");

}

function setup() {
  createCanvas(600, 400);


  backGround = createSprite(200, 150);
  backGround.addImage("backGroundImg", backGroundImg);
  backGround.scale =1.2

 
  invisibleground = createSprite(width / 2, 390, width, 10);
  invisibleground.visible = false;

  
  monkey = createSprite(80, 340);
  monkey.addAnimation("collided",collided);
  monkey.addAnimation("monkeyImg", monkeyImg);
  
  monkey.scale = 0.13;

 
  score = 0;

  
  gamestate = 1;
  PLAY = 1;
  END = 0;

 
  bananaGroup = createGroup();
  stoneGroup = createGroup();

  
  speed = -8;

  
  col = 0;
}

function draw() {
  background(220);


 
  if (gamestate === PLAY) {
    
    monkey.changeAnimation("monkeyImg");

   
    backGround.velocityX = -5;

    if (backGround.x < 0) {
      backGround.x = backGround.width / 2;
    }

    
    if (keyWentDown("space") && monkey.collide(invisibleground)) {
      monkey.velocityY = -20;
    }

   
    monkey.velocityY = monkey.velocityY + 1;

    
    spawnBananas();
    spawnObstacles();

    
    score = score + Math.round((getFrameRate() / 60));

  }

  
  monkey.collide(invisibleground);

 
  if (gamestate === END) {
    backGround.velocityX = 0;

    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);

    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);

    monkey.velocityY = 0;
    
    monkey.changeAnimation("collided",collided);

  }

  if (keyWentDown("r") && gamestate === END) {
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    monkey.scale = 0.13;
    col = 0;
  }

  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    speed = speed - 0.5;
    score = score + 20;
    col = 0;

  }

  
  switch(score){
    case 10: monkey.scale=0.15;
      break;
      case 50: monkey.scale=0.17;
      break;
      case 90: monkey.scale=0.19;
       break;
      case 140: monkey.scale=0.20;
       break;
      case 200: monkey.scale=0.21;
       break;
       default:break;
      
      
  }

  
  if (col === 2) {
    gamestate = END;
  }

 
  if (stoneGroup.isTouching(monkey)) {
    stoneGroup.destroyEach();
    monkey.scale = 0.13;
    score = score - 50;
    col += 1;
  }

  drawSprites();

 
  fill("White");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 500,50);
}
function spawnObstacles(){
  if (frameCount%80===0){
    var obstacles = createSprite(width,360);
    obstacles.addImage("obstaclesImg",obstaclesImg);
    obstacles.scale = 0.18;
    obstacles.velocityX=speed-2;
    obstacles.lifetime=130;
    stoneGroup.add(obstacles);
  }
}
function spawnBananas(){
  if (frameCount%125===0){
    var banana = createSprite(width+30,random(220,350));
    banana.addImage("bananaImg",bananaImg);
    banana.scale=0.06;
    banana.velocityX=speed;
    banana.lifetime=130;
    bananaGroup.add(banana);
  }
}