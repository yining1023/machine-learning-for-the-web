/* ===
Stick man game with PoseNet and p5.js
=== */

let video;
let poseNet;
let pose;
let startBtn;
let stickMan;
let gameStarted = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  startBtn = createButton('Start Game');
  startBtn.position(650, 595);
  startBtn.mousePressed(startGame);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    let poses = results;
    if (poses[0]) {
      pose = poses[0].pose;
      if (!gameStarted) {
        let nose = pose.nose;
        stickMan = new StickMan(nose.x, nose.y);
      }
    }
  });
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function startGame() {
  if (!pose) console.log('No pose detected.');
  else {
    gameStarted = true;
    let nose = pose.nose;
    stickMan = new StickMan(nose.x, nose.y);
  }
}

function draw() {
  if (stickMan) {
    if (gameStarted) {
      stickMan.move(pose);
      // Black color for stickman when game is started
      stroke(0);
    } else {
      // Gray color for stickman when game is not started
      stroke(125);
    }
    stickMan.show();
  }
}
