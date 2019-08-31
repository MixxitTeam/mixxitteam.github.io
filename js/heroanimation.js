///ADDON=(HeroAnimation)
(function() {
  var p = document.querySelector(".hero-animation");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var tileSize = 16;
  var tileMarginInner = 1;
  var trailLength = 8;
  var trails = [];
  var trailsNum = 32;
  var colorR = 19;
  var colorG = 9;
  var colorB = 51;
  var colorA = 16;

  function T() {
    this.px = Math.floor(Math.random() * (canvas.width / tileSize));
    this.py = Math.floor(Math.random() * (canvas.height / tileSize));
    this.s = Math.max(Math.min(Math.random() * 0.5 + 0.5, 1), 0.01);

    this.u = function() {
      this.py += this.s;
      if (this.py + trailLength > Math.floor(canvas.height / tileSize) + trailLength * 2) {
        this.px = Math.floor(Math.random() * (canvas.width / tileSize));
        this.py = -1;
      }
    };
  }

  function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < trails.length; i++) {
      var trail = trails[i];
      for (var t = 0; t < trailLength; t++) {
        ctx.fillStyle = "rgba(" + [colorR, colorG, colorB, (colorA - colorA / trailLength * t) / 255].join(",") + ")";
        ctx.fillRect(
          (trail.px * tileSize + tileMarginInner) * devicePixelRatio,
          ((Math.floor(trail.py) - t) * tileSize + tileMarginInner) * devicePixelRatio,
          (tileSize - tileMarginInner) * devicePixelRatio,
          (tileSize - tileMarginInner) * devicePixelRatio
        );
      }
    }
  }

  function UpdateCanvasSize() {
    canvas.width = p.clientWidth * devicePixelRatio;
    canvas.height = p.clientHeight * devicePixelRatio;
  }

  setInterval(function() {
    for (var i = 0; i < trails.length; i++)
      trails[i].u();
  }, 1000/15);

  function FXDraw() {
    UpdateCanvasSize();
    Draw();
    requestAnimationFrame(FXDraw);
  }
  requestAnimationFrame(FXDraw);

  p.appendChild(canvas);
  UpdateCanvasSize();
  for (var i = 0; i < trailsNum; i++)
    trails.push(new T());
}());
