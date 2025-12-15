#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>

// -------------------
// Configuración WiFi
// -------------------
const char* ssid = "Aifon de Jackson";
const char* password = "Jolier0211";

// URL de tu backend público (Cloudflare Tunnel o Render)
const char* backendRegisterUrl = "https://iot-prueba.onrender.com/api/camera/register";
const char* backendControlUrl  = "https://iot-prueba.onrender.com/api/camera/control"; // Endpoint para consultar estado

// -------------------
// Servidor web local
// -------------------
WebServer server(80);

// -------------------
// Pines AI Thinker ESP32-CAM
// -------------------
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// -------------------
// Control de streaming
// -------------------
bool streamingActivo = false;
unsigned long lastCheck = 0;
const unsigned long checkInterval = 5000; // cada 5 segundos consulta al backend

// -------------------
// Función de streaming
// -------------------
void handleStream() {
  if (!streamingActivo) {
    server.send(403, "text/plain", "Streaming desactivado por backend");
    return;
  }

  WiFiClient client = server.client();
  String response =
    "HTTP/1.1 200 OK\r\n"
    "Content-Type: multipart/x-mixed-replace; boundary=frame\r\n\r\n";

  server.sendContent(response);

  while (client.connected() && streamingActivo) {
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Error capturando frame");
      return;
    }

    server.sendContent("--frame\r\n");
    server.sendContent("Content-Type: image/jpeg\r\n");
    server.sendContent("Content-Length: " + String(fb->len) + "\r\n\r\n");

    client.write(fb->buf, fb->len);
    server.sendContent("\r\n");

    esp_camera_fb_return(fb);

    delay(50); // Ajusta FPS
  }
}

// -------------------
// Registro de IP en backend
// -------------------
void registerCamera() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(backendRegisterUrl);
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"ip\":\"" + WiFi.localIP().toString() + "\"}";

  int httpCode = http.POST(payload);
  http.end();

  Serial.print("Registro cámara HTTP code: ");
  Serial.println(httpCode);
}

// -------------------
// Consulta al backend para el control de streaming
// -------------------
void checkStreamingStatus() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(backendControlUrl);
  int httpCode = http.GET();

  if (httpCode == 200) {
    String payload = http.getString();
    streamingActivo = (payload.indexOf("true") >= 0); // se espera JSON simple {"streaming": true/false}
    Serial.print("Estado streaming actualizado: ");
    Serial.println(streamingActivo ? "ON" : "OFF");
  } else {
    Serial.print("Error al consultar backend, HTTP code: ");
    Serial.println(httpCode);
  }

  http.end();
}

// -------------------
// Setup
// -------------------
void setup() {
  Serial.begin(115200);

  // Configuración cámara
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound()) {
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Error inicializando cámara");
    return;
  }

  // Conexión WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("IP ESP32-CAM: ");
  Serial.println(WiFi.localIP());

  // Registro automático en backend
  registerCamera();

  // Configuración rutas
  server.on("/stream", HTTP_GET, handleStream);
  server.begin();
}

// -------------------
// Loop
// -------------------
void loop() {
  server.handleClient();

  // Consulta periódica al backend
  unsigned long now = millis();
  if (now - lastCheck >= checkInterval) {
    lastCheck = now;
    checkStreamingStatus();
  }
}
