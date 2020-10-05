const myImageModelURL = 'https://teachablemachine.withgoogle.com/models/H1eZs1_jA/';
let myImageModel;
let resultDiv;
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem144301';// fill in your serial port name here
let outByte = 0;// for outgoing data
let video;

function preload() {
  video = createCapture(VIDEO);
  myImageModel = ml5.imageClassifier(myImageModelURL+ 'model.json');
}

function setup() {
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  myImageModel.classify(video, gotResults);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    // Wait for 0.5 second before classifying again
    setTimeout(() => myImageModel.classify(video, gotResults), 500);
    if (results[0].confidence < 0.7) return;
    resultDiv.html('Result is: ' + results[0].label);
    if (results[0].label === 'rabbit') {
      outByte = 1;
    } else if (results[0].label === 'minion') {
      outByte = 2;
    } else {
      outByte = 0;
    }
    // send it out the serial port:
    console.log('outByte: ', outByte)
    serial.write(outByte);
  }
}
