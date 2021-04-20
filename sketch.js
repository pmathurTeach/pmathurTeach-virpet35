var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background("olive");
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(14);
  fill(0);
  text("Press UP ARROW Key To Feed Milk!",150,150,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}