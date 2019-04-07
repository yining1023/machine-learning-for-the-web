const IMAGE_SIZE = 784;
const CLASSES = ['laptop', 'rainbow', 'baseball_bat', 'ice_cream', 'flower', 'suitcase', 'tree', 'microphone', 'sword', 'helmet', 'apple', 'umbrella', 'frying_pan', 'envelope', 'triangle', 'alarm_clock', 'paper_clip', 'light_bulb', 'scissors', 'cat', 't-shirt', 'ceiling_fan', 'key', 'mountain', 'table', 'moon', 'smiley_face', 'car', 'spoon', 'bird', 'saw', 'traffic_light', 'knife', 'wristwatch', 'shovel', 'circle', 'face', 'bridge', 'camera', 'bread', 'screwdriver', 'tennis_racquet', 'cell_phone', 'airplane', 'bed', 'baseball', 'moustache', 'candle', 'tooth', 'star', 'sock', 'dumbbell', 'lollipop', 'bicycle', 'hat', 'spider', 'clock', 'shorts', 'anvil', 'pants', 'syringe', 'ladder', 'axe', 'headphones', 'grapes', 'square', 'chair', 'coffee_cup', 'lightning', 'cookie', 'wheel', 'pencil', 'cloud', 'mushroom', 'door', 'drums', 'fan', 'bench', 'sun', 'stop_sign', 'eye', 'beard', 'radio', 'snake', 'line', 'power_outlet', 'diving_board', 'rifle', 'eyeglasses', 'broom', 'donut', 'pillow', 'hot_dog', 'butterfly', 'hammer', 'basketball', 'book', 'tent', 'pizza', 'cup'];
let model;
let cnv;
let knnclassifier;
const CLASS_NAMES = ['A', 'B'];

async function loadMyModel() {
  model = await tf.loadLayersModel('model/model.json');
  model.summary();
}

function setup() {
  // Create the classifier.
  knnclassifier = knnClassifier.create();

  loadMyModel();

  cnv = createCanvas(280, 280);
  background(255);
  cnv.parent('canvasContainer');

  let guessButton = select('#guess');
  guessButton.mousePressed(guess);

  let clearButton = select('#clear');
  clearButton.mousePressed(clearCanvas);

  let addAButton = select('#addA');
  addAButton.mousePressed(() => addClass(0));

  let addBButton = select('#addB');
  addBButton.mousePressed(() => addClass(1));

  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearClass(0);
  });
  
  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearClass(1);
  });
}

function addClass(classIndex) {
  console.log('addClass: ', classIndex)
  const logits = getInputImage();
  knnclassifier.addExample(logits, classIndex);
  updateExampleCounts();
  clearCanvas();
}

async function guess() {
  // Get input image from the canvas
  const inputs = getInputImage();

  const result = await knnclassifier.predictClass(inputs);
  console.log('result: ', result)
  const resName = CLASS_NAMES[result.classIndex];
  const resConfidence = result.confidences[result.classIndex];

  select('#res').html(`I see ${resName} with confidence of ${resConfidence}`);

  select('#confidenceA').html(`${result.confidences[0] ? result.confidences[0] * 100 : 0} %`);
  select('#confidenceB').html(`${result.confidences[1] ? result.confidences[1] * 100 : 0} %`);
}

// Get image from canvas, convert image to a tensor
function getInputImage() {
  let inputs = [];
  // p5 function, get image from the canvas
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
  let oneRow = [];
  for (let i = 0; i < IMAGE_SIZE; i++) {
    let bright = img.pixels[i * 4];
    let onePix = [parseFloat((255 - bright) / 255)];
    oneRow.push(onePix);
    if (oneRow.length === 28) {
      inputs.push(oneRow);
      oneRow = [];
    }
  }

  return tf.tensor(inputs);
}

function draw() {
  strokeWeight(10);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clearCanvas() {
  background(255);
  select('#res').html('');
};

// Update the example count for each class	
function updateExampleCounts() {
  const counts = knnclassifier.getClassExampleCount();

  select('#exampleA').html(counts[0] || 0);
  select('#exampleB').html(counts[1] || 0);
}

// Clear the examples in one class
function clearClass(classIndex) {
  knnclassifier.clearClass(classIndex);
  updateExampleCounts();
}
