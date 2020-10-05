#include <Servo.h> 

Servo myservo;
int servoPin = 9;
int redPin = 2;
int greenPin = 3;
int bluePin = 4;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  myservo.attach(servoPin);
  myservo.write(0);  // set servo to mid-point

  // start serial port at 9600 bps:
  Serial.begin(9600);
} 

void loop() {
  if (Serial.available() > 0) { // if there's serial data available
    int inByte = Serial.read(); // read it
    Serial.println(inByte);
    if (inByte == 1) {
      myservo.write(0);
      // Light red LED
      digitalWrite(redPin, HIGH);
      digitalWrite(greenPin, LOW);
      digitalWrite(bluePin, LOW);
    } else if (inByte == 2) {
      myservo.write(90);
      // Light green LED
      digitalWrite(redPin, LOW);
      digitalWrite(greenPin, HIGH);
      digitalWrite(bluePin, LOW);
    } else if (inByte == 3) {
      myservo.write(180);
      // Light BLUE LED
      digitalWrite(redPin, LOW);
      digitalWrite(greenPin, LOW);
      digitalWrite(bluePin, HIGH);
    } else {
      myservo.write(0);
      digitalWrite(redPin, HIGH);
      digitalWrite(greenPin, HIGH);
      digitalWrite(bluePin, HIGH);
    }
    // Wait for 1 second
    delay(1000);
  }
}
