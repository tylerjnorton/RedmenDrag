const IMAGE_SIZE = 150;
const IMAGE_BUFFER = 28;
const PER_ROW = 4;
const canvas = document.getElementById("dndcanvas");
const background = new Image();
background.src = "images/background.png";

class PlayerImage {
  constructor(str, coordinates) {
    this.str = str;
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

let images = [
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
      x: (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) + IMAGE_BUFFER,
      y:
        100 +
        (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) +
        IMAGE_BUFFER,
      width: IMAGE_SIZE,
      height: IMAGE_SIZE
    })
);

function draw() {
  var context = canvas.getContext("2d");

  // Clear the canvas
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  images.forEach(image => image.draw(context));

  context.font = "30px Helvetica";
  context.fillStyle = "white";
  context.fillText("Liverpool players", 220, 75);
}

// Initialise our object

canvas.width = 1920;
canvas.height = 1080;

let CURRENT_DRAG_ITEM = null;

// Add eventlistener to canvas

canvas.addEventListener("touchstart", event => {
  CURRENT_DRAG_ITEM = images
    .slice()
    .reverse()
    .find(image => {
      const { x, y, width, height } = image.position;
      const { pageX: pageX1, pageY: pageY1 } = event.targetTouches[0];
      // const rect = canvas.getBoundingClientRect();

      const { offsetTop, offsetLeft } = event.target;

      let pageY = pageY1 - offsetTop;
      let pageX = pageX1 - offsetLeft;

      return detectHit(x, y, pageX, pageY, width, height);
    });

  if (CURRENT_DRAG_ITEM) {
    const copy = images.slice();
    copy.splice(images.indexOf(CURRENT_DRAG_ITEM), 1);

    images = [...copy, CURRENT_DRAG_ITEM];
  }
});

canvas.addEventListener(
  "touchmove",
  event => {
    //Assume only one touch/only process one touch even if there's more

    if (CURRENT_DRAG_ITEM) {
      const image = CURRENT_DRAG_ITEM;
      const { pageX: pageX1, pageY: pageY1 } = event.targetTouches[0];
      // const rect = canvas.getBoundingClientRect();

      const { offsetTop, offsetLeft } = event.target;

      let pageY = pageY1 - offsetTop;
      let pageX = pageX1 - offsetLeft;

      // Assign new coordinates to our object
      image.position.x = pageX - image.position.width / 2;
      image.position.y = pageY - image.position.height / 2;

      // Redraw the canvas
      draw();
    }
  },
  false
);

background.onload = () => {
  const context = canvas.getContext("2d");
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  draw();
};
