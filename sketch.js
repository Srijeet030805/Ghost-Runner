var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlockGroup,invisibleBlock;
var gameState;
var PLAY=0,END=1;
var spookySound;
var score;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
  gameState=PLAY;
  score=0;
}

function draw(){
  background(0);
  score+= Math.round(getFrameRate()/60);
  if(tower.y>400)
  {
    tower.y=300;
  }
  if(gameState===PLAY){
  spawnDoors();
  spawnClimbers();
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  } 
  
  ghost.velocityY+=0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)    ||ghost.y>600){
    ghost.destroy();
  }
  }
  if(gameState===END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
  drawSprites();
}

function spawnDoors(){
  if(frameCount%240==0)
  {
    door= createSprite(200,-50);
    door.addImage(doorImg);
    door.x= Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    door.depth=ghost.depth;
    ghost.depth++;
    doorGroup.add(door);
  }
}

function spawnClimbers(){
  if(frameCount%240==0){
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;    
    climber.depth=ghost.depth;
    ghost.depth++;
    climberGroup.add(climber);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
  
  
  
  
  
  
  
