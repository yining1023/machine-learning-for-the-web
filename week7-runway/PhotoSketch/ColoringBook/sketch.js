
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
// 
// ===========================================================================

// RUNWAY
// www.runwayapp.ai

// PhotoSketch ColoringBook Demo:
// Gets an image from Runway via HTTP
// Made by jpyepez


let p5canvas;
let routeInput,
    getButton, 
    saveButton, 
    colPicker, 
    strokeSlider, 
    clearButton,
    statusLED,
    statusP;
let port;

////////////////////
// Runway Functions
////////////////////

// Get data, transform to image and draw to canvas

let runwayGet = 'http://localhost:8012/data';

const getRawImage = async (url) => {
    try {
        let data = await fetch(url);
        let json = await data.json();
        return await json.output;
    } catch(error) {
        alert('Please check Runway\'s GET port and make sure PhotoSketch is running.');
        console.error(error);
    }
}

const makeImage = async () => {
    let img;
    let raw = new Image();
    raw.src = await getRawImage(runwayGet);
    raw.onload = function() {
        img = createImage(raw.width, raw.height);
        img.drawingContext.drawImage(raw, 0, 0);

        drawAdjustedImage(img);
    }
}

// adjust image and draw to canvas
const drawAdjustedImage = (img) => {
        let xratio = width/img.width;
        let yratio = height/img.height;
        push();
        translate(width, 0);
        scale(-xratio, yratio);
        image(img, 0, 0);
        pop();
}

////////////////
// User Interface
////////////////

// create user interface
const createUI = () => {

    let routeP = createP('Port:')
    routeP.parent(('#setup'));

    routeInput = createInput('8012');
    routeInput.parent(('#setup'));
    routeInput.id('routeInput');
    routeInput.input(() => {
        port = routeInput.value();
        runwayGet = `http://localhost:${port}/data`
        ping(runwayGet);
    });

    getButton = createButton('PhotoSketch');
    getButton.parent('#setup');
    getButton.id('getButton');
    getButton.mousePressed(makeImage);

    saveButton = createButton('Save');
    saveButton.parent('#setup');
    saveButton.id('saveButton');
    saveButton.mousePressed(saveSketch);

    clearButton = createButton('Clear');
    clearButton.parent('#setup');
    clearButton.id('clearButton');
    clearButton.mousePressed(() => background('#ffffff'));

    let strokeP = createP('Stroke:')
    strokeP.parent(('#ctrl'));

    strokeSlider = createSlider(3, 50, 10);
    strokeSlider.parent('#ctrl');
    strokeSlider.id('strokeSlider');

    let colorP = createP('Color:')
    colorP.parent(('#ctrl'));

    colPicker = createColorPicker('#0000ff');
    colPicker.parent('#ctrl');
    colPicker.id('colPicker');

    statusLED = createDiv();
    statusLED.parent(('#status'));
    statusLED.id('status-led');
    statusLED.class('led-off');

    statusP = createP('Not Connected');
    statusP.parent(('#status'));
    statusP.id('status-p')
    statusP.class('status-off');
}

// Status functions
const setOffStatus = () => {
    statusLED.removeClass('led-on');
    statusLED.addClass('led-off');
    statusP.removeClass('status-on');
    statusP.addClass('status-off');
    statusP.elt.innerText = 'Not Connected';
}

const setOnStatus = () => {
    statusLED.removeClass('led-off');
    statusLED.addClass('led-on');
    statusP.removeClass('status-off');
    statusP.addClass('status-on');
    statusP.elt.innerText = 'Connected';
}

// Ping to check if connected to Runway
const ping = async (url) => {
    try {
        let data = await fetch(url);
        setOnStatus();
    } catch(error) {
        console.error(error);
        setOffStatus();
    }
}

// Save current canvas
const saveSketch = () => {
    let date = new Date().toISOString();
    save(`sketch${date}.jpg`);
}

////////////////
// P5.js Sketch
////////////////

function setup() {
    p5canvas = createCanvas(640, 360);
    p5canvas.parent('#p5sketch');
    cursor(CROSS);
    background('#fefefe');

    createUI();
    ping(runwayGet);
}

function draw() {}

function mousePressed() {
    fill(colPicker.value())
    noStroke();
    ellipse(mouseX, mouseY, strokeSlider.value(), strokeSlider.value());
}

function mouseDragged() {
    fill(colPicker.value())
    noStroke();
    ellipse(mouseX, mouseY, strokeSlider.value(), strokeSlider.value());
}
