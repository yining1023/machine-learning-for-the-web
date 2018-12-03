class DoodleData {
  constructor(total) {
    this.total = total;
    this.loadingOffset = 0;
    this.trainingData = new Uint8Array(this.total * IMAGE_SIZE);
    this.trainingLabels = new Uint8Array(this.total * CLASSES);
  }

  load(data, category) {
    this.trainingData.set(data, this.loadingOffset * IMAGE_SIZE);
    const totalImages = data.length / IMAGE_SIZE;
    let label = new Uint8Array(CLASSES);
    label[category] = 1;
    for (let i = 0; i < totalImages; i++) {
      this.trainingLabels.set(label, (i + this.loadingOffset) * CLASSES);
    }
    this.loadingOffset += data.length / IMAGE_SIZE;
  }

  shuffle() {
    const order = tf.util.createShuffledIndices(this.total);
    const shuffledData = new Uint8Array(this.trainingData.length);
    const shuffledLabels = new Uint8Array(this.trainingLabels.length);

    for (let i = 0; i < this.total; i++) {
      const index = order[i];
      const data = this.trainingData.slice(index * IMAGE_SIZE, (index + 1) * IMAGE_SIZE);
      const label = this.trainingLabels.slice(index * CLASSES, (index + 1) * CLASSES);
      shuffledData.set(data, i * IMAGE_SIZE);
      shuffledLabels.set(label, i * CLASSES);
    }

    this.trainingData = shuffledData;
    this.trainingLabels = shuffledLabels;
  }

  getTrainBatch(batchSize, offset) {
    let batch = {};
    let batchData = this.trainingData.slice(offset * IMAGE_SIZE, (batchSize + offset) * IMAGE_SIZE);
    let batchLabels = this.trainingLabels.slice(offset * CLASSES, (batchSize + offset) * CLASSES);
    batch.data = tf.tensor2d(batchData, [batchSize, IMAGE_SIZE]);
    batch.labels = tf.tensor2d(batchLabels, [batchSize, CLASSES]);
    return batch;
  }
}
