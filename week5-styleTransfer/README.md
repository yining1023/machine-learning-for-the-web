# Week 6 Image Transfermation - Style Transfer

## Presentation: [Slides](https://docs.google.com/presentation/d/1QJumvGwCzErFJFva2LnqNLUmIDp_uz83fPWC6iCR3l0/edit?usp=sharing)
- What is Style Transfer
- How does it work
- What Neural Networks See
- Different kinds of style transfer
- How to train your own style transfer
- Use the trained model in ml5.js (one image and webcam images)

## Coding session:
- Training a new Style Transfer model, Run this [Google Colab](https://colab.research.google.com/drive/1TZNdhoUEBoxQqY5EFloZcuyYUs9oNQ-g?usp=sharing). Watch this [video1](https://www.loom.com/share/dc6751df8b2f4341ac6f836050850e15), [video2](https://www.loom.com/share/6bf37a744aff498ea231358e982b122d)
  - Some Notes:
    - Open the colab, make sure the GPU is enabled: Menu - Runtime - Change runtime type
    - Run through each cell, wait for each cell to finish running, make sure there is no error in each cell's output
    - Step 2 and 3 may take 1 and 2 hours to finish, keep the tab open and active while waiting(Power your computer while waiting)
    - Once step 2(download datasets) finishes, don't re-run it, becase it takes a long to finish
    - While running step 2(download dataset), it might notify you that "Disk is almost full", ignore that
- Running Style Transfer model in ml5.js, [p5 sketch](https://github.com/yining1023/machine-learning-for-the-web/tree/master/week5-styleTransfer/styleTransfer-ml5/StyleTransfer_Video)


## See demos live
- [Style Transfer on one image](https://yining1023.github.io/machine-learning-for-the-web/week5-styleTransfer/styleTransfer-ml5/StyleTransfer_Image/)
- [Style Transfer on webcam images](https://yining1023.github.io/machine-learning-for-the-web/week5-styleTransfer/styleTransfer-ml5/StyleTransfer_Video/)
- [Photo Styles Transfer with Runway](https://yining1023.github.io/machine-learning-for-the-web/week5-styleTransfer/photostylestansfer/) (Need to open Runway, and run 'FastPhotoStyle' model on localhost:8000)
- [AdainStyleTransfer and bodyPix with Runway](https://yining1023.github.io/machine-learning-for-the-web/week5-styleTransfer/photostylestansfer/) (Need to host AdainStyleTransfer model in Runway, and change the model url and auth in the code)

## [Homework](https://github.com/yining1023/machine-learning-for-the-web/wiki/Week-5-2020-fall)

## Resource:
- [ml5js style transfer pre-trained models](https://github.com/ml5js/ml5-data-and-models/tree/master/models/style-transfer)
- [Google Colab](https://colab.research.google.com/)
- [Training a style transfer model with on Spell, github](https://github.com/yining1023/styleTransfer_spell)
- [Training a style transfer model with on Spell, video](https://youtu.be/STHRNIJc-vI)
- [Introduction to Spell (for Machine Learning in the Cloud)](https://youtu.be/ggBOAPtFjYU)
- [Creating your own style transfer mirror with Gradient° and ml5.js](https://blog.paperspace.com/creating-your-own-style-transfer-mirror/)
