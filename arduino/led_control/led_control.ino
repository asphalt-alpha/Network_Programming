int data=0;
int led=13;

#include <Adafruit_NeoPixel.h>
#define PIN            13                              // 제어 신호핀
#define NUMPIXELS      18                             // 제어하고 싶은 LED 개수

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
int delayval = 500; // delay for half a second
float RGBS[3]={200,200,200};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    Serial.print("data ");
    data=Serial.parseInt();
    Serial.println(data);
    }
  if(data==1){
    for(int i=0; i<NUMPIXELS; i++){
      pixels.setPixelColor(i,pixels.Color(0,0,0));
    }
  }
  else if(data==2){
    for(int i=0; i<NUMPIXELS; i++){
      pixels.setPixelColor(i,pixels.Color(RGBS[0],RGBS[1],RGBS[2]));
    }
  }
  pixels.show();
    delay(500);
}
