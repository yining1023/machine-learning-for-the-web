/**
 * Based on Dan Shiffman's
https://github.com/shiffman/Tensorflow-JS-Examples/tree/master/03_DoodleClassifier
**/

// This sketch allows you to download 1000 cat images
const IMAGE_SIZE = 784;
let catsData;
let data;
let allImgs = [];

function preload() {
  catsData = loadBytes('data/cats1000.bin');
}

function setup() {
  createCanvas(2800, 280);
  const total = catsData.bytes.length;
  data = new Uint8Array(total);
  data.set(catsData.bytes, 0);
  for (let h = 0; h < 10; h++) {
    for (let w = 0; w < 100; w++) {
      const start = (w + h * 28) * 784;
      createCatImage(start, w * 28, h * 28);
    }
  }

  let mainButton = createButton(`download 1000 images as a zip file`);
  mainButton.position(20, 380);
  mainButton.mousePressed(downloadAllImg);
}

function downloadAllImg() {
  const zip = new JSZip();

  allImgs.forEach(async(im, index) => {
    const blob = await imageDataToBlob(im.imageData);
    zip.file(`cat_${index}.png`, blob);

    if (index === 999) {
      zip.generateAsync({ type:"blob" })
      .then(function(content) {
        saveAs(content, "cats.zip");
      });
    }
  })
}

function imageDataToBlob(imageData) {
  let w = imageData.width;
  let h = imageData.height;
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext("2d");
  ctx.putImageData(imageData, 0, 0, 0, 0, w, h);

  return new Promise((resolve, reject) => {
    canvas.toBlob(resolve);
  });
};

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
  allImgs.push(img);
  image(img, wIndex, hIndex);
}
