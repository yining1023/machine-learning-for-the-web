import {QuickdrawData} from './data.js';

async function showExamples(data) {
  // Create a container in the visor
  const surface =
    tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});  

  // Get the examples
  const examples = data.nextTestBatch(100);
  const numExamples = examples.xs.shape[0];

  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // Reshape the image to 28x28 px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1]);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px;';
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
}

async function run() {
  // 1-2. Gathering and Preparing that Data
  const data = new QuickdrawData();
  await data.load();
  await showExamples(data);

  // 3. Build a model
  const model = getModel();
  tfvis.show.modelSummary({name: 'Model Architecture'}, model);
  
  // 4. Train the model
  await train(model, data);

  // 5. Evaluate the model
  await showAccuracy(model, data);
  await showConfusion(model, data);

  // Save the model
  await model.save('downloads://myDoodleNet');
}

document.addEventListener('DOMContentLoaded', run);

// Complete this function
function getModel() {
  // Create a sequential model
  // Write code here
  
  // Define image size
  // Write code here
  
  // In the first layer of out convolutional neural network we have 
  // to specify the input shape. Then we specify some paramaters for 
  // the convolution operation that takes place in this layer.
  // Write code here

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  // Write code here
  
  // Repeat another conv2d + maxPooling stack. 
  // Note that we have more filters in the convolution.
  // Write code here
  
  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  // Write code here

  // Our last layer is a dense layer which has 3 output units, one for each
  // output class (i.e. 0, 1, 2).
  // Write code here

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  // Write code here

  return model;
}

async function train(model, data) {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', styles: { height: '1000px' }
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  
  const BATCH_SIZE = 512;
  const TRAIN_DATA_SIZE = 4000;
  const TEST_DATA_SIZE = 1000;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  // Train the model
  // Write code here
}

const classNames = ['BOWTIE', 'LOLLIPOP', 'RAINBOW'];

function doPrediction(model, data, testDataSize = 500) {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const labels = testData.labels.argMax([-1]);
  const preds = model.predict(testxs).argMax([-1]);

  testxs.dispose();
  return [preds, labels];
}


async function showAccuracy(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  const container = {name: 'Accuracy', tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}

async function showConfusion(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
  tfvis.render.confusionMatrix(
      container, {values: confusionMatrix}, classNames);

  labels.dispose();
}
