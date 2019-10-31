let neuralNetwork;
let submitButton;

function setup() {
  noCanvas();

  let nnOptions = {
    dataUrl: 'data/titanic_cleaned.csv',
    inputs: ['fare_class','sex', 'fare'],
    outputs: ['survived'],
    task: 'classification',
    debug: true
  };

  neuralNetwork = ml5.neuralNetwork(nnOptions, modelReady)
  submitButton = select('#submit');
  submitButton.mousePressed(classify);
  submitButton.hide();
}

function modelReady() {
  neuralNetwork.normalizeData();
  neuralNetwork.train({ epochs: 50 }, whileTraining, finishedTraining);
}

function whileTraining(epoch, logs) {
  console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(2)}`);
}

function finishedTraining() {
  console.log('done!');
  submitButton.show();
  classify();
}

// TODO: normalize and encode values going into predict?
function classify() {
  let fare = parseInt(select('#fare').value());
  let fare_class = select('#fare_class').value();
  let sex = select('#sex').value();

  let inputs = [fare_class, sex, fare];
  neuralNetwork.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    select('#result').html(`prediction: ${results[0].label}`);
  }
}
