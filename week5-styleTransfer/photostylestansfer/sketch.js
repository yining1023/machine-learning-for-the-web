// Open runway
// Run 'FastPhotoStyle' model
// Get the server address in the Options --> Network window
// Update the `url` below to your own server address from Runway
let inputImgData;
let styleImgData;
let resultImg;
const url = 'http://localhost:8000/query';

function setup() {
  noCanvas();
  toDataURL('./images/input.png', (dataUrl1) => {
    inputImgData = dataUrl1;
    toDataURL('./images/style.png', (dataUrl2) => {
      styleImgData = dataUrl2;
      const postData = {
        content: inputImgData,
        style: styleImgData
      };
      // Send HTTP Post request to Runway with image data, runway will return the image caption
      httpPost(url, 'json', postData, (output) => {
        if (output && output.image) {
          console.log('output: ', output)
          createImg(output.image)
        }
      })
    })
  })
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
