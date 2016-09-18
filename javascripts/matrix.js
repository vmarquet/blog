$(document).ready(function() {
  // set canvas to same size that header
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var width = canvas.width;
  var height = canvas.height;
  var numberOfColumns = width / 10;
  var yPositions = Array(numberOfColumns).join(0).split('');
  var ctx = canvas.getContext('2d');

  var alpha = 0.05;
  var fade = function () {
    alpha += 0.05;
    //console.log(alpha);
  }

  var startFading = function () {
    fadeInt = setInterval(fade, 100);
    setTimeout(stopFading, 1800, fadeInt);
  }

  var stopFading = function (fadeInt) {
    clearInterval(fadeInt);
    StopMatrix();
    $('canvas[id="canvas"]').remove();
  }
   
  var draw = function () {
    // darken already printed characters
    ctx.fillStyle = 'rgba(24,24,24,' + alpha + ')';
    ctx.fillRect(0, 0, width, height);

    // write new characters
    ctx.fillStyle = 'rgba(0,255,0,' + (1-alpha) + ')'; // green
    ctx.font = '10pt Georgia';
    yPositions.map(function(y, index) {
      // get random char
      text = String.fromCharCode(100 + Math.random()*33);

      x = (index * 10) + 10;
      canvas.getContext('2d').fillText(text, x, y);

      if(y > 100 + Math.random()*1e4) {
        yPositions[index] = 0; // restart from top
      } else {
        yPositions[index] = y + 10; // next character 10 pixels down
      }
    });
  };

  RunMatrix();
  setTimeout(startFading, 2000);

  function RunMatrix() {
    if(typeof Game_Interval != "undefined")
      clearInterval(Game_Interval);
    Game_Interval = setInterval(draw, 33); // ms
  }

  function StopMatrix() {
    clearInterval(Game_Interval);
    console.log("animation stopped")
  }

  $("button#pause").click(function() {
    StopMatrix();
  });
  
  $("button#play").click(function() {
    RunMatrix();
  });
})
