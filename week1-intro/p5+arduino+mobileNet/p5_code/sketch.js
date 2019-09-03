var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1412401'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
let myMobileNet;
let myVideo;
let myDiv;

function preload() {
  myMobileNet = ml5.imageClassifier('MobileNet');
  myVideo = createCapture(VIDEO);
}

function setup() {
 myDiv = createDiv('...');
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
 myMobileNet.classify(myVideo, gotResults);
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function mousePressed() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 console.log('outByte: ', outByte)
 // send it out the serial port:
 serial.write(outByte);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    myDiv.html(`Label: ${results[0].label}, Confidence: ${results[0].confidence}`);
    
    if (results[0].label === 'iPod' || results[0].label === 'microphone, mike') {
      console.log('outByte: ', outByte)
      outByte = 255;
      // send it out the serial port:
      serial.write(outByte);
    } else {
      serial.write(0);
    }
    setTimeout(() => myMobileNet.classify(myVideo, gotResults), 1000);
  }
}
