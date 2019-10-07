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

// AttnGAN text to image Demo:
// Gets an image from Runway via HTTP Post request with a text

// Update the following url based on the server address shown in your Runway app under Input--Network
const url = 'http://localhost:8006/query';
let textInput;
let button; 

function setup() {
  noCanvas();
  createInstruction();
  createTextInput();
  createBtn();
}

// Create some instruction text
function createInstruction() {
  createElement('h1', 'Runway AttnGAN(text to image) model with p5.js');
  createElement('p', '1. Open Runway, add AttnGAN model to your workspace <br>2. Select "Network" as input and ouput, Run the model<br>3. Update the "port" variable in the "sketch.js" file to the number shown in Runway input "Network" window, e.g. http://localhost:8006<br>4. Run the sketch<br>5. Type a sentence in the input below, click the "text to image" button get a an image.');
}

// Create text input
function createTextInput() {
  textInput = createElement('textarea', 'pepperoni pizza on the table');
  textInput.size(500, 100);
  createElement('br');
}

// Create a button
function createBtn() {
  button = createButton('Text to Image');
  // When the button is clicked, call text2Image function
  button.mousePressed(text2Image);
  createElement('br');
}

function text2Image() {
  const postData = {
    "caption": textInput.value()
  };
  // Send HTTP Post request to Runway with text, runway will return the output image src
  httpPost(url, 'json', postData, (output) => {
    if (output &&  output.result) {
      createImg(output.result);
    }
  })
}
