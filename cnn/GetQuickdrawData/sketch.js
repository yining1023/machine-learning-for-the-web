const IMAGE_SIZE = 784;
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const OBJECT_NAME = 'lollipop';
const numCols = 100;
const numRows = 50;
const totalImgs = 5000; // numCols * numRows has to = totalImgs
// If you download the full .npy file like "full_numpy_bitmap_lollipop.npy", set this to 80!!!
const extraBytes = 128;
// You can download other categories' files here: https://console.cloud.google.com/storage/browser/quickdraw_dataset/full/numpy_bitmap/
// put the new .npy files into data folder
const fileName = 'lollipop5000.npy';
// Update the above variables to fit into your case
let imagesData;
let data;
let allImgs = [];

function preload() {
  imagesData = loadBytes(`data/${fileName}`);
}

function setup() {
  createCanvas(IMAGE_WIDTH * numCols, IMAGE_HEIGHT * numRows);
  const total = imagesData.bytes.length;
  data = new Uint8Array(total);
  data.set(imagesData.bytes, 0);
  for (let h = 0; h < numRows; h++) {
    for (let w = 0; w < numCols; w++) {
      // quickdraw full dataset the real pixel data start from index 80(extraBytes)
      // 5000.npy starts from 128(extraBytes)
      const start = extraBytes + (w + h * numCols) * IMAGE_SIZE;
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
