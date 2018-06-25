class PlayerImage {
  constructor(str, coordinates) {
    this.str = str;
    console.log(`PlayerImage(${str},${JSON.stringify(coordinates)})`);
    this.position = coordinates;
    const image = new Image();
    image.src = str;

    this.imagePromise = new Promise(
      (resolve, reject) => (image.onload = () => resolve(image))
    );
  }
  async draw(context) {
    const image = await this.imagePromise;
    const { x, y, width, height } = this.position;
    context.drawImage(image, x, y, width, height);
  }
}

function detectHit(x1, y1, x2, y2, w, h) {
  return x2 > x1 && x2 < x1 + w && y2 > y1 && y2 < y1 + h;
}

const images = [
  "images/Firmino.jpg",
  "images/bogdan.png",
  "images/coach.png",
  "images/emre.png",
  "images/kent.png",
  "images/klavan.png",
  "images/marco.png",
  "images/matip.png",
  "images/trent.png",
  "images/woodburn.png"
].map(
  (str, index) =>
    new PlayerImage(str, {
      x: 50,
      y: 100 * (index + 1),
      width: 70,
      height: 70
    })
);

function draw() {
  canvas = document.getElementById("dndcanvas");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  // Draw our object in its new position

  images.forEach(image => image.draw(ctx));
}

// Initialise our object
canvas = document.getElementById("dndcanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let CURRENT_DRAG_ITEM = null;

// Add eventlistener to canvas

canvas.addEventListener("touchstart", event => {
  CURRENT_DRAG_ITEM = images.find(image => {
    const { x, y, width, height } = image.position;
    const { pageX, pageY: pageY1 } = event.targetTouches[0];
    const { offsetTop } = event.target;

    let pageY = pageY1 - offsetTop;
    return detectHit(x, y, pageX, pageY, width, height);
  });
});

canvas.addEventListener(
  "touchmove",
  event => {
    //Assume only one touch/only process one touch even if there's more

    if (CURRENT_DRAG_ITEM) {
      const image = CURRENT_DRAG_ITEM;
      const { pageX, pageY } = event.targetTouches[0];
      // Assign new coordinates to our object
      image.position.x = pageX - image.position.width / 2;
      image.position.y = pageY - image.position.height / 2;

      // Redraw the canvas
      draw();
    }
  },
  false
);
draw();
