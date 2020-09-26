// Open runway
// Host 'adain-style-transfer' model
// Get the model url
// Update the `url` below to your own server address from Runway
// Update the `Authorization` to your own auth
let inputImgData;
let styleImgData;
let resultImg;
const url = 'https://adain-style-transfer-7cad044a.hosted-models.runwayml.cloud/v1/query';

function setup() {
  noCanvas();
  toDataURL('./images/input.jpg', (dataUrl1) => {
    inputImgData = dataUrl1;
    toDataURL('./images/style.jpg', (dataUrl2) => {
      styleImgData = dataUrl2;
      const postData = {
        "content_image": inputImgData,
        "style_image": styleImgData,
      };
          
      fetch("https://adain-style-transfer-7cad044a.hosted-models.runwayml.cloud/v1/query", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer oj5PaUAz2URZ1gmF2IkRHg==",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(output => {
        if (output && output.image) {
          console.log('output: ', output)
          const resImg = createImg(output.image);
          resImg.parent('result');
        }
      });
      
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
