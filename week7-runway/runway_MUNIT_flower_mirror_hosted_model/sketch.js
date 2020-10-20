// Host MUNIT model in Runway
// Update the url and token below
const model = new rw.HostedModel({
  url: "https://munit-YOUR OWN MODEL URL.hosted-models.runwayml.cloud/v1",
  token: "YOUR OWN MODEL AUTH",
});
let video;

function preload() {
  video = createCapture(VIDEO);
  video.hide();
}

function setup() {
  createCanvas(600, 400);
  getStyleImage();
}

function getStyleImage() {
  video.loadPixels();
  const videoImageData = video.canvas.toDataURL();
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));
  const inputs = {
    "image": videoImageData,
    "style": 1
  };
  model.query(inputs).then(outputs => {
    const { image } = outputs;
    drawImage(image);
    // Call getStyleImage again
    getStyleImage();
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
