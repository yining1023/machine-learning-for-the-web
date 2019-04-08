/**
 * Requests access to the camera and return a Promise with the native width
 * and height of the video element when resolved.
 *
 * @async
 * @returns {Promise<CameraDimentions>} A promise with the width and height
 * of the video element used as the camera.
 */
var videoElement = document.getElementById('video');

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

setupCamera();
