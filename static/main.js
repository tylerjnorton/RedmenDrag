const IMAGE_SIZE = window.innerWidth / 15.5;
const IMAGE_BUFFER = window.innerWidth / 140;
const PER_ROW = 5;
const canvas = document.getElementById("dndcanvas");
const requestFullScreenBtn = document.getElementById("requestFullScreenBtn");

const getClearButtonPosition = () => ({
  x: canvas.width / 3 / 2,
  y: canvas.height - 110,
  width: 120,
  height: 60
});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function drawClearButton(context) {
  context.fillRect(20, 20, 150, 150);
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const playersCollection = firebase
  .firestore()
  .collection("players")
  .orderBy("playerName")
  .where("isSelected", "==", true);

if (canvas.requestFullscreen || canvas.webkitRequestFullscreen) {
  requestFullScreenBtn.addEventListener("click", event => {
    event.preventDefault();
    canvas.requestFullscreen
      ? canvas.requestFullscreen()
      : canvas.webkitRequestFullscreen();
  });
} else {
  requestFullScreenBtn.setAttribute("disabled", true);
}

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

    if (this.isSelected) {
      context.fillStyle = "#f9a602";
      context.fillRect(x - 10, y - 10, width + 20, height + 20);
    }

    context.drawImage(image, x, y, width, height);
  }
}

function detectHit(x1, y1, x2, y2, w, h) {
  return x2 > x1 && x2 < x1 + w && y2 > y1 && y2 < y1 + h;
}

function detectHitFromEvent(targetPosition, event) {
  const { x, y, width, height } = targetPosition;
  const { pageX: pageX1, pageY: pageY1 } = event.targetTouches[0];
  // const rect = canvas.getBoundingClientRect();

  const { offsetTop, offsetLeft } = event.target;

  let pageY = pageY1 - offsetTop;
  let pageX = pageX1 - offsetLeft;

  return detectHit(x, y, pageX, pageY, width, height);
}

async function main() {
  const background = new Image();
  const snapshot = await playersCollection.get();

  const list = [];
  snapshot.forEach(doc => list.push(doc));

  let images = await Promise.all(
    list.map(async (doc, index) => {
      const url = await firebase
        .storage()
        .ref()
        .child(doc.id)
        .getDownloadURL();

      return new PlayerImage(url, {
        index,
        x:
          window.innerWidth / 50 +
          (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) +
          IMAGE_BUFFER,
        y:
          (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) +
          IMAGE_BUFFER,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE
      });
    })
  );

  function draw() {
    var context = canvas.getContext("2d");

    // Clear the canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    images.forEach(image => image.draw(context));

    const { x, y, width, height } = getClearButtonPosition();
    context.fillStyle = "black";
    context.fillRect(x, y, width, height);
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText("Reset", canvas.width / 3 / 2 + 18, canvas.height - 70);
  }

  // Initialise our object

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let CURRENT_DRAG_ITEM = null;
  let CURRENT_PAGE = 0;

  // // Add eventlistener to canvasd

  canvas.addEventListener("touchstart", event => {
    if (detectHitFromEvent(getClearButtonPosition(), event)) {
      console.log("Clicked Clear reset");
      images.forEach((image, index) => {
        image.position.x =
          window.innerWidth / 50 +
          (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) +
          IMAGE_BUFFER;
        image.position.y =
          (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) +
          IMAGE_BUFFER;
      });
      draw();
    }

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
      const now = new Date().getTime();

      if (
        CURRENT_DRAG_ITEM &&
        CURRENT_DRAG_ITEM.last_touched &&
        now - CURRENT_DRAG_ITEM.last_touched < 600
      ) {
        images.forEach(item => {
          if (item === CURRENT_DRAG_ITEM) {
            item.isSelected = !item.isSelected;
          } else {
            item.isSelected = false;
          }
        });

        CURRENT_DRAG_ITEM.last_touched = null;

        draw();
        return;
      }

      CURRENT_DRAG_ITEM.last_touched = now;
    }

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

  canvas.addEventListener("touchend", event => {
    if (CURRENT_DRAG_ITEM) {
      const image = CURRENT_DRAG_ITEM;
      if (image.position.x < window.innerWidth / 3) {
        const index = image.position.index;

        image.position.x =
          window.innerWidth / 50 +
          (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) +
          IMAGE_BUFFER;
        image.position.y =
          (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) +
          IMAGE_BUFFER;

        draw();
      }
    }
  });

  /*clearAllBtn.addEventListener("click", () => {
    images.forEach((image, index) => {
      image.position.x =
        window.innerWidth / 50 +
        (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) +
        IMAGE_BUFFER;
      image.position.y =
        (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) +
        IMAGE_BUFFER;
    });

    draw();
  });*/

  background.src = "/static/images/background.png";
  background.onload = () => {
    const context = canvas.getContext("2d");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    draw();
  };
}

main().catch(console.error);
