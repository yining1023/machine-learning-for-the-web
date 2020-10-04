let video;
let poseNet;
let poses = [];

function preload() {
  video = createCapture(VIDEO);
  video.size(600, 400);
  video.hide();
}

function setup() {
  createCanvas(600, 400);

  poseNet = ml5.poseNet(video, modelReady);
}

function modelReady () {
  console.log('model is ready');
  poseNet.on('pose', function(results) {
    poses = results;
    // console.log('results:', results)
    drawPose();
  })
}

function drawPose() {
  image(video, 0, 0, 600, 400)
  // background(0, 255, 0);
  
  // draw nose
  if (poses[0]) {
    const leftEyeX = poses[0].pose.leftEye.x;
  const rightEyeX = poses[0].pose.rightEye.x;
  const noseSize = map(rightEyeX - leftEyeX, 0, 100, 10, 80);
    fill(255, 0, 0);
    circle(poses[0].pose.nose.x, poses[0].pose.nose.y, noseSize);
  }
}
