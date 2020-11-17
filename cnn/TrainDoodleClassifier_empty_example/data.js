const IMAGE_SIZE = 784;
const NUM_CLASSES = 3;
const NUM_DATASET_ELEMENTS = 15000;
const NUM_EACH_CLASS = NUM_DATASET_ELEMENTS / NUM_CLASSES;

const BOWTIE = 0;
const LOLLIPOP = 1;
const RAINBOW = 2;

const TRAIN_TEST_RATIO = 4 / 5;

const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

const EXTRABYTE = 128;

export class QuickdrawData {
  constructor() {
    this.shuffledTrainIndex = 0;
    this.shuffledTestIndex = 0;
    this.loadingOffset = 0;
  }

  loadOneCat(data, category) {
    this.datasetImages.set(data, this.loadingOffset * IMAGE_SIZE);
    const totalImages = data.length / IMAGE_SIZE;
    let label = new Uint8Array(NUM_CLASSES);
    label[category] = 1;
    for (let i = 0; i < totalImages; i++) {
      this.datasetLabels.set(label, (i + this.loadingOffset) * NUM_CLASSES);
    }
    this.loadingOffset += data.length / IMAGE_SIZE;
  }

  async load() {
    const bowtieData = await this.loadBytes('data/bowtie5000.npy');
    const lollipopData = await this.loadBytes('data/lollipop5000.npy');
    const rainbowData = await this.loadBytes('data/rainbow5000.npy');

    const bowtie5000 = bowtieData.bytes.slice(EXTRABYTE, EXTRABYTE + NUM_EACH_CLASS * IMAGE_SIZE).map(v => (255 - v)/255);
    const lollipop5000 = lollipopData.bytes.slice(EXTRABYTE, EXTRABYTE + NUM_EACH_CLASS * IMAGE_SIZE).map(v => (255 - v)/255);
    const rainbow5000 = rainbowData.bytes.slice(EXTRABYTE, EXTRABYTE + NUM_EACH_CLASS * IMAGE_SIZE).map(v => (255 - v)/255);

    this.total = NUM_DATASET_ELEMENTS;
    this.datasetImages = new Uint8Array(this.total * IMAGE_SIZE);
    this.datasetLabels = new Uint8Array(this.total * NUM_CLASSES);

    await this.loadOneCat(bowtie5000, BOWTIE);
    await this.loadOneCat(lollipop5000, LOLLIPOP);
    await this.loadOneCat(rainbow5000, RAINBOW);

    this.shuffle();

    // Create shuffled indices into the train/test set for when we select a
    // random dataset element for training / validation.
    this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
    this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);

    // Slice the the images and labels into train and test sets.
    this.trainImages =
        this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.trainLabels =
        this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
    this.testLabels =
        this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
  }

  shuffle() {
    const order = tf.util.createShuffledIndices(this.total);
    const shuffledData = new Uint8Array(this.datasetImages.length);
    const shuffledLabels = new Uint8Array(this.datasetLabels.length);

    for (let i = 0; i < this.total; i++) {
      const index = order[i];
      const data = this.datasetImages.slice(index * IMAGE_SIZE, (index + 1) * IMAGE_SIZE);
      const label = this.datasetLabels.slice(index * NUM_CLASSES, (index + 1) * NUM_CLASSES);
      shuffledData.set(data, i * IMAGE_SIZE);
      shuffledLabels.set(label, i * NUM_CLASSES);
    }

    this.datasetImages = shuffledData;
    this.datasetLabels = shuffledLabels;
  }

  nextTrainBatch(batchSize) {
    return this.nextBatch(
        batchSize, [this.trainImages, this.trainLabels], () => {
          this.shuffledTrainIndex =
              (this.shuffledTrainIndex + 1) % this.trainIndices.length;
          return this.trainIndices[this.shuffledTrainIndex];
        });
  }

  nextTestBatch(batchSize) {
    return this.nextBatch(batchSize, [this.testImages, this.testLabels], () => {
      this.shuffledTestIndex =
          (this.shuffledTestIndex + 1) % this.testIndices.length;
      return this.testIndices[this.shuffledTestIndex];
    });
  }

  nextBatch(batchSize, data, index) {
    const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
    const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

    for (let i = 0; i < batchSize; i++) {
      const idx = index();

      const image =
          data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
      batchImagesArray.set(image, i * IMAGE_SIZE);

      const label =
          data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
      batchLabelsArray.set(label, i * NUM_CLASSES);
    }

    const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
    const labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);

    return {xs, labels};
  }

  loadBytes(file) {
    return new Promise(function(resolve, reject) {
      var data = {};
      var oReq = new XMLHttpRequest();
      oReq.open("GET", file, true);
      oReq.responseType = "arraybuffer";

      oReq.onload = (oEvent) => {
        var arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
          data.bytes = new Uint8Array(arrayBuffer);
          resolve(data)
        } else reject(xhr.status)
      };
      oReq.send(null);
    })
  }
}
