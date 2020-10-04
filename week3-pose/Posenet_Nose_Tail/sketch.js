let video;
let myPoseNet;
let nosePosHistory = [];
const NUM_POS = 10;

function setup() {
  video = createCapture(VIDEO, videoReady);
  video.hide();
  createCanvas(640, 480);
  fill(255, 0, 0);
}

function draw() {
  image(video, 0, 0, 640, 480);
  nosePosHistory.forEach((n, i) => {
    const noseSize = map(i, 0, NUM_POS - 1, 5, 60);
    ellipse(n.x, n.y, noseSize, noseSize);
  });
}

function videoReady() {
  myPoseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
  console.log('model loaded');
  myPoseNet.on('pose', gotResults);
}

function gotResults(res) {
  if (res) {
    // console.log(res);
    if (res[0] && res[0].pose && res[0].pose.nose) {
      noseX = res[0].pose.nose.x;
      noseY = res[0].pose.nose.y;
      // Save the new nose pos into nosePosHistory
      nosePosHistory.push({ x: noseX, y: noseY });
      // If nosePosHistory is mora than 10, delete the fist nose pos
      if (nosePosHistory.length > 10) nosePosHistory.shift();
    }
  }
}
