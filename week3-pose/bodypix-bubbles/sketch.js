let video;
let myBodyPix;
let segment;
let bodyPixArray = [];
const option = {
  "multiplier": 0.25,
  "outputStride": 8, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
};

function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.size(600, 400);
  video.hide();
  myBodyPix = ml5.bodyPix(video, modelReady);
  colorMode(RGB, 255, 255, 255, 1);
}

function modelReady() {
  console.log('model ready');
  myBodyPix.segment(gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {``
    // console.log(results);
    bodyPixArray = results.raw.data;
    background(0);
    image(video, 0, 0, 600, 400);
    for (let j = 0; j < 400; j+=10) {
      for (let i = 0; i < 600; i+=10) {
        let index = i + j * 600;
        if (bodyPixArray[index] === 0) {
          fill(Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255)), 0.5);
          ellipse(i, j, 10, 10);
        }
      }
    }
    myBodyPix.segment(gotResults);
  }
}
