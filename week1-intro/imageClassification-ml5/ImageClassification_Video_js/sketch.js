let videoElement = document.getElementById('video');
let resultElement = document.getElementById('result');
let allresultElement = document.getElementById('allresult');
let probabilityElement = document.getElementById('probability');
let statusElement = document.getElementById('status');
let classifier;

const promise = setupCamera()
.then(() => {
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
});

function modelReady() {
  // Change the status of the model once its ready
  statusElement.innerText = 'Model Loaded';
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  allresultElement.innerText = JSON.stringify(results);
  resultElement.innerText = results[0].className;
  probabilityElement.innerText = results[0].probability.toFixed(4);
  classifyVideo();
}

/**
 * Requests access to the camera and return a Promise with the native width
 * and height of the video element when resolved.
 *
 * @async
 * @returns {Promise<>} A promise
 * of the video element used as the camera.
 */
async function setupCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {facingMode: 'environment'}
    });
    window.stream = stream;
    videoElement.srcObject = stream;
    return new Promise(resolve => {
      videoElement.onloadedmetadata = () => {
        resolve([videoElement.videoWidth,
          videoElement.videoHeight]);
      };
    });
  }

  return null;
}
