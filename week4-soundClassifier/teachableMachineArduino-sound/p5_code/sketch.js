const mySoundModelURL = 'https://storage.googleapis.com/tm-speech-commands/yiningtestsound07112019/model.json';
let mySoundModel;
let resultDiv;
let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let outByte = 0;                       // for outgoing data

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL);
}

function setup() {
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  mySoundModel.classify(gotResults);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    resultDiv.html('Result is: ' + results[0].label);
    if (results[0].label === 'Happy') {
      outByte = 255;
      // send it out the serial port:
      console.log('outByte: ', outByte)
      serial.write(outByte);
    }
  }
}
