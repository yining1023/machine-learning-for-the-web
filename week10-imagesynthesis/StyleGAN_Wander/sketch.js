let generatedImg;
const z = [];
const vel = [];
const xoff = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
    vel[i] = random(-0.02, 0.02);
    xoff[i] = random(10000);
  }
  generateImage();
  background(0);
}


function generateImage() {
  const path = "http://localhost:8000/query";
  const data = {
    z: z,
    truncation: 0.5
  };
  // httpPost(path, [datatype], [data], [callback], [errorCallback])
  httpPost(path, 'json', data, gotImage, gotError);
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  generatedImg = createImg(result.image);
  generatedImg.hide();
  for (let i = 0; i < z.length; i++) {
    
    // Random walk
    // z[i] += random(-0.01, 0.01);
    
    // Walk in one direction
    // z[i] += vel[i];
    
    // Perlin noise walk
    z[i] = map(noise(xoff[i]), 0, 1, -1, 1);
    xoff[i] += 0.01;
  }
  generateImage();
}


function draw() {
  if (generatedImg) {
    image(generatedImg, 0, 0, width, height);
  }
}