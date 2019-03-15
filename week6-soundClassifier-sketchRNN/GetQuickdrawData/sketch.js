/**
 * Based on Dan Shiffman's
https://github.com/shiffman/Tensorflow-JS-Examples/tree/master/03_DoodleClassifier
**/
const IMAGE_SIZE = 784;
let catsData;
let data;

function preload() {
  catsData = loadBytes('data/cats1000.bin');
}

function setup() {
  createCanvas(280, 280);
  const total = catsData.bytes.length;
  data = new Uint8Array(total);
  data.set(catsData.bytes, 0);
  for (let h = 0; h < 10; h++) {
    for (let w = 0; w < 10; w++) {
      const start = (w + h * 28) * 784;
      createCatImage(start, w * 28, h * 28);
    }
  }
}

function createCatImage(start, wIndex, hIndex) {
  let img = createImage(28, 28);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const color = data[start + x + y * 28];
      img.set(x, y, [255 - color, 255 - color, 255 - color, 255]);
    }
  }
  img.updatePixels();
  image(img, wIndex, hIndex);
}
