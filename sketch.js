var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var hora;

//crea aquí las variables feed y lastFed 
var feed;
var lastFed = 0;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //crea aquí el boton Alimentar al perro
  feedButton = createButton("Alimentar al perro");
  feedButton.position(800, 125);
  feedButton.mousePressed(feedDog);

  addFood = createButton("Agregar Alimento");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos


  //escribe el código para mostrar el texto lastFed time aquí
  fill("black");
  textSize(12);

  if (lastFed >= 12) {
    //muestra la hora en formato PM cuando lastFed sea mayor que 12
  } else if (lastFed == 0) {
    text("Última hora en que se alimentó : " + hora, 350, 30);
  } else {
    //muestra la hora en formato AM cuando lastFed sea mayor que 12
  }


  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  hora = hour();
  foodS = foodS - 1;
  database.ref('/').update({
    Food: foodS,
    FeedTime: hora
  })
}

//funcón para agregar alimento al almacén
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
