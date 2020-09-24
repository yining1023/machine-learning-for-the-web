let video;
let myBodyPix;
let segment;
const options = {
  "outputStride": 8, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.3, // 0 - 1, defaults to 0.5
  "palette": {
    leftFace: {
      id: 0,
      color: [109,168,225],
    },
    rightFace: {
      id: 1,
      color: [109,168,225],
    },
    rightUpperLegFront: {
      id: 2,
      color: [143,198,243],
    },
    rightLowerLegBack: {
      id: 3,
      color: [143,198,243],
    },
    rightUpperLegBack: {
      id: 4,
      color: [143,198,243],
    },
    leftLowerLegFront: {
      id: 5,
      color: [143,198,243],
    },
    leftUpperLegFront: {
      id: 6,
      color: [143,198,243],
    },
    leftUpperLegBack: {
      id: 7,
      color: [143,198,243],
    },
    leftLowerLegBack: {
      id: 8,
      color: [143,198,243],
    },
    rightFeet: {
      id: 9,
      color: [252,228,116],
    },
    rightLowerLegFront: {
      id: 10,
      color: [252,228,116],
    },
    leftFeet: {
      id: 11,
      color: [252,228,116],
    },
    torsoFront: {
      id: 12,
      color: [252,228,116],
    },
    torsoBack: {
      id: 13,
      color: [252,228,116],
    },
    rightUpperArmFront: {
      id: 14,
      color: [252,228,116],
    },
    rightUpperArmBack: {
      id: 15,
      color: [109,168,225],
    },
    rightLowerArmBack: {
      id: 16,
      color: [109,168,225],
    },
    leftLowerArmFront: {
      id: 17,
      color: [109,168,225],
    },
    leftUpperArmFront: {
      id: 18,
      color: [109,168,225],
    },
    leftUpperArmBack: {
      id: 19,
      color: [109,168,225],
    },
    leftLowerArmBack: {
      id: 20,
      color: [237,109,146],
    },
    rightHand: {
      id: 21,
      color: [237,109,146],
    },
    rightLowerArmFront: {
      id: 22,
      color: [237,109,146],
    },
    leftHand: {
      id: 23,
      color: [237,109,146],
    },
  },
};

function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.size(600, 400);
  video.hide();
  myBodyPix = ml5.bodyPix(video, options, modelReady);
}

function modelReady() {
  console.log('model ready');
  // console.log('myBodyPix: ', myBodyPix)
  myBodyPix.segmentWithParts(gotResults);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    segment = results.partMask;
    background(0);
    // image(video, 0, 0, 600, 400);
    image(segment, 0, 0, 600, 400);
    myBodyPix.segmentWithParts(options, gotResults);
  }
}
