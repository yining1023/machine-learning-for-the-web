/**
 * Based on Dan Shiffman's
https://github.com/shiffman/Tensorflow-JS-Examples/tree/master/03_DoodleClassifier
**/
const CLASSES = 3;
const IMAGE_SIZE = 784;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let catsData;
let trainsData;
let rainbowsData;

let data;
let model;

function preload() {
  catsData = loadBytes('data/cats1000.bin');
  trainsData = loadBytes('data/trains1000.bin');
  rainbowsData = loadBytes('data/rainbows1000.bin');
}

function setup() {
  createCanvas(280, 280);
  let total = (catsData.bytes.length + rainbowsData.bytes.length + trainsData.bytes.length) / IMAGE_SIZE;
  data = new DoodleData(total);
  data.load(catsData.bytes, CAT);
  data.load(rainbowsData.bytes, RAINBOW);
  data.load(trainsData.bytes, TRAIN);
  data.shuffle();

  model = new Classifier();

  background(255);

  let trainButton = select('#train');
  trainButton.mousePressed(function() {
    model.train(data);
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < IMAGE_SIZE; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = 255 - bright;
    }
    console.log('input data: ', inputs)
    let guess = model.predict(inputs);
    console.log(guess);
    let res;
    if (guess === 0) {
      res = "This is a Cat!";
    } else if (guess === 1) {
      res = "This is a Rainbow!";
    } else if (guess === 2) {
      res = "This is a Train!";
    }
    console.log(res);
    select('#res').html(res);
  });

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
  });
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
