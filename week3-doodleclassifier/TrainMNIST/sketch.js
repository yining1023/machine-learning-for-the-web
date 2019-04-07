const IMAGE_SIZE = 784;
const CLASSES = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
let cnv;
let model;

async function loadMyModel() {
  const uploadJSONInput = document.getElementById('upload-json');
  const uploadWeightsInput = document.getElementById('upload-weights');
  model = await tf.loadLayersModel(tf.io.browserFiles([uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
  model.summary();
}

function setup() {
  cnv = createCanvas(280, 280);
  background(255);
  cnv.mouseReleased(guess);
  cnv.parent('canvasContainer');

  let loadButton = select('#load');
  loadButton.mousePressed(loadMyModel);

  let guessButton = select('#guess');
  guessButton.mousePressed(guess);

  let clearButton = select('#clear');
  clearButton.mousePressed(() => {
    background(255);
    select('#res').html('');
  });
}

function guess() {
  // Get input image from the canvas
  const inputs = getInputImage();

  // Predict
  let guess = model.predict(tf.tensor([inputs]));

  // Format res to an array
  const rawProb = Array.from(guess.dataSync());
  console.log('rawProb: ', rawProb)

  // Get top 5 res with index and probability
  const rawProbWIndex = rawProb.map((probability, index) => {
    return {
      index,
      probability
    }
  });

  const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
  const top5ClassWIndex = sortProb.slice(0, 5);
  const top5Res = top5ClassWIndex.map(i => CLASSES[i.index]);
  select('#res').html(`I see ${top5Res.toString()}`);
}

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

  return inputs;
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
