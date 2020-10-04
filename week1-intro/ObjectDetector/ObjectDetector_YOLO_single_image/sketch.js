let objectDetector;
let img;
let objects = [];
let status;

function preload() {
  img = loadImage("images/cat2.JPG");
}

function setup() {
  createCanvas(640, 420);
  image(img, 0, 0);
  objectDetector = ml5.objectDetector("yolo", modelReady);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!");
  status = true;
  console.log("Detecting");
  objectDetector.detect(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
  objects = results;

  // Draw results on canvas
  for (let i = 0; i < objects.length; i += 1) {
    noStroke();
    fill(0, 255, 0);
    const x = objects[i].normalized.x * width;
    const y = objects[i].normalized.y * width;
    const objectWidth = objects[i].normalized.width * width;
    const objectHeight = objects[i].normalized.height * height;
    text(
      `${objects[i].label} ${nfc(objects[i].confidence * 100.0, 2)}%`,
      x + 5,
      y + 15,
    );
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(x, y, objectWidth, objectHeight);
  }
}
