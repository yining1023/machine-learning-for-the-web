int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);  // sets the pin as output
  Serial.begin(9600);           // initialize serial communications
}
 
void loop() {
 if (Serial.available() > 0) { // if there's serial data available
   int inByte = Serial.read();   // read it
   Serial.write(inByte);         // send it back out as raw binary data
   analogWrite(ledPin, inByte);       // use it to set the LED brightness
   delay(2000);                // waits for 2 seconds
   analogWrite(ledPin, 0);  // sets the LED off
 }
}
