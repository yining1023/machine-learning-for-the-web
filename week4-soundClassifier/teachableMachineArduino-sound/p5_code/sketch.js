const mySoundModelURL = 'https://teachablemachine.withgoogle.com/models/t8338dy7Q/' + 'model.json';
let mySoundModel;
let resultDiv;
let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem142301'; // fill in your serial port name here
let outByte = 0;                       // for outgoing data

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL);
}

function setup() {
  createCanvas(150, 150);
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  mySoundModel.classify(gotResults);
}

function draw() {
  if (outByte === 0) background(255, 255, 255);
  if (outByte === 1) background(255, 255, 0);
  if (outByte === 2) background(0, 255, 0);
  if (outByte === 3) background(255, 0, 0);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    resultDiv.html('Result is: ' + results[0].label);
    if (results[0]) {
      if (results[0].label === 'Ready') outByte = 1;
      else if (results[0].label === 'Go') outByte = 2;
      else if (results[0].label === 'Stop') outByte = 3;
      else outByte = 0;
      // send it out the serial port:
      console.log('outByte: ', outByte)
      serial.write(outByte);
    }
  }
}
