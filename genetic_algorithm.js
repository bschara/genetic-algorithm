
var canvas = document.getElementById("genetic_algorithm");
var ctx = this.canvas.getContext("2d");

//canvas 
ctx.rect(0, 0, 800, 800);
ctx.lineWidth = 1;
ctx.strokeStyle = "#B2BEB5";
ctx.stroke();

//class circle
class Circle {
   constructor(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}




var generations = 100;
var population = 200;


//generate 25 random circles inside the canvas that dont collide
var counter = 0;
arr25Circles = [];
while (counter < 25) {
  cX = Math.floor(Math.random() * 800);
  cY = Math.floor(Math.random() * 800);
  cRad = Math.floor(Math.random() * 800);
  if (!areColliding(cX, cY, cRad) && circleInsideCanvas(cX, cY, cRad)) {
      arr25Circles[counter] = new Circle(cX, cY, cRad);
      drawCircle(ctx, cX, cY, cRad, "blue");
      counter++;
  }
}

//function to draw circle
function drawCircle(ctx, x, y, rad, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, rad, 0, 2 * Math.PI, this.counterclockwise);
  ctx.lineWidth = 2;
  ctx.fill();
}



//function to check if circle inside canvas
function circleInsideCanvas(x,y,rad){
  if (x + rad < 800 && x - rad > 0 && y + rad < 800 && y - rad > 0) {
    return true;
}
return false;
  }


//function to check if their is collision between two circle. 
function areColliding(x, y, radius) {
  for (var i = 0; i < arr25Circles.length; i++) {
      if (distBetweenTwoCircles(x, y, arr25Circles[i].x, arr25Circles[i].y) < radius + arr25Circles[i].radius) {
          return true;
      }
  }
  return false;
}

//fucntion to get distance between 2 circles
function distBetweenTwoCircles(x1, y1, x2, y2) {
  var side1 = Math.abs(x1 - x2);
  var side2 = Math.abs(y1 - y2);
  var dist = Math.sqrt(side1 * side1 + side2 * side2);
  return dist;
}

//transform circle params to binary digits
  function circleToBinary(x,y,radius){
    var xString = x.toString(2);
    var yString = y.toString(2);
    var radString = radius.toString(2);

    xString = AddZeros(xString);
    yString = AddZeros(yString);
    radString = AddZeros(radString);

    var circleName = xString + yString + radString;
    return circleName;

  }

  //add zeros to binary string
  function AddZeros(xBinary) {
    var remainingNum = 10 - xBinary.length;
    for (var i = 0; i < remainingNum; i++) {
      xBinary = "0" + xBinary;
    }
    return xBinary;
  }

  

  //change 0 to 1 in binary string
  function mutate(circString){

    for (var pos = 0; pos < circString.length; pos++) {
      if (circString.charAt(pos) == "0") {
          circString = circString.substring(0, pos) + "1" + circString.substring(pos + 1, circString.length);
      }
      else if (circString.charAt(pos) == "1") {
          circString = circString.substring(0, pos) + "0" + circString.substring(pos + 1, circString.length);
      }
  }
  return circString;;
  }

//generate first population



var counter = 0;
arr200Circles = [];
while (counter < 200) {
  cX = Math.floor(Math.random() * 800);
  cY = Math.floor(Math.random() * 800);
  cRad = Math.floor(Math.random() * 800);
  if (!areColliding(cX, cY, cRad) && circleInsideCanvas(cX, cY, cRad)) {
      arr200Circles[counter] = new Circle(cX, cY, cRad);
      counter++;
  }
}


  //function to generate population
  
  var solution  = new Circle(0,0,0);
  
  function generatePopulation(arrayOfCircles, biggestCircle){
    var childs = [];
    var validDesc = [];
    while (childs.length < population - 1) {
      var biggestInThisGen;
       var random1 = Math.floor(Math.random() * arrayOfCircles.length);
       var random2 = Math.floor(Math.random() * arrayOfCircles.length);
       var parent1 = arrayOfCircles[random1];
       var parent2 = arrayOfCircles[random2];

       parent1Binary = circleToBinary(parent1.x, parent1.y, parent1.radius);
       parent2Binary = circleToBinary(parent2.x, parent2.y, parent2.radius);

       validDesc = getChildren(parent2Binary, parent1Binary);
       if (!areColliding(validDesc[0].x, validDesc[0].y, validDesc[0].radius) && circleInsideCanvas(validDesc[0].x, validDesc[0].y, validDesc[0].radius)) {
           childs.push(validDesc[0]);
       }
       if (!areColliding(validDesc[1].x, validDesc[1].y, validDesc[1].radius) && circleInsideCanvas(validDesc[1].x, validDesc[1].y, validDesc[1].radius)) {
           childs.push(validDesc[1]);
       }
   }
   childs.sort(function (a, b)
   {
    return b.radius - a.radius 

     });  
     biggestInThisGen = childs[0];
   if (biggestInThisGen.radius > biggestCircle.radius) {
       solution = biggestInThisGen;
   }
   console.log(parent1, parent2);
   return childs;
}
    
//function to get children 
function getChildren(parent2, parent1) {
  var arrOfUnOrganizChildren = [];

 var position = Math.floor(Math.random() * 30);
 child1 = parent2.substring(0, position) + mutate(parent1.substring(position, parent1.length));
  child2 = parent1.substring(0, position) + mutate(parent2.substring(position, parent2.length));


  x1Str = child1.substring(0, 10);
  y1Str = child1.substring(11, 20);
  rad1Str = child1.substring(21, 30);

  x1 = parseInt(x1Str, 2);
  y1 = parseInt(y1Str, 2);
  rad1 = parseInt(rad1Str, 2);

  arrOfUnOrganizChildren.push(new Circle(x1, y1, rad1));
  
  x2Str = child2.substring(0, 10);
  y2Str = child2.substring(11, 20);
  rad2Str = child2.substring(21, 30);

  x2 = parseInt(x2Str, 2);
  y2 = parseInt(y2Str, 2);
  rad2 = parseInt(rad2Str, 2);

  arrOfUnOrganizChildren.push(new Circle(x2, y2, rad2));
  //console.log(arrOfUnOrganizChildren);
  return arrOfUnOrganizChildren;
}



//---------------------------Main---------------------------//


geneticAlgorithm = generatePopulation(arr200Circles, new Circle(0, 0, 0));

for (var j = 0; j < generations; j++) {
    geneticAlgorithm = generatePopulation(geneticAlgorithm, geneticAlgorithm[0])
}
console.log(solution.radius);
drawCircle(ctx, solution.x, solution.y, solution.radius, "yellow");


//----------------------------------------------------------//  