// This sketch allows you to download 5000 images in one category from quickdraw dataset
// ***NOTE***: When running this sketch locally, download this chrome extension to allow CORS
// to be able to download files from Google storage
// Download the chrome extension here: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
const IMAGE_SIZE = 784;
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const OBJECT_NAME = 'lollipop';
const numCols = 100;
const numRows = 50;
const totalImgs = 5000; // numCols * numRows has to = totalImgs
// You can find the link to other categories here: https://console.cloud.google.com/storage/browser/quickdraw_dataset/full/numpy_bitmap/
const fileName = 'https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap/lollipop.npy';
// Update the above variables to fit into your case
let imagesData;
let data;
let allImgs = [];

function preload() {
  imagesData = loadBytes(fileName);
}

function setup() {
  createCanvas(IMAGE_WIDTH * numCols, IMAGE_HEIGHT * numRows);
  const total = imagesData.bytes.length;
  data = new Uint8Array(total);
  data.set(imagesData.bytes, 0);
  for (let h = 0; h < numRows; h++) {
    for (let w = 0; w < numCols; w++) {
      const start = 80 + (w + h * numCols) * IMAGE_SIZE; // quickdraw dataset the real pixel data start from index 80
      createOneImage(start, w * IMAGE_WIDTH, h * IMAGE_HEIGHT);
    }
  }

  let mainButton = select("#downloadImg");
  mainButton.mousePressed(downloadAllImg);
}

function downloadAllImg() {
  const zip = new JSZip();

  allImgs.forEach(async(im, index) => {
    const blob = await imageDataToBlob(im.imageData);
    zip.file(`${OBJECT_NAME}_${index}.png`, blob);

    if (index === totalImgs - 1) {
      zip.generateAsync({ type:"blob" })
      .then(function(content) {
        saveAs(content, `${OBJECT_NAME}s.zip`);
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

function createOneImage(start, wIndex, hIndex) {
  let img = createImage(IMAGE_WIDTH, IMAGE_HEIGHT);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const color = data[start + x + y * IMAGE_WIDTH];
      img.set(x, y, [255 - color, 255 - color, 255 - color, 255]);
    }
  }
  img.updatePixels();
  allImgs.push(img);
  image(img, wIndex, hIndex);
}
