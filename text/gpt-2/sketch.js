// Need to Runway - GPT-2 model at http://localhost:8000
// Update the following url based on the server address shown in your Runway app under Input--Network
const url = 'http://localhost:8000/query';

let myInput;
let myBtn;
let results;

function setup() {
  noCanvas();
  myInput = createInput('The meaning of life is');
  myInput.size(500, 100);
  myBtn = createButton('Generate');
  myBtn.mousePressed(generate);
  results = createP('');
}

function generate() {
  const inputs = {
    prompt: myInput.value(),
    max_characters: 512,
    top_p: 0.9,
    seed:1000
  };

  httpPost(url, 'json', inputs, function(data) {
    if (data.generated_text) {
      results.html(data.generated_text);
    }
  });
}