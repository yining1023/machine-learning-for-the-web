const myImageModelURL = 'https://storage.googleapis.com/tm-mobilenet/yiningtest07122019/model.json';
const classes = ['yining', 'notyining', 'pinkiphone'];
let myImageModel;
let video;
let resultDiv;

function preload() {
  video = createCapture(VIDEO);
  myImageModel = ml5.imageClassifier(myImageModelURL);
}

function setup() {
  myImageModel.classify(video, gotResults);
  resultDiv = createElement('h1',  '...');
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    resultDiv.html('Result is: ' + classes[results[0].label]);
    myImageModel.classify(video, gotResults);
  }
}
