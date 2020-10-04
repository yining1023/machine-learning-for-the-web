const mySoundModelURL = 'https://teachablemachine.withgoogle.com/models/jhTNSV1NM/' + 'model.json';
let mySoundModel;
let resultDiv;

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL);
}

function setup() {
  resultDiv = createElement('h1',  '...');
  mySoundModel.classify(gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    if (results[0].confidence > 0.9) {
      resultDiv.html('Result is: ' + results[0].label);
    } else {
      resultDiv.html('Result is...');
    }
  }
}
