let video;
let myPoseNet;
let noses = [];

function setup() {
    video = createCapture(VIDEO, videoReady);
    video.hide();
    createCanvas(640, 480);
    fill(255, 0, 0);
    // ellipseMode(center);
}

function draw() {
    image(video, 0, 0, 640, 480);
    noses.forEach(n => {
        ellipse(n.x, n.y, 40, 40)
    })
}

function videoReady() {
    myPoseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
    console.log('model loaded')
    myPoseNet.on('pose', gotResults);
}

function gotResults(res) {
    if (res) {
        // console.log(res);
        // if (res[0] && res[0].pose && res[0].pose.nose) {
        //     console.log(res[0].pose.nose.x)
        //     console.log(res[0].pose.nose.y)
        //     noseX = res[0].pose.nose.x;
        //     noseY = res[0].pose.nose.y;
        // }
        noses = [];
        res.map(onePose => {
            if (onePose.pose && onePose.pose.nose) {
                noses.push(onePose.pose.nose);
            }
        });
    }
}