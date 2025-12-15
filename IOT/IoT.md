
---

# Documentación del Proyecto IoT con ESP32 y ESP32-CAM

## 1. Descripción del Proyecto

Sistema IoT para monitoreo ambiental, control remoto y transmisión de video en tiempo real.

Componentes principales:

* **ESP32 principal**
  Lectura de sensores ambientales y de suelo. Comunicación periódica con el backend.

* **ESP32-CAM**
  Captura de video y streaming MJPEG, controlado digitalmente desde el backend (sin botones físicos).

* **Backend Node.js (Express)**
  Punto central del sistema. Recibe datos, registra la cámara, controla el streaming, gestiona actuadores (LED) y expone una API para la página web.

Objetivo:
Disponer de un sistema IoT completamente controlable desde una interfaz web, con arquitectura clara y escalable.

---

## 2. Arquitectura del Sistema

```
[ESP32 Sensores] ---> WiFi ---> [Backend Node.js] ---> [Web App]
[ESP32-CAM] -------> WiFi ---> [Backend Node.js] ---> [Web App]
```

El backend actúa como:

* Receptor de datos
* Proxy de streaming
* Controlador digital de dispositivos
* Fuente única de verdad del sistema

---

## 3. Flujo de Datos y Control Digital

```
ESP32-CAM                     Backend Node.js                     Frontend Web
+----------------+            +----------------------+            +-------------------+
| Captura video  | --HTTP-->  | Proxy MJPEG          | --> <img>  | Vista en navegador |
| Stream ON/OFF  | <-poll-    | streamingActivo     | <-fetch-- | Botón digital      |
+----------------+            +----------------------+            +-------------------+
```

Puntos clave:

* El backend mantiene la variable `streamingActivo`
* El frontend controla el estado mediante endpoints REST
* La ESP32-CAM no expone streaming público directamente
* El streaming pasa siempre por el backend

---

## 4. Hardware

### 4.1 ESP32 principal (Sensores)

Sensores utilizados:

* **DHT11**: temperatura y humedad ambiente
* **DS18B20**: temperatura del suelo
* **Sensor de humedad del suelo**: entrada analógica

Periféricos:

* Pantalla OLED I2C

  * SDA: GPIO 22
  * SCL: GPIO 21

Funciones:

* Lectura periódica de sensores
* Envío de datos al backend vía HTTP POST
* Reconexión automática a WiFi

---

### 4.2 ESP32-CAM

Modelo: AI Thinker

Pines principales:

* PWDN: 32
* RESET: -1
* XCLK: 0
* SIOD: 26
* SIOC: 27
* VSYNC: 25
* HREF: 23
* PCLK: 22
* D0-D7: 5, 18, 19, 21, 36, 39, 34, 35

Características:

* PSRAM habilitada
* Streaming MJPEG en `/stream`
* Control digital de streaming desde backend
* Resolución recomendada: QVGA o VGA

---

### 4.3 Actuadores

* **LED digital**

  * Controlado desde backend
  * Estado ON/OFF
  * La ESP32 consulta el estado vía HTTP

---

## 5. Código ESP32 (Sensores)

Funciones principales:

* Inicialización de sensores y OLED
* Lectura y validación de datos
* Visualización local
* Envío periódico al backend
* Reconexión automática si se pierde WiFi

Flujo:

```
Inicializar
   |
Leer sensores
   |
Mostrar en OLED
   |
Enviar POST al backend
   |
Esperar intervalo
   |
Reintentar si WiFi cae
```

---

## 6. Código ESP32-CAM (Streaming)

Funciones principales:

* Inicialización de cámara y WiFi
* Registro dinámico en el backend
* Servidor MJPEG en `/stream`
* Activación o bloqueo de streaming según backend

Control digital:

```
ESP32-CAM
   |
GET /api/camera/control
   |
¿streaming = true?
   |
Si -> enviar frames
No -> pausar streaming
```

No se usan botones físicos. Todo el control es remoto y digital.

---

## 7. Backend Node.js

### 7.1 Estado en Memoria

Variables principales:

* `lastSensorData`
* `cameraInfo`
* `streamingActivo`
* `ledState`

El backend es el único que decide:

* Si la cámara puede streamear
* Si el LED está encendido o apagado

---

### 7.2 Endpoints disponibles

#### Sensores

```
POST /api/sensors
GET  /api/sensors/latest
```

#### Cámara

```
POST /api/camera/register
GET  /api/camera/stream
GET  /api/camera/control
POST /api/camera/control
```

#### LED

```
POST /api/led
GET  /api/led
```

#### Estado general

```
GET /api/status
```

---

### 7.3 Flujo Backend

```
ESP32           -> POST /api/sensors          -> Backend guarda último dato
ESP32-CAM       -> POST /api/camera/register -> Backend registra IP
Frontend        -> POST /api/camera/control  -> Backend activa streaming
Frontend        -> GET  /api/camera/stream   -> Backend hace proxy MJPEG
ESP32           -> GET  /api/led              -> Backend responde estado LED
```

---

## 8. Frontend / Página Web

Funciones principales:

* Mostrar datos ambientales
* Visualizar streaming MJPEG
* Controlar streaming con botón digital
* Encender/apagar LED remotamente

Ejemplo streaming:

```html
<img src="http://IP_BACKEND:3000/api/camera/stream">
```

Ejemplo control de streaming:

```js
fetch("/api/camera/control", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ streaming: true })
});
```

Ejemplo control LED:

```js
fetch("/api/led", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ state: true })
});
```

---

## 9. Streaming: Estado Actual

* El streaming funciona **de forma local**
* Backend y ESP32-CAM deben estar en la misma red
* El backend actúa como intermediario
* Para exposición pública se requiere:

  * Tunnel (Cloudflare)
  * VPS
  * O red fija

El diseño ya está preparado para eso, aunque actualmente se usa local.

---

## 10. Escalabilidad y Mejoras Futuras

1. Persistencia de datos (MongoDB / PostgreSQL)
2. MQTT para sensores y actuadores
3. WebSockets para estado en tiempo real
4. Autenticación (JWT, API Keys)
5. HTTPS obligatorio
6. Gestión de múltiples cámaras
7. Control de más actuadores (relés, motores)

---

## 11. Recomendaciones Técnicas

* Fuente estable de 5V para ESP32-CAM
* GND común entre dispositivos
* Manejo de reconexión WiFi en ambos ESP32
* Backend como único punto de acceso
* No exponer directamente la IP de la ESP32-CAM

---
