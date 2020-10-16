var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, object, objectImage;
var foodGroup, objectGroup,food,objects;
var score=0;
var ground,groundImage ;
var rImage,rsImage,r,rs;
var dieSound,jumpSound;

function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
objectImage = loadImage("obstacle.png");
rImage=loadImage("r.png");
rsImage=loadImage("rs.png");  
groundImage = loadImage("ground.png");  
jumpSound=loadSound("a.mp3");
dieSound = loadSound("b.mp3");
}


function setup() {
monkey = createSprite(50,340,20,10);  
monkey.addAnimation("running",monkey_running)
monkey.scale=0.2;  
 
ground = createSprite(10,395,20,10);  
ground.addImage(groundImage) 

r=createSprite(232,220,20,20);
r.addImage(rImage);
r.scale=0.5;   
  
foodGroup=new Group();
objectGroup=new Group();}


function draw() {
background("white");
text("Survival Time: "+ score, 300,10);  
monkey.collide(ground);  
  
if(gameState===PLAY){
ground.velocityX=-5; 
if (ground.x < 0){
ground.x = ground.width/2;}
 
score = score + Math.round(getFrameRate()/60);  
  
if(keyDown("space") && monkey.y>=325){
monkey.velocityY=-15;
jumpSound.play();
}  
monkey.velocityY = monkey.velocityY+0.6; 
  
if(monkey.isTouching(foodGroup)){
banana.destroy();} 
  
if(monkey.isTouching(objectGroup)){
gameState=END;
dieSound.play();
}   
monkey.visible=true;
r.visible=false;  
  
food();
objects();}
  
if(gameState===END){
r.visible=true;
text("GAMEOVER",200,200) 
foodGroup.destroyEach();
objectGroup.destroyEach(); 
monkey.visible=false; 
ground.velocityX=0;
  
if(mousePressedOver(r)) {
reset();}}  
drawSprites();}

function reset(){
gameState=PLAY;
r.visible=false;  
foodGroup.destroyEach();
objectGroup.destroyEach(); 
score=0;  
}

function food(){
if(frameCount % 100 === 0){
banana = createSprite(50,340,20,10);   
banana.velocityX = -5 
banana.y=Math.round(random(100,250));
banana.x=Math.round(random(399,395));   
banana.addImage(bananaImage);  
banana.lifetime=200;
foodGroup.add(banana);  
banana .scale=0.1;    
}  
}

function objects(){
if(frameCount % 300 === 0){
object = createSprite(50,340,20,10);   
object.velocityX = -5 
object.y=Math.round(random(380,390));
object.x=Math.round(random(399,395));   
object.addImage(objectImage);  
object.lifetime=200;
objectGroup.add(object);  
object .scale=0.2;    
}  
}




