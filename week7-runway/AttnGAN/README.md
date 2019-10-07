# Runway AttnGAN(text to image) model with p5.js

## Get Started
1. Open Runway, add AttnGAN model to your workspace
2. Select "Network" as input and ouput, Run the model
    Your Runway interface should look like this:
    <img src="https://raw.githubusercontent.com/yining1023/machine-learning-for-the-web/master/week6-runway/AttnGAN/images/demo2.png" width="500">

3. Update the "port" variable in the "sketch.js" file to the number shown in Runway input "Network" window, e.g. http://localhost:8006
4. Run the sketch
    Go to current directory
    ```
    $ python -m SimpleHTTPServer     # $ python3 -m http.server (if you are using python 3)
    ```
    Go to `localhost:8000` in your browser
5. Type a sentence in the input below, click the "text to image" button get a an image.
    You should be able to see results like this:

    <img src="https://raw.githubusercontent.com/yining1023/machine-learning-for-the-web/master/week6-runway/AttnGAN/images/demo1.png" width="500">
