var PLAY = 1 ;
var END = 0;
var GS= PLAY ;
var trex, trex_running,colition, edges;
var groundImage,ground;
var invisble;
var cielo;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cielo= loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  colition = loadImage ("trex1.png")
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("tirex",colition)
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  ground=createSprite(200,180,300,10);
  ground.addImage ("ground2",groundImage);

  invisible=createSprite (170,200,300,10);
  invisible.visible = false;
 nubes=new Group ();
 cactuss=new Group ();
 score=0 
}


function draw(){
  //establecer color de fondo.
  background("white");
  if (GS === PLAY ) {
 text("score:   "+score,450,100)
    ground.velocityX =-3; 
    //Mover aqui conteo de puntos 
    score = score + Math.round(frameCount/60);
    //Mover aqui puntuacion
      
    //Mover aqui ciclo de repeticion de suelo
     if (ground.x < 0 ){
    ground.x = ground.width/2
  }  
    //Mover aqui salto de trex
   if(keyDown("space")&& trex.y >= 150 ){
    trex.velocityY = -10;
  }    
    //Mover aqui efecto gravedad  
   trex.velocityY = trex.velocityY + 0.5;    
    //Mover aqui nubes
   clouds(); 
    //Mover aqui obstaculos
   cactus(); 
    //Establecer cambio de estado de juego GS
        if (cactuss.isTouching(trex)  ) {
          GS=END ;
        }
        
    } else if (GS === END ){
    ground.velocityX = 0;
    cactuss.setVelocityXEach(0); 
    nubes.setVelocityXEach(0);
    trex.changeAnimation("tirex",colition);

        //Establecer aqui movimiento 0 del suelo
    
    }
  
  //cargar la posición Y del Trex
  console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
 
  
 
  
  //evitar que el Trex caiga
  trex.collide (invisible)
  
  
  drawSprites();
}
function clouds(){
  if(frameCount % 80 === 0){
    cloud=createSprite(600,50,30,10);
    cloud.velocityX=-3;
    cloud.addImage(cielo);
    cloud.scale= 0.8;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloud.y = Math.round(random(10,60));
    cloud.lifetime =210;
    nubes.add(cloud);
  }
 
}
function cactus(){
if(frameCount %80 === 0 ){
  var obstaculos = createSprite(600,160,20,50);
  var rand = Math.round (random(1,6));
 obstaculos.velocityX=-5;
 switch (rand) {
   case 1 : obstaculos.addImage(cactus1);
   break;
   case 2 : obstaculos.addImage(cactus2);
   break;
   case 3 : obstaculos.addImage(cactus3);
   break;
   case 4 : obstaculos.addImage(cactus4);
   break;
   case 5 : obstaculos.addImage(cactus5);
   break;
   case 6 : obstaculos.addImage(cactus6);
   break;
   default:break;
 }
 obstaculos.scale = 0.5 ;
 obstaculos.lifetime =250;
 obstaculos.depth = trex.depth; trex.depth = trex.depth +1 ;
 cactuss.add (obstaculos);
}
}