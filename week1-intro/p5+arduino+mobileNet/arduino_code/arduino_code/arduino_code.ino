void setup() {
 Serial.begin(9600);           // initialize serial communications
}
 
void loop() {
 if (Serial.available() > 0) { // if there's serial data available
   int inByte = Serial.read();   // read it
   Serial.write(inByte);         // send it back out as raw binary data
   analogWrite(13, inByte);       // use it to set the LED brightness
 }
}
