#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>

// ---------- WIFI ----------
const char* ssid = "Ledezma_2.4";
const char* password = "1017195053*";

// URL de backend público
const char* serverUrl = "http://192.168.1.13:3000/api/sensors";

// ---------- DHT ----------
#define DHTPIN 23
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ---------- DS18B20 ----------
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// ---------- OLED ----------
#define SDA_PIN 22
#define SCL_PIN 21
#define OLED_WIDTH 128
#define OLED_HEIGHT 64
#define OLED_ADDR 0x3C
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

// ---------- HUMEDAD SUELO ----------
const int sensorPin = 34;

// ---------- TIEMPOS ----------
unsigned long lastSend = 0;
const unsigned long interval = 10000; // 10 segundos

// ---------- VARIABLES ----------
float tempAmbiente;
float humAmbiente;
float tempSuelo;
int humSuelo;

// ---------- FUNCIONES ----------
void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("Conectando a WiFi...");

  unsigned long startAttemptTime = millis();
  while (WiFi.status() != WL_CONNECTED &&
         millis() - startAttemptTime < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi conectado");
    Serial.print("IP ESP32: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nNo se pudo conectar al WiFi, reintentando en loop...");
  }
}

void leerSensores() {
  humAmbiente = dht.readHumidity();
  tempAmbiente = dht.readTemperature();

  int lectura = analogRead(sensorPin);
  humSuelo = map(lectura, 3800, 1200, 0, 100);
  humSuelo = constrain(humSuelo, 0, 100);

  sensors.requestTemperatures();
  tempSuelo = sensors.getTempCByIndex(0);
}

void mostrarOLED() {
  display.clearDisplay();
  display.setCursor(0, 0);

  display.println("DHT11");
  display.print("Temp: "); display.print(tempAmbiente); display.println(" C");
  display.print("Hum: "); display.print(humAmbiente); display.println(" %");

  display.println("Suelo");
  display.print("Hum: "); display.print(humSuelo); display.println(" %");
  display.print("Temp: "); display.print(tempSuelo); display.println(" C");

  display.display();
}

void enviarBackend() {
  conectarWiFi(); // asegurar conexión

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado, post pendiente...");
    return;
  }

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  String json = "{";
  json += "\"temp_ambiente\":" + String(tempAmbiente) + ",";
  json += "\"hum_ambiente\":" + String(humAmbiente) + ",";
  json += "\"hum_suelo\":" + String(humSuelo) + ",";
  json += "\"temp_suelo\":" + String(tempSuelo);
  json += "}";

  int httpResponseCode = http.POST(json);
  Serial.print("POST -> HTTP code: "); Serial.println(httpResponseCode);
  Serial.println(json);

  http.end();
}

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);

  Wire.setPins(SDA_PIN, SCL_PIN);
  Wire.begin();

  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println("OLED no encontrada");
    while (true);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  dht.begin();
  sensors.begin();

  conectarWiFi();
}

// ---------- LOOP ----------
void loop() {
  leerSensores();
  mostrarOLED();

  unsigned long now = millis();
  if (now - lastSend >= interval) {
    lastSend = now;
    enviarBackend();
  }

  // Reintento WiFi cada loop si se pierde
  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }
}
