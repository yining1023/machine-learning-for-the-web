const mySoundModelURL = 'https://teachablemachine.withgoogle.com/models/-OUoUPKHF/';
let mySoundModel;
let resultDiv;
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem144301';// fill in your serial port name here
let outByte = 0;// for outgoing data

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL+ 'model.json');
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
    if (results[0].confidence < 0.7) return;
    resultDiv.html('Result is: ' + results[0].label);
    if (results[0].label === 'happy') {
      outByte = 1;
    } else if (results[0].label === 'clap') {
      outByte = 2;
    } else {
      outByte = 0;
    }
    // send it out the serial port:
    console.log('outByte: ', outByte)
    serial.write(outByte);
  }
}
