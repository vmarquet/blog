$(document).ready(function() {
  canvas.width  = window.screen.width;
  canvas.height = window.screen.height;

  var width = canvas.width;
  var height = canvas.height;
  var numberOfColumns = width / 10;
  var yPositions = Array(numberOfColumns);
  for (var i=0; i<yPositions.length; i++) {
    yPositions[i] = {y: 0};
  }
  var ctx = canvas.getContext('2d');
  ctx.font = '10pt Georgia';

  var alpha = 0.05;
  var fade = function () {
    alpha += 0.05;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var index=0; index<yPositions.length; index++) {
      y = yPositions[index];

      // check if there's already a column of chars at that x offset
      if (y['y'] === 0) {
        // if no column of chars, we choose whether create one or not
        var rand = Math.random();
        if (rand > 0.005)
          continue;

        // we create one, so we have to select a set of characters
        rand = Math.random();
        if (rand < 0.2)
          y['charset'] = '01';
        else if (rand < 0.4)
          y['charset'] = 'jap';
        else
          y['charset'] = 'ascii';

        y['chars'] = [];
      }

      // we create a new char
      if (y['charset'] === '01') {
        var rand = Math.random();
        if (rand < 0.5)
          y['chars'].unshift('0');
        else
          y['chars'].unshift('1');
      }
      if (y['charset'] === 'jap') {
        var jap = 'あいうえおぎくけこさしすせそたちつてとにののふべまもよりれろんウオカコシスソツテホ';
        var n = Math.floor(Math.random()*jap.length);
        y['chars'].unshift(jap[n]);
      }
      if (y['charset'] === 'ascii') {
        y['chars'].unshift(String.fromCharCode(100 + Math.random()*33))
      }

      // we limit column size
      if (y['chars'].length > 30) {
        y['chars'].splice(-1,1);
      }

      x = (index * 10) + 10;
      for (var i=0; i<y['chars'].length; i++) {
        var alpha_local = i*0.03;
        ctx.fillStyle = 'rgba(0,255,0,' + (1 - alpha_local - alpha) + ')'; // green
        canvas.getContext('2d').fillText(y['chars'][i], x, y['y']-i*10);
      }

      if(y > 100 + Math.random()*1e4) {
        y['y'] = 0; // restart from top
      } else {
        y['y'] = y['y'] + 10; // next character 10 pixels down
      }
    };
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
