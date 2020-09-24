let video;
let myBodyPix;
let segment;

const options = {
  "multiplier": 0.25,
  "outputStride": 32, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
};

function setup() {
  textAlign(CENTER);
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.size(600, 400);
  video.hide();
  myBodyPix = ml5.bodyPix(video, options, modelReady);
}

function modelReady() {
  console.log('model ready');
  myBodyPix.segment(gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    segment = results.backgroundMask;
    image(video, 0, 0, 600, 400);
    textSize(50);
    fill(255, 20, 1);
    text('Sth between background and person', 0, 0, width)
    text('Sth between background and person', 0, 100, width)
    text('Sth between background and person', 0, 200, width)
    text('Sth between background and person', 0, 300, width)
    if (segment) image(segment, 0, 0, 600, 400);
    myBodyPix.segment(gotResults);
  }
}
