const IMAGE_SIZE = 784;
const CLASSES = ['police_car', 'palm_tree', 'peas', 'hockey_stick', 'stereo', 'angel', 'moon', 'clarinet', 'laptop', 'leaf', 'baseball_bat', 'knife', 'vase', 'rabbit', 'The_Eiffel_Tower', 'trumpet', 'golf_club', 'pickup_truck', 'helmet', 'asparagus', 'bus', 'wine_bottle', 'guitar', 'bathtub', 'castle', 'mountain', 'banana', 'cruise_ship', 'tree', 'stop_sign', 'boomerang', 'hexagon', 'bat', 'microwave', 'computer', 'crayon', 'The_Mona_Lisa', 'ladder', 'parrot', 'baseball', 'binoculars', 'rhinoceros', 'sailboat', 'crocodile', 'kangaroo', 'megaphone', 'star', 'hot_dog', 'raccoon', 'firetruck', 'skull', 'wheel', 'suitcase', 'ear', 'hot_tub', 'backpack', 'traffic_light', 'trombone', 'sun', 'passport', 'owl', 'cloud', 'underwear', 'bee', 'belt', 'fan', 'car', 'camera', 'crown', 'hurricane', 'bridge', 'tractor', 'hammer', 'church', 'dresser', 'pear', 'arm', 'piano', 'circle', 'cat', 'octopus', 'rake', 'ceiling_fan', 'giraffe', 'airplane', 'ocean', 'squirrel', 'speedboat', 'television', 'lobster', 'spreadsheet', 'sweater', 'monkey', 'ice_cream', 'tennis_racquet', 'marker', 'potato', 'toaster', 'cookie', 'garden', 'dolphin', 'tiger', 'eye', 'bush', 'hand', 'string_bean', 'chandelier', 'bracelet', 'microphone', 'remote_control', 'lighter', 'onion', 'beard', 'snowflake', 'pizza', 'wine_glass', 'necklace', 'tornado', 'parachute', 'shorts', 'screwdriver', 'book', 'broom', 'paint_can', 'skyscraper', 'flamingo', 'beach', 'strawberry', 'leg', 'eyeglasses', 'drill', 'power_outlet', 'telephone', 'snorkel', 'fork', 'elbow', 'motorbike', 'jail', 'house', 'scorpion', 'postcard', 'yoga', 'eraser', 'panda', 'alarm_clock', 'barn', 'roller_coaster', 'crab', 'nose', 'bed', 'canoe', 'carrot', 'bowtie', 'cell_phone', 'swan', 'bottlecap', 'stitches', 'broccoli', 'bear', 'train', 'nail', 'finger', 'zigzag', 'hamburger', 'hockey_puck', 'truck', 'foot', 'submarine', 'dog', 'face', 'map', 'soccer_ball', 'harp', 'sea_turtle', 'sink', 'flower', 'floor_lamp', 'toothpaste', 'waterslide', 'bread', 'washing_machine', 'birthday_cake', 'animal_migration', 'fireplace', 'bucket', 'toothbrush', 'stairs', 'snowman', 'smiley_face', 'pineapple', 'paintbrush', 'calendar', 'table', 'hot_air_balloon', 'lighthouse', 'pillow', 'snake', 'peanut', 'stove', 'lollipop', 'cup', 'swing_set', 'knee', 'spoon', 'mouse', 'sleeping_bag', 'donut', 'moustache', 'fence', 'skateboard', 'whale', 'basket', 'tent', 'drums', 'popsicle', 'triangle', 'toilet', 'envelope', 'sock', 'grass', 'watermelon', 'light_bulb', 'windmill', 'pool', 'aircraft_carrier', 'butterfly', 'ambulance', 'pig', 'school_bus', 'cake', 'shovel', 'lightning', 'violin', 'tooth', 'oven', 'radio', 'scissors', 'sword', 'fish', 'mermaid', 'pants', 'brain', 'dishwasher', 'frog', 'campfire', 'rain', 'saw', 'flip_flops', 'calculator', 'bench', 'diamond', 'cooler', 'hat', 'horse', 'zebra', 'saxophone', 'frying_pan', 'spider', 'garden_hose', 'key', 'matches', 'sheep', 'dragon', 'blackberry', 'teddy-bear', 'compass', 'shark', 'headphones', 'mosquito', 'duck', 'fire_hydrant', 'keyboard', 't-shirt', 'umbrella', 'helicopter', 'bulldozer', 'bandage', 'diving_board', 'mouth', 'flashlight', 'stethoscope', 'clock', 'square', 'snail', 'flying_saucer', 'pond', 'house_plant', 'couch', 'lion', 'bird', 'bicycle', 'purse', 'rainbow', 'mushroom', 'picture_frame', 'line', 'rollerskates', 'dumbbell', 'hedgehog', 'cello', 'mug', 'candle', 'toe', 'cannon', 'anvil', 'chair', 'camouflage', 'elephant', 'teapot', 'pencil', 'ant', 'cactus', 'grapes', 'basketball', 'squiggle', 'hospital', 'The_Great_Wall_of_China', 'jacket', 'axe', 'door', 'penguin', 'apple', 'camel', 'feather', 'coffee_cup', 'wristwatch', 'steak', 'syringe', 'cow', 'van', 'lipstick', 'hourglass', 'blueberry', 'paper_clip', 'octagon', 'goatee', 'mailbox', 'streetlight', 'rifle', 'sandwich', 'lantern', 'see_saw', 'river', 'shoe', 'pliers'];
let model;
let cnv;

async function loadMyModel() {
  model = await tf.loadLayersModel('model/model.json');
  model.summary();
}

function setup() {
  loadMyModel();

  cnv = createCanvas(280, 280);
  background(255);
  cnv.mouseReleased(guess);
  cnv.parent('canvasContainer');

  let guessButton = select('#guess');
  guessButton.mousePressed(guess);

  let clearButton = select('#clear');
  clearButton.mousePressed(() => {
    background(255);
    select('#res').html('');
  });
}

function guess() {
  // Get input image from the canvas
  const inputs = getInputImage();

  // Predict
  let guess = model.predict(tf.tensor([inputs]));

  // Format res to an array
  const rawProb = Array.from(guess.dataSync());

  // Get top 5 res with index and probability
  const rawProbWIndex = rawProb.map((probability, index) => {
    return {
      index,
      probability
    }
  });

  const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
  const top5ClassWIndex = sortProb.slice(0, 10);
  const top5Res = top5ClassWIndex.map(i => CLASSES[i.index]);
  select('#res').html(`I see ${top5Res.toString()}`);
}

function getInputImage() {
  let inputs = [];
  // p5 function, get image from the canvas
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
  let oneRow = [];
  for (let i = 0; i < IMAGE_SIZE; i++) {
    let bright = img.pixels[i * 4];
    let onePix = [parseFloat((255 - bright) / 255)];
    oneRow.push(onePix);
    if (oneRow.length === 28) {
      inputs.push(oneRow);
      oneRow = [];
    }
  }

  return inputs;
}

function draw() {
  strokeWeight(10);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
