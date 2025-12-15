#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>

// =====================
// WIFI
// =====================
const char* ssid = "Aifon de Jackson";
const char* password = "Jolier0211";

// Backend público
const char* serverUrl = "https://iot-prueba.onrender.com/api/sensors";
const char* ledStatusUrl = "https://iot-prueba.onrender.com/api/led";

// =====================
// DHT11
// =====================
#define DHTPIN 23
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// =====================
// DS18B20
// =====================
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// =====================
// OLED
// =====================
#define SDA_PIN 22
#define SCL_PIN 21
#define OLED_WIDTH 128
#define OLED_HEIGHT 64
#define OLED_ADDR 0x3C
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

// =====================
// HUMEDAD SUELO
// =====================
const int sensorPin = 34;

// =====================
// LED CONTROL REMOTO
// =====================
#define LED_PIN 2
bool lastLedState = false;
unsigned long lastLedCheck = 0;
const unsigned long ledInterval = 2000;

// =====================
// TIMERS
// =====================
unsigned long lastSend = 0;
const unsigned long sendInterval = 10000;

// =====================
// VARIABLES
// =====================
float tempAmbiente = 0;
float humAmbiente = 0;
float tempSuelo = 0;
int humSuelo = 0;

// =====================
// WIFI
// =====================
void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("Conectando WiFi...");

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi conectado");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nNo se pudo conectar");
  }
}

// =====================
// SENSORES
// =====================
void leerSensores() {
  humAmbiente = dht.readHumidity();
  tempAmbiente = dht.readTemperature();

  int lectura = analogRead(sensorPin);
  humSuelo = map(lectura, 3800, 1200, 0, 100);
  humSuelo = constrain(humSuelo, 0, 100);

  sensors.requestTemperatures();
  tempSuelo = sensors.getTempCByIndex(0);
}

// =====================
// OLED
// =====================
void mostrarOLED() {
  display.clearDisplay();
  display.setCursor(0, 0);

  display.println("Ambiente");
  display.print("T: "); display.print(tempAmbiente); display.println(" C");
  display.print("H: "); display.print(humAmbiente); display.println(" %");

  display.println("Suelo");
  display.print("H: "); display.print(humSuelo); display.println(" %");
  display.print("T: "); display.print(tempSuelo); display.println(" C");

  display.display();
}

// =====================
// BACKEND - SENSORES
// =====================
void enviarBackend() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  String json =
    "{"
    "\"temp_ambiente\":" + String(tempAmbiente) + "," +
    "\"hum_ambiente\":" + String(humAmbiente) + "," +
    "\"hum_suelo\":" + String(humSuelo) + "," +
    "\"temp_suelo\":" + String(tempSuelo) +
    "}";

  int code = http.POST(json);
  Serial.print("POST sensores -> ");
  Serial.println(code);

  http.end();
}

// =====================
// LED REMOTO
// =====================
void actualizarLed() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(ledStatusUrl);

  int code = http.GET();
  if (code == 200) {
    String payload = http.getString();

    bool newState = payload.indexOf("\"ledState\":true") > -1;

    if (newState != lastLedState) {
      digitalWrite(LED_PIN, newState ? HIGH : LOW);
      lastLedState = newState;

      Serial.print("LED -> ");
      Serial.println(newState ? "ON" : "OFF");
    }
  }

  http.end();
}

// =====================
// SETUP
// =====================
void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  Wire.setPins(SDA_PIN, SCL_PIN);
  Wire.begin();

  display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  dht.begin();
  sensors.begin();

  conectarWiFi();
}

// =====================
// LOOP
// =====================
void loop() {
  unsigned long now = millis();

  leerSensores();
  mostrarOLED();

  if (now - lastSend >= sendInterval) {
    lastSend = now;
    enviarBackend();
  }

  if (now - lastLedCheck >= ledInterval) {
    lastLedCheck = now;
    actualizarLed();
  }

  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }
}
