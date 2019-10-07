// Copyright (C) 2018 Runway AI Examples
// 
// This file is part of Runway AI Examples.
// 
// Runway-Examples is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Runway-Examples is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Runway.  If not, see <http://www.gnu.org/licenses/>.

// Deep Lab model Demo:
// Sends an image to Runway via HTTP Post request, and get an image back

// Update the following url based on the server address shown in your Runway app under Input--Network
const deeplabURL = 'http://localhost:8000/query';
let video;
let deeplabImage;
let myCanvas;
let startBTN;
let isStarting = false;
let constraints = {
  video: {
    width: 640,
    height: 480,
    aspectRatio: 1
  } 
};

function setup() {
  myCanvas = createCanvas(640, 480);
  video = createCapture(VIDEO, constraints);
  video.hide();
  startBTN = createButton('Start/Stop');
  // When the Start button is clicked, call getDeepLabImage function
  startBTN.mousePressed(() => {
    isStarting = !isStarting;
    getDeepLabImage();
  });
}

function draw() {
  push();
  // Flip camera from left to right
  translate(640, 0);
  scale(-1.0, 1.0);
  if (deeplabImage) image(deeplabImage, 0, 0, 640, 480);
  else image(video, 0, 0, 640, 480);
  pop();
}

function videoToDataURL(video) {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d')
    .drawImage(video, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg', 1.0);
}

function getDeepLabImage() {
  if (video && video.elt) {
    const videoElt = video.elt;
    const imageData = videoToDataURL(videoElt);
    const postData = {
      "image": imageData
    };
    // Send HTTP Post request to Runway with text, runway will return the output image src
    httpPost(deeplabURL, 'json', postData, async (output) => {
      if (output && output.image) {
        // createImg(output.image);
        deeplabImage = await loadImage(output.image);
        if (isStarting) getDeepLabImage();
      }
    })
  }
}
