//declaring sprites
var treasureBox,treasureBoxImage;
var ant,antImage;
var diamond,diamondImage;
var crown,crownImage;
var scenary,scenaryImage;

//declaring groups
var antGroup,diamondGroup,crownGroup;

//declaring score and points
var score;
var crownTaken;

//gameStates
var START=1;
var PLAY=2;
var END=0;
var gameState=START;

function preload(){
treasureBoxImage=loadImage("treasure.jpg");
antImage=loadImage("ant.png");
diamondImage=loadImage("diamond.png");
crownImage=loadImage("crowny.png");
scenaryImage=loadImage("scenary.jpg")
}

function setup() {
createCanvas(600,600);
  
//creating groups
antGroup=createGroup();
crownGroup=createGroup();
diamondGroup=createGroup();
  
//creating scenary
scenary=createSprite(300,300,600,600);
scenary.addImage(scenaryImage);
scenary.velocityX=-4;
scenary.x=scenary.width/2;
  
//creating treasure box
treasureBox=createSprite(10,580,10,10);
treasureBox.addImage(treasureBoxImage);
treasureBox.scale=0.1;
  
//score
score=10;
  
//crownTaken
crownTaken=0;

}

function draw() {
background("green");

if (gameState==START){
scenary.visible=false;
treasureBox.visible=false;
antGroup.visible=false;
diamondGroup.visible=false;
crownGroup.visible=false;
  
stroke("yellow");
fill("yellow");
textSize(30);
text("CATCH THE TREASURE",170,50);
text("INSTRUCTIONS :",10,210);
text("BEST OF LUCK !!",200,530);
  
stroke("white");
fill("white");
textSize(20);
text("Hi players!! You guys need to help me out to find my treasure",10,100);
text("1.Press'S'to start the game",10,270);
text("2.You have mouse control to catch the treasure",10,300);
text("3.if you catch crown your score will increase to +2",10,330);
text("4.if you catch diamond your score will increase to +1",10,370);
text("5.if you catch ant your score will decrease to -3",10,410);
text("6.if your score is zero you will lose the game",10,470);
  
if(keyDown("s")){
gameState=PLAY; 
}
}
  
if(gameState==PLAY){
  
scenary.visible=true;
antGroup.visible=true;
diamondGroup.visible=true;
crownGroup.visible=true;
treasureBox.visible=true;
  
//scrolling scenary
if (scenary.x < 0){
scenary.x = scenary.width/2;
}
 
//moving treasure box
treasureBox.x=World.mouseX;
  
//declaring functions
spawnCrown();
spawnDiamond();
spawnAnt();
  

  
for(i=0;i<crownGroup.length;i++){
if(crownGroup[i].isTouching(treasureBox)){
crownGroup[i].destroy();
score=score+2;
crownTaken=crownTaken+1;
}
}
  
for(i=0;i<diamondGroup.length;i++){
if(diamondGroup[i].isTouching(treasureBox)){
diamondGroup[i].destroy();
score=score+1;
}
}
  
for(i=0;i<antGroup.length;i++){
if(antGroup[i].isTouching(treasureBox)){
antGroup[i].destroy();
score=score-3;
}
}
  
if(score<=0){
gameState=END;
}
  
}

if(gameState==END){

scenary.visible=false;
treasureBox.visible=false;
antGroup.visible=false;
diamondGroup.visible=false;
crownGroup.visible=false;
  

  
stroke("yellow");
fill("yellow");
textSize(30);
text("YOU LOSE!!",170,300);
}
  

  

  
drawSprites(); 
//displaying score
stroke("black");
fill("black");
textSize(18);
text("SCORE :"+score,450,200);
text("CROWN TAKEN:"+crownTaken,400,260);
}

function spawnCrown()
{
if(World.frameCount%80==0){
crown=createSprite(300,0,10,10);
crown.addImage(crownImage);
crown.y=Math.round(random(10,600));
crown.x=Math.round(random(10,600));
crown.scale=0.1;
crown.velocityY=4;
crown.lifetime=300;
crownGroup.add(crown);
}
}

function spawnDiamond()
{
if(World.frameCount%70==0){
diamond=createSprite(300,0,10,10);
diamond.addImage(diamondImage);
diamond.y=Math.round(random(10,600));
diamond.x=Math.round(random(10,600));
diamond.scale=0.1;
diamond.velocityY=4;
diamond.lifetime=300;
diamondGroup.add(diamond);
}
}

function spawnAnt()
{
if(World.frameCount%80==0){
ant=createSprite(300,0,10,10);
ant.addImage(antImage);
ant.y=Math.round(random(10,600));
ant.x=Math.round(random(10,600));
ant.scale=0.1;
ant.velocityY=4;
ant.lifetime=300;
antGroup.add(ant);
}
}