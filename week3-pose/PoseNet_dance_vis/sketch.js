// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  // image(video, 0, 0, width, height);
  background(103, 164, 208);
  // Draw skeleton
  drawSkeleton();
}

// A function to draw the skeletons
function drawSkeleton() {
  if (!poses[0]) return;
  const myPose = poses[0].pose;
  let skeleton = poses[0].skeleton;
  // For every skeleton, loop through all body connections
  for (let j = 0; j < skeleton.length; j++) {
    let partA = skeleton[j][0];
    let partB = skeleton[j][1];
    stroke(255);
    strokeWeight(2);
    line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
  }
  // Draw some lines between two parts
  const top = { ...myPose.nose, y: myPose.nose.y - 10 }
  drawLineBetween2Parts(top, myPose.rightShoulder);
  drawLineBetween2Parts(top, myPose.leftShoulder);
  drawLineBetween2Parts(top, myPose.rightElbow);
  drawLineBetween2Parts(top, myPose.leftElbow);
  drawLineBetween2Parts(top, myPose.rightWrist);
  drawLineBetween2Parts(top, myPose.leftWrist);
  drawLineBetween2Parts(myPose.rightShoulder, myPose.leftHip);
  drawLineBetween2Parts(myPose.rightHip, myPose.leftKnee);
  drawLineBetween2Parts(myPose.rightKnee, myPose.leftAnkle);
  drawLineBetween2Parts(myPose.rightKnee, myPose.leftKnee);
  drawLineBetween2Parts(myPose.rightAnkle, myPose.leftAnkle);
  drawLineBetween2Parts(myPose.rightAnkle, myPose.rightWrist);
  drawLineBetween2Parts(myPose.leftAnkle, myPose.leftWrist);
  drawLineBetween2Parts(myPose.leftKnee, myPose.leftWrist);
  drawLineBetween2Parts(myPose.rightKnee, myPose.rightWrist);
  drawLineBetween2Parts(myPose.rightHip, myPose.rightElbow);
  drawLineBetween2Parts(myPose.leftHip, myPose.leftElbow);
}

function drawLineBetween2Parts(partA, partB) {
  stroke(255);
  strokeWeight(2);
  line(partA.x, partA.y, partB.x, partB.y);
}
