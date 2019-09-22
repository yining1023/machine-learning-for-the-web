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
let myRects = [];
let isPlaying = false;
let song;
let noseX = 0, noseY = 0;

function preload() {
  song = loadSound('assets/song.mp3');
}

function setup() {
  rectMode(CENTER);
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // Create 3 rects
  for (let i = 0; i < 3; i++) {
    let myRect = new Square(Math.floor(random(50, width - 50)), Math.floor(random(50, height - 50)), Math.floor(random(40, 100)))
    myRects.push(myRect);
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  // Flip the video from left to right, mirror the video
  translate(width, 0)
  scale(-1, 1);
  image(video, 0, 0, width, height);
  noStroke();
  checkNose();
  drawRect();
  drawNose();
}

function checkNose() {
  for (let k = 0; k < 3; k++) {
    myRects[k].checkIfInside(noseX, noseY);
  }
  isPlaying = myRects.some(r => r.isInside);
  if (isPlaying) {
    // .isPlaying() returns a boolean
    // If the song is not playing, play the song
    if (!song.isPlaying()) {
      song.play();
    }
  } else {
    // .isPaused()() returns a boolean
    // If the song is not paused, pause the song
    if (!song.isPaused()) {
      song.pause();
    }
  }
}

function drawRect() {
  for (let j = 0; j < 3; j++) {
    myRects[j].show();
  }
}

function drawNose() {
  if (poses[0] && poses[0].pose && poses[0].pose.nose) {
    noseX = poses[0].pose.nose.x;
    noseY = poses[0].pose.nose.y;
    fill(0, 0, 255);
    ellipse(noseX, noseY, 30, 30)
  }
}
