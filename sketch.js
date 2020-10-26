
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, bananaBasket;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,200);
  monkey = createSprite(50,150,10,10);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,180,1200,5);
  ground.velocityX = -2;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  bananaBasket =0;
  monkey.setCollider("circle",-100,0,monkey.width/2)

  
}


function draw() {
  background("white");
  monkey.collide(ground);
  text("Bananas in Basket: "+bananaBasket,10,40);
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    bananaBasket++;
  }
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y>135){
    monkey.velocityY = -10;
    console.log(monkey.velocityY);
  }
  console.log(monkey.velocityY);
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(frameCount%80===0){
    banana = createSprite(600,50,10,10);
    banana.y = Math.round(random(30,100));
    FoodGroup.add(banana);
    banana.velocityX = -2;
    banana.addImage("bananaImg",bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
    //monkey.depth =banana.depth +1;
  }
    if(frameCount%300===0){
    obstacle = createSprite(600,160,10,10);
    obstacle.velocityX = -2;
    obstacle.addImage("obstacleImage",obstacleImage);
    //banana.scale = 0.1;
    obstacle.lifetime = 300;
    monkey.depth =obstacle.depth +1;
    obstacle.scale =0.1;
    obstacle.rotation = 15;
    obstaclesGroup.add(obstacle);
  }
   if(obstaclesGroup.isTouching(monkey)){
     
     ground.velocityX = 0;
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
   }
  drawSprites();
  
}






