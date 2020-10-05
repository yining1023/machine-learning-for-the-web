const modelURL = 'https://teachablemachine.withgoogle.com/models/r8wsgg5mm/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem144301';// fill in your serial port name here

const size = 300;
const flip = true; // whether to flip the webcam
let webcam;
let model;
let totalClasses;
let myCanvas;
let ctx;

// A function that loads the model from the checkpoint
async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function loadWebcam() {
  webcam = new tmPose.Webcam(size, size, flip); // can change width and height
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loopWebcam);
}

async function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port

  myCanvas = createCanvas(size, size);
  ctx = myCanvas.elt.getContext("2d");
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}


async function loopWebcam(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loopWebcam);
}

async function predict() {
  // Prediction #1: run input through posenet
  // predict can take in an image, video or canvas html element
  const flipHorizontal = false;
  const { pose, posenetOutput } = await model.estimatePose(
    webcam.canvas,
    flipHorizontal
  );
  // Prediction 2: run input through teachable machine assification model
  const prediction = await model.predict(
    posenetOutput,
    flipHorizontal,
    totalClasses
  );

  // console.log('prediction: ', prediction);
  // Sort prediction array by probability
  // So the first classname will have the highest probability
  const sortedPrediction = prediction.sort((a, b) => - a.probability + b.probability);

  // Show the result
  const res = select('#res'); // select <span id="res">
  res.html(sortedPrediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select <span id="prob">
  prob.html(sortedPrediction[0].probability.toFixed(2));

  // draw the keypoints and skeleton
  if (pose) {
    drawPose(pose);
  }
  
  if (sortedPrediction[0].className === 'Sit') {
    outByte = 1;
  } else if (sortedPrediction[0].className === 'Stand') {
    outByte = 2;
  } else {
    outByte = 0;
  }
  // send it out the serial port:
  console.log('outByte: ', outByte)
  serial.write(outByte);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}
