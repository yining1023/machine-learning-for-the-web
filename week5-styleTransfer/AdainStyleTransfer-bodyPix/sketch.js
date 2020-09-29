let video;
let myBodyPix;
let segment;

let inputImgData;
let styleImgData;
let resultImg;
const url = 'https://adain-style-transfer-7cad044a.hosted-models.runwayml.cloud/v1/query';
const auth = "Bearer oj5PaUAz2URZ1gmF2IkRHg==";

const options = {
  "multiplier": 0.25,
  "outputStride": 8, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
};

function preload() {
  video = createCapture(VIDEO);
  video.size(600, 400);
  video.hide();
}

function setup() {
  createCanvas(600, 400);
  myBodyPix = ml5.bodyPix(video, options, modelReady);
  setTimeout(() => startStyleTranafer(), 3000);
}

function modelReady() {
  console.log('model ready');
  myBodyPix.segment(gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    segment = results.backgroundMask;
    myBodyPix.segment(gotResults);
  }
}

function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

function startStyleTranafer() {
  toDataURL('./assets/claudeMonet.jpg', (dataUrl1) => {
    styleImgData = dataUrl1;
    getStyleTransfer();
  })
}

function getStyleTransfer() {
  video.loadPixels();
  const videoImageData = video.canvas.toDataURL();
  const postData = {
    "content_image": videoImageData,
    "style_image": styleImgData,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData)
  })
  .then(response => response.json())
  .then(output => {
    if (output && output.image) {
      // console.log('output: ', output.image)
      drawImage(output.image);
      getStyleTransfer();
    }
  });  
}

function drawImage(base64Data) {
  var img;
  var raw = new Image();
  raw.src = base64Data;
  raw.onload = function() {
    img = createImage(raw.width, raw.height);
    img.drawingContext.drawImage(raw, 0, 0);
    image(img, 0, 0, 600, 400); // draw the image, etc here
    if (segment) image(segment, 0, 0, 600, 400);
  }
}
