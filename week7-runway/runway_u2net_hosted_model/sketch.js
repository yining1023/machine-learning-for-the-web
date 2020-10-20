// Update the url and token below
const model = new rw.HostedModel({
  url: "https://u-2-net-YOURMODELID.hosted-models.runwayml.cloud/v1/",
  token: "YOUR AUTH",
});
let video;

function preload() {
  video = createCapture(VIDEO);
  video.hide();
}

function setup() {
  createCanvas(600, 400);
  removeBackground();
}

function removeBackground() {
  video.loadPixels();
  const videoImageData = video.canvas.toDataURL();
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));
  const inputs = {
    "image": videoImageData,
    "threshold": 0.3
  };
  model.query(inputs).then(outputs => {
    const { image } = outputs;
    drawImage(image);
    // Call removeBackground again
    removeBackground();
  });
}

function drawImage(base64Data) {
  background(255);
  var img;
  var raw = new Image();
  raw.src = base64Data;
  raw.onload = function() {
    img = createImage(raw.width, raw.height);
    img.drawingContext.drawImage(raw, 0, 0);
    image(img, 0, 0, 600, 400); // draw the image, etc here
  }
}
