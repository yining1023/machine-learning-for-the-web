const mySoundModelURL = 'https://storage.googleapis.com/tm-speech-commands/yiningtestsound07112019/model.json';
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
    resultDiv.html('Result is: ' + results[0].label);
  }
}
