//square position is hard-coded for testing purposes

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 600;
var ctx = document.querySelector('canvas').getContext('2d');
var square = {pivot:[150,150], points:[[100,100],[200,100],[200,200],[100,200]], color: '#f00'};
var updateAngle = angleClosure();

function drawSquare(object) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = object.color;
  ctx.beginPath();
  ctx.moveTo(object.points[0][0], object.points[0][1]);
  ctx.lineTo(object.points[1][0], object.points[1][1]);
  ctx.lineTo(object.points[2][0], object.points[2][1]);
  ctx.lineTo(object.points[3][0], object.points[3][1]);
  ctx.closePath();
  ctx.fill();
}


function angleClosure() {
    var angle = 0;
    function increase() {
      return angle > 360 ? angle = 0 : angle++;
    }
    return increase;
}

function rotateSquare(polygon, angle) {
  function rotate(pivotx, pivoty, x, y, angle) {
    var rad = angle*Math.PI/180;
    var rotx = ((Math.sin(rad) * (y - pivoty)) + pivotx) + (Math.cos(rad) * (x - pivotx));
    var roty = (Math.cos(rad) * (y - pivoty)) - (Math.sin(rad) * (x - pivotx)) + pivoty;
    return [rotx, roty];
  }
  var rotatedPoints = polygon.points.map(function (element) {return rotate(polygon.pivot[0], polygon.pivot[1], element[0], element[1], angle)});
  polygon.points = rotatedPoints;
}

function testLoop() {
  drawSquare(square);
  currentAngle = updateAngle();
  rotateSquare(square, currentAngle);
}

setInterval(testLoop, 50);
