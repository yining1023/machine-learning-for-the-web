# Week 4 Face and Hand

## Presentation: [Slides](https://docs.google.com/presentation/d/1jSA93R4QJdz2ixko4wSyfrVsa523u042V4DQknTEssc/edit?usp=sharing)

- Face recognition
  - Face-api
  - Face Mesh
- Hand
  - HandPose

## Coding session:

- Face-api
- Face Mesh
- HandPose

## See demos live
- New ml5js next gen handpose ([ml5 next gen](https://github.com/ml5js/ml5-next-gen), [All examples](https://github.com/ml5js/ml5-next-gen/tree/main/examples))
  - [handpose start and stop](https://editor.p5js.org/yining/sketches/PLf5QNeFA)
  - [handpose keypoints](https://editor.p5js.org/yining/sketches/H7qZS8iMF)
  - [handpose parts](https://editor.p5js.org/yining/sketches/2WwwqrhNl)
  - [handpost image](https://editor.p5js.org/yining/sketches/624wmm2X5)
- Face-api
  - [FaceApi_Image_Landmarks](https://yining1023.github.io/machine-learning-for-the-web/face-hand/FaceApi/FaceApi_Image_Landmarks)
  - [FaceApi_Video_Landmarks](https://yining1023.github.io/machine-learning-for-the-web/face-hand/FaceApi/FaceApi_Video_Landmarks)
- Face Mesh
  - [Facemesh_Image](https://yining1023.github.io/machine-learning-for-the-web/face-hand/Facemesh/Facemesh_Image)
  - [Facemesh_Webcam](https://yining1023.github.io/machine-learning-for-the-web/face-hand/Facemesh/Facemesh_Webcam)
  - [Cat face filter](https://neon-scintillating-harpymimus.glitch.me/), [code](https://github.com/yining1023/cat-filter/tree/main)
- HandPose
  - [Handpose_Image](https://yining1023.github.io/machine-learning-for-the-web/face-hand/Handpose/Handpose_Image)
  - [Handpose_Webcam](https://yining1023.github.io/machine-learning-for-the-web/face-hand/Handpose/Handpose_Webcam)
  - Training hand pose model
    - Hand pose tracking + KNN Classification, [p5 web editor code](https://editor.p5js.org/yining/sketches/uUwg0z9Z5), [demo video](https://www.loom.com/share/f81cf908e5b7404ba0071902019d67c2)
    - Hand pose tracking + Neural Network, [demo video](https://www.loom.com/share/420fa5941dea411491af817011622c86)
      - [Collect data](https://editor.p5js.org/yining/sketches/dCoPm-Opb)
      - [Train the model](https://editor.p5js.org/yining/sketches/IrBFfXbSF)
      - [Run the model](https://editor.p5js.org/yining/sketches/6cFF9-L-Z)
  - Multiple hands detection:
    - [Handpose multiple hands with mediapipe](https://editor.p5js.org/yining/sketches/cME_7BnLW) If the webcam video is not loading, try open a incognito window, or set the camera access for the browser.
    - [KNN Classifier on multiple hands](https://editor.p5js.org/yining/sketches/C91TLtexi): Change `HAND_NUM = 2` if you would like to detect other hand numbers. Once clicking on "Add example" button, it will start collecting data in 5 seconds for 5 seconds.

## [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-4-2023-Spring)

# Resource

- [ml5js - faceapi](https://learn.ml5js.org/#/reference/face-api)
- [ml5js - faceMesh source](https://github.com/ml5js/ml5-library/blob/development/src/Facemesh/index.js)
- [ml5js - handPose source](https://github.com/ml5js/ml5-library/blob/development/src/Handpose/index.js)
- [tfjs - faceapi-js](https://github.com/justadudewhohacks/face-api.js/)
- [tfjs - faceMesh](https://github.com/tensorflow/tfjs-models/tree/master/facemesh)
- [tfjs - handPose](https://github.com/tensorflow/tfjs-models/tree/master/handpose)

# Projects

- [LipSync game using Face Mesh model](https://lipsync.withyoutube.com/)
- [Customizable AR face masks - Made with TensorFlow.js](https://www.youtube.com/watch?v=TpiGFaHC_5U)
- [fingerspelling](https://fingerspelling.xyz/)
- [Cat filter](https://neon-scintillating-harpymimus.glitch.me), [code](https://github.com/yining1023/cat-filter)
