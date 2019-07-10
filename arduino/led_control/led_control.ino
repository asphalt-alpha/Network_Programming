int data=0;
int led=13;

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
    digitalWrite(led,LOW);
    }
  else if(data==2){
    digitalWrite(led,HIGH);
    }
    delay(500);
}
