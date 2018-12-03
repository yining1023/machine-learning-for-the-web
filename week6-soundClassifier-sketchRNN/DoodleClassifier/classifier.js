/**
 * Based on Dan Shiffman's
https://github.com/shiffman/Tensorflow-JS-Examples/tree/master/03_DoodleClassifier
**/
// Based on: https://github.com/tensorflow/tfjs-examples/tree/master/mnist

class Classifier {

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 3,
      filters: 16,
      // strides: 1,
      activation: 'relu',
      // kernelInitializer: 'VarianceScaling'
    }));
    this.model.add(tf.layers.maxPooling2d({
      poolSize: 2,
      strides: 2
    }));
    this.model.add(tf.layers.conv2d({
      kernelSize: 3,
      filters: 32,
      // strides: 1,
      activation: 'relu',
      // kernelInitializer: 'VarianceScaling'
    }));
    this.model.add(tf.layers.maxPooling2d({
      poolSize: 2,
      strides: 2
    }));
    this.model.add(tf.layers.conv2d({
      kernelSize: 3,
      filters: 32,
      activation: 'relu'
    }));
    this.model.add(tf.layers.flatten({}));
    this.model.add(tf.layers.dense({
      units: 64,
      // kernelInitializer: 'VarianceScaling',
      activation: 'relu'
    }));
    this.model.add(tf.layers.dense({
      units: CLASSES,
      // kernelInitializer: 'VarianceScaling',
      activation: 'softmax'
    }));

    const optimizer = 'rmsprop';
    this.model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  }

  async train(data) {
    const batchSize = 100;
    console.log('training data: ', data)
    const iterations = data.total / batchSize;
    for (let i = 0; i < iterations; i++) {
      const batch = data.getTrainBatch(batchSize, i * batchSize);
      const batchData = batch.data.reshape([batchSize, 28, 28, 1]);
      const batchLabels = batch.labels;
      const options = {
        batchSize: batchSize,
        validationData: null,
        epochs: 5
      }

      const history = await this.model.fit(batchData, batchLabels, options);
      const loss = history.history.loss[0];
      const accuracy = history.history.acc[0];
      console.log(`batch: ${i} loss: ${nf(loss, 2, 2)} accuracy: ${nf(accuracy, 2, 2)}`);
    }
  }

  predict(input) {
    const inputData = tf.tensor(input, [1, 28, 28, 1]);
    const output = this.model.predict(inputData);
    const outputData = output.dataSync();
    console.log('outputData: ', outputData);
    const axis = 1;
    const predictions = Array.from(output.argMax(axis).dataSync());
    console.log('predictions: ', predictions)
    return predictions[0];
  }
}
