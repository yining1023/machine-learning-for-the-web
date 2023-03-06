# Week 5 Sound

## Workshop:

### Sound Classifier with Arduino and Teachable Machine

- [Demo video](https://youtu.be/bmyncxth3_Y), [Demo made by Cara Neels](https://vimeo.com/363431151)
- <img src="https://raw.githubusercontent.com/yining1023/machine-learning-for-the-web/master/week4-soundClassifier/images/sound-circuit.jpeg" alt="sound_circuit" width="300px"><img src="https://github.com/yining1023/machine-learning-for-the-web/blob/main/week4-soundClassifier/images/sound-demo.png?raw=true" alt="sound_demo" width="300px">

#### Steps

1. [Download](https://www.arduino.cc/en/main/software) Arduino IDE
2. [Download](https://github.com/p5-serial/p5.serialcontrol/releases) p5 serial app (Don't open the app yet)
3. Run p5 code in p5 web editor [sketch](https://editor.p5js.org/yining/sketches/eHYnYa5BR) (Remember to update the portName and mySoundModelURL, and update class names to your own classes.)
4. Build the arduino circuit like the image above
5. Upload Arduino code to the Arduino board, You can find [here](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week4-soundClassifier/teachableMachineArduino-sound/arduino_code)
6. Open p5 serial app(don't open any port in the p5 serial app, just keep the app open)
7. Go back to p5 web editor, test if p5 sketch and arduino can communicate.

### Sound Classifier with Arduino and Teachable Machine with Servo Motor

- Upload the [Arduino Sketch](https://github.com/yining1023/Machine-Learning-for-Physical-Computing/tree/master/Examples/TeachableMachineArduino/SoundClassifier_with_Servo/SoundClassifier_Servo) to the Arduino board
- Running [p5 sketch](https://editor.p5js.org/yining/sketches/q8JEPDwK7), remember to update the `portName` and `mySoundModelURL`, and update class names to your own classes.
- [Video Demo](https://youtu.be/RnStPxTfEnU)
- Circuit
  - Connect D2,3,4 to 3 LEDs
  - Connect servo signal pin to D9. [More about](https://github.com/yining1023/Machine-Learning-for-Physical-Computing/tree/master/Examples/ServoMotor) how to use servo motor with arduino.
    <img src="https://raw.githubusercontent.com/yining1023/Machine-Learning-for-Physical-Computing/master/images/sound_servo.jpg" alt="sound_servo" width="400px">

### Image Classifier with Arduino:

- Running this [p5 sketch](https://editor.p5js.org/yining/sketches/Ob8Zkf_FZ) on p5 web editor, remember to update the `portName` and `myImageModelURL`, and update class names to your own classes.
- [Video Demo](https://youtu.be/ZGafimlnLw8)

### Pose Classifier with Arduino:

- Running this [p5 sketch](https://editor.p5js.org/p52/sketches/GIYEO8zY0) on p5 web editor, remember to update the `portName` and `poseModelUrl`, and update class names to your own classes.
- [Video Demo](https://youtu.be/2E0LpbdPjMs)

## Help

- [How to use p5 serial](https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/)
- Tips for p5 serial
  - Download the app [here](https://github.com/p5-serial/p5.serialcontrol/releases/tag/0.1.1)
  - Get the port name right

## Trouble shooting:

- The models works in p5 web editor, but my LEDs are not lighted up
  - Light up LEDs in the arduino code directly to test if there is anything wrong with the LEDs.
  - Make sure p5 serial is working: There shouldn't be any error in the console. The p5 serial app should be open, but do NOT connect to the port inside of the p5 serial app, otherwise p5 serial app will be using the port, then p5 web editor cannot use the port.
  - You can find your portname in the p5 serial app. But there is no need to connect to the port in the p5 serial app.
  - When you are re-uploading Arduino sketch, you need to stop p5 sketch in the editor and close the p5 serial app.

## See demos live:

- [Sound Classifier Speechcommand](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/SoundClassification_speechcommand)
- [Image Classifier with Teachable Machine](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/teachableMachineImage/)
- [Sound Classifer with Teachable Machine](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/teachableMachineSound/)
- [Pose Classifier with Teachable Machine](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/teachableMachinePoses/)
- [p5 Speech Continuous Recognition](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/p5Speech/Continuous-Recognition)
- [p5 Speech Single Recognition](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/p5Speech/Simple-Recignition)
- [p5 Speech Speech Synthesis](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/p5Speech/Speech-Synthesis)
- [PitchDetection](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/PitchDetection/PitchDetection), https://editor.p5js.org/ml5/sketches/PitchDetection
- [PitchDetection Game](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/PitchDetection/PitchDetection_Game), https://editor.p5js.org/ml5/sketches/PitchDetection_Game
- [PitchDetection Piano](https://yining1023.github.io/machine-learning-for-the-web/week4-soundClassifier/PitchDetection/PitchDetection_Piano), https://editor.p5js.org/ml5/sketches/PitchDetection_Piano
- [Sound Classifier with Teachable Machine and show gifs](https://editor.p5js.org/yining/sketches/GW1SiSm0W)

## [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-5-2023-Spring)

## Links

- [p5 speech](https://idmnyu.github.io/p5.js-speech/)
- [tfjs speech command model](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands)
- [ml5js sound classifier](https://learn.ml5js.org/#/reference/sound-classifier)
- [Arduino Machine learning](https://blog.arduino.cc/2019/10/15/get-started-with-machine-learning-on-arduino/), [Color2Emoji](https://blog.arduino.cc/2019/11/07/fruit-identification-using-arduino-and-tensorflow/)

## Inspirations about Teachable Machine:

- [Airi Flies](https://yonaymoris.github.io/AiriFlies/)
- [Eyeo 2019 - Coding Train Race](https://vimeo.com/354276216), [code](https://github.com/CodingTrain/Eyeo-Festival-2019)
- [Teachable Snake](https://experiments.withgoogle.com/teachable-snake)
- [Move that Little Dude](https://dylandawkinsblog.wordpress.com/2019/05/08/machine-learning-for-web-final/)
