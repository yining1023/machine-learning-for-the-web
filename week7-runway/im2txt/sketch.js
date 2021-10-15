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

// im2txt Demo:
// Sends an image to Runway via HTTP Post request, get the caption of the image back

// Update the following url based on the server address shown in your Runway app under Input--Network
const url = 'http://localhost:8000/query';
let myCanvas, video, button; 

function setup() {
  myCanvas = createCanvas(320, 240);
  createInstruction();
  createBtn();

  // Create video images from webcam
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
}

function draw() {
  // Draw videos on the canvas
  image(video, 0, 0);
}

// Create some instruction text
function createInstruction() {
  createElement('h1', 'Runway im2txt(image to  text) model with p5.js');
  createElement('p', '1. Open Runway, add im2txt model to your workspace <br>2. Select "Network" as input and ouput, Run the model<br>3. Update the "port" variable in the "sketch.js" file to the number shown in Runway input "Network" window, e.g. http://localhost:8000<br>4. Run the sketch<br>5. Click the "image to text" button get a caption of the image from your webcam.');
}

// Create a button
function createBtn() {
  button = createButton('Image to Text');
  // When the button is clicked, call image2Txt function
  button.mousePressed(image2Txt);
  createElement('br');
}

function image2Txt() {
  if (myCanvas && myCanvas.elt) {
    const canvasElt = myCanvas.elt;
    const imageData = canvasElt.toDataURL('image/jpeg', 1.0);
    const postData = {
      "image": imageData
    };
    // Send HTTP Post request to Runway with text, runway will return the output image src
    httpPost(url, 'json', postData, (output) => {
      if (output && output.results && output.results[0]) {
        console.log('results: ', output.results[0].caption)
        createElement('h2', output.results[0].caption);

        // Call image2Txt again
        image2Txt();
      }
    })
  }
}
