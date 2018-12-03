# Machine Learning for the Web
This is a repository for the "Machine Learning for the Web" class at ITP, NYU

Libraries like [TensorFlow.js](https://js.tensorflow.org/) and [ml5.js](https://ml5js.org/) unlocked new opportunities for interactive machine learning projects in the browser. The goal of this class is to learn and understand common machine learning techniques and apply them to generate creative outputs in the browser.

This class will start with running models in the browser using high-level APIs from ml5.js, as well as explore the Layer APIs from TensorFlow.js to train models using custom data. This class will also cover preparing the dataset for training models.

At the completion of this course, students will have a better understanding of a few machine learning models, how do they work, how to train these models, and their use case to creative projects. Students will also be able to create interactive ML web applications with pre-trained models.

## Info
- Yining Shi, Tuesdays, 6:30pm-9:00pm, Room 20, 10/30 - 12/11/2018
- [Office Hours](https://calendar.google.com/calendar/selfsched?sstoken=UUVtNWtYeW9BX3ZhfGRlZmF1bHR8NDIzN2VhZmY5OTQ4MTM2NTRmY2Q4ODQyY2Q3NDZmM2I)
- [All class dates](http://help.itp.nyu.edu/curriculum/registration/fall-2018-reg-info/fall-2018-class-dates-term-deadlines)

## Get started
To run each examples, open your terminal, type in the following commands:
```
$ git clone https://github.com/yining1023/machine-learning-for-the-web.git
$ cd machine-learning-for-the-web
$ python -m SimpleHTTPServer     # $ python3 -m http.server (if you are using python 3)
```
Go to `localhost:8000` in your browser, you will see a directory list like this:
- week1-intro/
- week2-knnClassifier/
- week3-styleTransfer/
- week4-pix2pix/
- week5-soundClassifier/
- week6-workshop/

Click into each week, you will see the example for each week.

## Syllabus
### Week 1 Introduction to Machine Learning, MobileNet

* [Notes](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week1-intro): Introduction to Machine Learning

* Coding session:
  * Installing ml5.js
  * Running Image Classification example with ml5.js
  * Installing tf.js
  * Running examples with tf.js

* [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-1)

### Week 2 Image Classification (KNN classifier, PoseNet)

* [Notes](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week2-ImageClassifier-KNN-Posenet)

* Coding session:
  * Make a KNN Image Classifier
  * Regression with feature extractor
  * Posnet
  * poseNet + KNN Image Classifier

* [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-2)

### Week 3 Image Transformation (Part 1) Style transfer

* Review: Showing the homework from last week, discuss any difficulties and other creative outputs
* [Notes](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week3-styleTransfer)

* Coding session:
  * Setup Spell.run training environment
  * Training a new Style Transfer model
  * Running Style Transfer model in ml5.js

* [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-3)

### Week 4 Image Transformation (Part 2) pix2pix

* Review: Showing the homework from last week, discuss any difficulties when you are training your own style trasnfer model
* [Notes](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week4-pix2pix)

* Coding session:
  - Running pix2pix with ml5.js
  - Setup Spell.run training environment
  - Prepare dataset for pix2pix
  - Training a new pix2pix model

* [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/week-4)

### Week 5 Final assignment proposal and guest lecture

* More code examples and demo [here](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week5-moreExamples)
* Review: Present your final assignment proposal and the experiments you did so far
* Guest speaker: [Runwayml](https://runwayapp.ai/)

### Week 6 Speech recognition, Sketch RNN, Body pix, Build your own model

* [Notes](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week6-soundClassifier-sketchRNN)

* Coding session:
  - Body pix from tf.js-models
  - Speech recognition from p5 speech.js
  - Sketch RNN from ml5.js
  - Build a doodle classifier with tf.js

* Homework: Work on the final assignment, prepare the presentation

### Week 7

Final Presentation

## Resources
- [ml5js](https://ml5js.org/)
- [TensorFlow.js](https://js.tensorflow.org/)
- [Coding Train on ml5js](https://www.youtube.com/watch?v=jmznx0Q1fP0)
- [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course/)
- [Google AI Adventures](https://www.youtube.com/playlist?list=PLIivdWyY5sqJxnwJhe3etaK7utrBiPBQ2)
- [fast.ai](http://www.fast.ai/)
- [Spell.run](http://spell.run)
- [Siraj Raval's AI Youtube Channel](https://www.youtube.com/channel/UCWN3xxRkmTPmbKwht9FuE5A)
- [3Blue1Brown Youtube Channel](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw)

## Requirements
- You are required to attend all class meetings and submit all weekly assignments.
- Grading (pass/fail) will be based on a combination of factors:
  * Attendance, participation in class discussion, and engagement in other students' projects (25%)
  * Quality of weekly assignments (50%)
  * Last Assignment (25%)
