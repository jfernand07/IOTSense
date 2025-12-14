
---

# Documentación del Proyecto IoT con ESP32 y ESP32-CAM

## 1. Descripción del Proyecto

Sistema IoT para monitoreo ambiental y transmisión de video en tiempo real:

* **ESP32 principal**: sensores de temperatura y humedad, envía datos al backend.
* **ESP32-CAM**: captura imágenes, streaming MJPEG, control digital activable/desactivable.
* **Backend Node.js**: recibe datos, registra cámara, controla streaming, expone endpoints accesibles públicamente.

Objetivo: Automatización completa, datos accesibles desde un frontend web, escalable a producción.

---

## 2. Arquitectura del Sistema

```
[ESP32 Sensores] ---> WiFi ---> [Backend Node.js] ---> [Web App / Página Pública]
[ESP32-CAM] -------> WiFi ---> [Backend Node.js] ---> [Web App / Página Pública]
```

### Diagrama de Flujo de Datos y Control Digital

```
ESP32-CAM                     Backend Node.js                      Frontend Web
+----------------+            +----------------+                   +----------------+
| Captura frames | -->HTTP--> | Registro IP    |                   | <img src=...>  |
| Streaming OFF/ON <-control- | StreamingAct.  | <--fetch-------- | Botón digital  |
+----------------+            +----------------+                   +----------------+
```

* Backend mantiene variable `streamingActivo`.
* Frontend puede activar/desactivar streaming sin hardware.
* Streaming MJPEG es proxy desde ESP32-CAM.

---

## 3. Hardware

### 3.1 ESP32 principal

* Sensores:

  * **DHT11**: temperatura y humedad ambiente.
  * **DS18B20**: temperatura del suelo.
  * **Humedad del suelo**: pin analógico.
* OLED I2C (`SDA = 22`, `SCL = 21`).

### 3.2 ESP32-CAM

* Pines AI Thinker: PWDN=32, RESET=-1, XCLK=0, SIOD=26, SIOC=27, D0-D7=5-39, VSYNC=25, HREF=23, PCLK=22.
* PSRAM: streaming VGA o QVGA.
* Streaming digitalmente controlable.

### 3.3 Alimentación

* 5V, GND común.
* Fuente dedicada recomendada para ESP32-CAM.

---

## 4. Código ESP32 (Sensores)

* Inicializa sensores y OLED.
* Lee y procesa datos de humedad y temperatura.
* Envía datos al backend vía HTTP POST.
* Reconexión WiFi automática.
* Intervalo configurable.

### Diagrama de Flujo Sensores

```
[ESP32 Sensores] 
      |
      v
  Leer sensores
      |
      v
  Procesar datos
      |
      v
  Mostrar OLED
      |
      v
  Enviar a Backend
      |
      v
  Reintentar si WiFi cae
```

---

## 5. Código ESP32-CAM (Streaming)

* Inicializa cámara y WiFi.
* Registro de IP y endpoint en backend.
* Streaming MJPEG en `/stream`.
* Activable/desactivable desde backend.
* FPS ajustable con `delay(50)`.

### Diagrama de Control Digital Streaming

```
Frontend Web
   |
   v
POST /api/camera/control { streamingActivo: true/false }
   |
   v
Backend Node.js
   |
   v
Actualizar streamingActivo
   |
   v
ESP32-CAM: stream ON/OFF según variable
```

---

## 6. Backend Node.js

### Endpoints

* Sensores:

```text
POST /api/sensors
GET  /api/sensors/latest
```

* Cámara:

```text
POST /api/camera/register
GET  /api/camera/stream
GET  /api/camera/control
POST /api/camera/control
```

* Estado general:

```text
GET /api/status
```

### Diagrama de Flujo Backend

```
[ESP32] POST /api/sensors ---> Backend ---> Almacena datos
[ESP32-CAM] POST /api/camera/register ---> Backend ---> Registra IP/endpoint
Frontend GET /api/camera/stream ---> Backend ---> Proxy MJPEG desde ESP32-CAM
Frontend POST /api/camera/control ---> Backend ---> Cambia streamingActivo
```

---

## 7. Página Web / Frontend

* Consume datos de `/api/sensors/latest`.
* Streaming con `<img src="https://TU_BACKEND_PUBLICO/api/camera/stream">`.
* Botón digital activa/desactiva streaming:

```js
fetch("/api/camera/control", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ streamingActivo: true }) // o false
});
```

* Dashboard en tiempo real: gráficas, alertas y control remoto.

---

## 8. Escalabilidad y Mejoras Futuras

1. **Seguridad**: API Keys, JWT, HTTPS obligatorio.
2. **MQTT**: baja latencia y confiabilidad.
3. **Persistencia**: MongoDB o PostgreSQL para histórico de datos.
4. **Monitoreo**: dashboard completo con alertas.
5. **Control remoto**: streaming y sensores activables digitalmente.
6. **QoS y Reconexión**: garantizar continuidad de datos y streaming.

---

## 9. Recomendaciones

* Mantener GND común.
* Fuente estable de 5V para ESP32-CAM.
* Actualizar credenciales WiFi o usar WiFi Manager.
* Backend público con Cloudflare Tunnel o Render.
* Streaming controlado digitalmente.

---
