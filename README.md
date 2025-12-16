# IOTSense
Proyecto Final

## 🌱 Proyecto IoT de Monitoreo de Plantas

### Contexto
Construimos una solución IoT de extremo a extremo para el monitoreo de plantas.  
El sistema captura métricas ambientales mediante sensores físicos y las centraliza en la nube, donde un motor de análisis interpreta la salud del cultivo y almacena su historial.

Esta inteligencia alimenta una aplicación web moderna (**NextJS**) que sirve como centro de comando.  
Desde allí, técnicos y clientes pueden:
- Visualizar el estado actual mediante maquetas 3D
- Consultar el historial de datos
- Recibir recomendaciones automáticas

Todo esto asegura que cada planta reciba exactamente lo que necesita en el momento justo.

---

### 🎯 Objetivo general
Desarrollar un prototipo funcional de una plataforma IoT de monitoreo y diagnóstico inteligente, mediante la integración de sensores ambientales y una visualización 3D inmersiva.  
El fin es proporcionar a los usuarios un panorama claro y estadístico para el cuidado personalizado de sus cultivos en ambientes controlados, promoviendo la optimización de recursos y la mejora de la productividad.

---

## 🔄 Flujo de datos complejos
```
[Sensores Físicos] 
      ↓ 
[Microcontrolador (Arduino/ESP32)]
      ↓ 
[Arduino IoT Cloud]
      ↓ (API REST)
[Backend NestJS]
      ↓
[Lógica: alertas, reglas, análisis]
      ↓
[Base de Datos PostgreSQL]
      ↓
[Frontend NextJS + Panel 3D]
```

### Explicación del flujo
- Los sensores capturan datos del ambiente y del suelo.  
- El microcontrolador envía los datos a **Arduino IoT Cloud**.  
- El backend consume esos datos mediante la API oficial.  
- Los datos se procesan, se enriquecen y se guardan.  
- Los usuarios acceden a dashboards y a la vista 3D desde el frontend.  
- El sistema genera alertas y recomendaciones dependiendo de umbrales definidos.  

---

## ⚙️ 1. Captura y Transmisión de Datos (IoT)

**Sensores:**  
- Humedad del suelo y ambiental  
- Temperatura ambiente  
- Intensidad lumínica (Lux)  
- Nivel de CO₂  

**Arduino/Microcontrolador:**  
- Actúa como *Gateway*  
- Lectura analógica/digital de sensores  
- Normalización y empaquetamiento de datos en JSON  
- Envío a la nube  

**Arduino IoT Cloud:**  
- Broker MQTT centralizado  
- Persistencia temporal y punto de hook  
- Telemetría y acceso mediante API REST o WebHooks  

---

## 🧠 2. Procesamiento, Lógica y Persistencia (Backend NestJS)

**Backend NestJS:**  
- Adaptador primario para consumir datos de IoT Cloud  
- Motor de reglas/diagnóstico  
- Funciones principales:  
  1. Validar datos  
  2. Interpretar estado de la planta (salud, etapa de crecimiento)  
  3. Disparar alertas o recomendaciones  

**PostgreSQL:**  
- Adaptador secundario  
- Almacena:  
  - Datos crudos históricos  
  - Metadatos de planta/ambiente (tipo, ubicación, edad)  
  - Recomendaciones generadas (fecha, estado, acción sugerida)  

**Lógica (Servicios de Dominio):**  
- Reglas estáticas (ej. límites de temperatura)  
- Modelos predictivos (ej. ML para deficiencias nutricionales)  

---

## 🤖 Módulo de Inteligencia Artificial (Backend NestJS)

El módulo de IA integra capacidades de análisis inteligente mediante OpenAI GPT para proporcionar diagnóstico avanzado y recomendaciones automatizadas basadas en los datos de sensores.

### 📋 Historias de Usuario Implementadas

#### **HU-1: Detección de Anomalías**

**Objetivo:** Configurar el asistente IA en el backend para detectar anomalías en las mediciones de sensores, validar falsos positivos mediante reanálisis y registrar las anomalías detectadas.

**Endpoint:** `POST /ai/detectar-anomalias`

**Body (JSON):**
```json
{
  "temp_ambiente": 26.3,
  "hum_ambiente": 51,
  "hum_suelo": 0,
  "temp_suelo": 25.06,
  "timestamp": "2025-12-15T15:09:48.174Z",
  "lastValues": [
    {
      "temp_ambiente": 25.8,
      "hum_ambiente": 52,
      "hum_suelo": 15,
      "temp_suelo": 24.5,
      "timestamp": "2025-12-15T14:09:48.174Z"
    }
  ],
  "idealRanges": "Temp ambiente: 22-26°C, Hum ambiente: 50-60%, Hum suelo: 20-40%",
  "plantId": 1,
  "sensorId": 1
}
```

**Respuesta:**
```json
{
  "anomalia": true,
  "tipo": "anomalía_sensor",
  "descripcion": "La humedad del suelo está en 0%, lo que indica posible falla del sensor o suelo extremadamente seco.",
  "accion": "Verificar el sensor de humedad del suelo y considerar riego inmediato si la lectura es correcta.",
  "severidad": 4,
  "reanalizado": false,
  "falsoPositivo": false
}
```

**Características:**
-  Análisis inteligente con prompt especializado en salud de plantas
-  Validación de falsos positivos mediante comparación estadística con histórico
-  Reanálisis automático cuando se detecta posible falso positivo
-  Registro automático de anomalías como alertas en la base de datos (si se proporciona `plantId`)

---

#### **HU-2: Recomendaciones Automáticas**

**Objetivo:** Generar recomendaciones automáticas combinando reglas estáticas definidas por expertos agrónomos con análisis de IA, y registrar las recomendaciones para su seguimiento.

**Endpoint:** `POST /ai/recomendaciones`

**Body (JSON):** Misma estructura que `detectar-anomalias`

**Respuesta:**
```json
{
  "recomendaciones": [
    {
      "mensaje": "La humedad del suelo es crítica (0%). Iniciar riego por goteo durante 10-15 minutos de inmediato.",
      "prioridad": 5,
      "tipo": "riego"
    },
    {
      "mensaje": "La temperatura ambiente está dentro del rango óptimo. Mantener condiciones actuales.",
      "prioridad": 2,
      "tipo": "clima"
    },
    {
      "mensaje": "Considerar aplicar fertilizante rico en nitrógeno si la planta muestra signos de deficiencia nutricional.",
      "prioridad": 3,
      "tipo": "nutricion"
    }
  ]
}
```

**Tipos de recomendaciones:**
- `riego`: Relacionadas con humedad del suelo y riego
- `clima`: Temperatura y humedad ambiental
- `nutricion`: Fertilización y nutrientes
- `plaga`: Detección de plagas o enfermedades
- `otro`: Otras recomendaciones generales

**Características:**
-  Motor de reglas estáticas basado en umbrales (ej: `hum_suelo < 20` → alerta de riego)
-  Análisis de IA que evalúa y enriquece las recomendaciones de reglas
-  Priorización automática (1-5, donde 5 es más urgente)
-  Registro automático en base de datos si se proporciona `plantId`

**Reglas implementadas:**
- Humedad suelo < 20% → Recomendación urgente de riego (prioridad 5)
- Temperatura ambiente > 30°C → Recomendación de sombra/ventilación (prioridad 4)
- Humedad ambiente < 30% → Recomendación de aumentar humedad relativa (prioridad 3)

---

#### **HU-3: Análisis Visual de la Planta**

**Objetivo:** Proporcionar análisis de imágenes de plantas mediante visión artificial para detectar síntomas de plagas, enfermedades o deficiencias nutricionales.

**Endpoint:** `POST /ai/analisis-imagen`

**Content-Type:** `multipart/form-data`

**Body:**
- Campo `file`: Archivo de imagen (JPG, PNG, etc.)

**Respuesta:**
```json
{
  "estado": "moderado",
  "posibles_causas": [
    "Deficiencia de nitrógeno",
    "Riego irregular"
  ],
  "recomendaciones": [
    "Aplicar fertilizante rico en nitrógeno en las próximas 48 horas.",
    "Ajustar el calendario de riego para mantener humedad constante en el suelo."
  ],
  "filename": "planta_001.jpg",
  "mimetype": "image/jpeg",
  "size": 245678
}
```

**Estados posibles:**
- `sana`: Planta en buen estado
- `leve`: Síntomas menores detectados
- `moderado`: Problemas moderados que requieren atención
- `grave`: Problemas severos que requieren acción inmediata

**Características:**
-  Endpoint listo para integración con modelos de visión (YOLO, clasificación, GPT-4 Vision)
-  Análisis estructurado con posibles causas y recomendaciones accionables
-  Preparado para conectar con frontend mediante carga de archivos

**Nota:** Actualmente implementado con análisis basado en prompt. La integración con modelos de visión entrenados (YOLO, clasificación) puede realizarse reemplazando la lógica interna del servicio sin cambiar la interfaz del endpoint.

---

### 🔧 Configuración Técnica

**Variables de entorno requeridas:**
```env
OPENAI_API_KEY=sk-...
```

**Dependencias principales:**
- `openai`: Cliente oficial de OpenAI API
- `@nestjs/platform-express`: Para manejo de archivos multipart
- Integración con módulos `AlertsModule` y `RecommendationsModule`

**Estructura del módulo:**
```
src/ai/
├── ai.module.ts          # Módulo NestJS con imports de Alerts y Recommendations
├── ai.controller.ts      # Controlador con 3 endpoints principales
├── ai.service.ts         # Lógica de IA, reglas y procesamiento
└── dto/
    └── detect-anomalies.dto.ts  # DTO para datos de sensores
```

---

## 🖥️ 3. Presentación y Decisión (Frontend NextJS)

**Frontend NextJS:**  
- Adaptador de presentación  
- Comunicación con backend vía API REST y WebSockets  
- Renderizado eficiente y gestión de estado  

**Dashboards/Análisis:**  
- Gráficos históricos (tendencias)  
- KPIs  
- Panel de salud resumido por planta  

**3D Mockup:**  
- Experiencia inmersiva  
- Representación esquemática del ambiente controlado  
- Visualización intuitiva del estado general  

---

## 4. Pasos de Verificación Manual

### 1. Verificación del Endpoint de AI (Anomalías)
Para verificar que el sistema de detección de anomalías funciona correctamente, envía una petición POST usando Postman o cURL.

**Endpoint:** `POST http://localhost:3000/ai/detectar-anomalias`

**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "temp_ambiente": 28.5,
  "hum_ambiente": 45,
  "hum_suelo": 0,
  "temp_suelo": 25.06,
  "timestamp": "2025-12-15T15:09:48.174Z",
  "lastValues": [
    {
      "temp_ambiente": 26.3,
      "hum_ambiente": 51,
      "hum_suelo": 15,
      "temp_suelo": 24.5,
      "timestamp": "2025-12-15T14:09:48.174Z"
    }
  ],
  "idealRanges": "Temp ambiente: 22-26°C, Hum ambiente: 50-60%, Hum suelo: 20-40%",
  "plantId": 1,
  "sensorId": 1
}
```

**Respuesta esperada:**
Un objeto JSON generado por la IA con el análisis de los datos, indicando posibles anomalías:
```json
{
  "anomalia": true,
  "tipo": "anomalía_sensor",
  "descripcion": "La humedad del suelo está en 0%, lo que indica posible falla del sensor o suelo extremadamente seco.",
  "accion": "Verificar el sensor de humedad del suelo y considerar riego inmediato si la lectura es correcta.",
  "severidad": 4,
  "reanalizado": false,
  "falsoPositivo": false
}
```

**Nota:** Si se proporciona `plantId`, la anomalía se registrará automáticamente como una alerta en la base de datos.

### 2. Verificación del Endpoint de Recomendaciones
**Endpoint:** `POST http://localhost:3000/ai/recomendaciones`

**Headers:** `Content-Type: application/json`

**Body:** Misma estructura que el endpoint de anomalías

**Respuesta esperada:**
Lista de recomendaciones priorizadas con tipo y mensaje accionable.

### 3. Verificación del Endpoint de Análisis Visual
**Endpoint:** `POST http://localhost:3000/ai/analisis-imagen`

**Headers:** `Content-Type: multipart/form-data`

**Body:** Campo `file` con archivo de imagen

**Respuesta esperada:**
Análisis estructurado con estado de la planta, posibles causas y recomendaciones.

### 2. Verificación de Base de Datos
- Asegúrate de que el servicio de PostgreSQL esté corriendo.
- Al iniciar la app (`npm run start:dev`), busca en los logs: `[TypeOrmModule] Dependencies initialized`.

### 3. Sincronización IoT
- Revisa la consola para confirmar que el Job `SyncIoTReadings` se ejecute (según el cron programado) sin errores de autenticación.

---

## ❓ Pregunta problematizadora
¿Se tiene previsto un flujo de control (actuadores) que devuelva comandos a los dispositivos IoT (ej. encender riego), o solo es un sistema de monitoreo pasivo?

---

## 🏗️ Arquitectura General Tecnológica

### Frontend
- NextJS  
- Dashboards, gráficos, gestión de usuarios  
- Integración 3D (React-Three-Fiber)  
- WebSockets en tiempo real  

### Backend
- NestJS  
- Módulo para consumir Arduino IoT Cloud  
- Jobs para sincronizar lecturas  
- **Módulo de IA** (OpenAI GPT) para análisis inteligente:
  - Detección de anomalías con validación de falsos positivos
  - Motor de recomendaciones (reglas + IA)
  - Análisis visual de plantas
- Autenticación JWT  
- Roles / Permisos  
- API REST  
- WebSockets  

### Base de Datos (PostgreSQL)
**Entidades principales:**  
- users  
- roles  
- plants  
- sensors  
- readings  
- alerts  
- recommendations  

### IoT Hardware
- Arduino/ESP32  
- Sensores listados  
- Wifi  
- Lógica para enviar datos a Arduino IoT Cloud

```
iotsense-backend/
├─ node_modules/
├─ .env
├─ .env.example
├─ nest-cli.json
├─ package.json
├─ tsconfig.json
├─ README.md
│
└── src/
    ├── main.ts
    ├── app.module.ts
    │
    ├── config/
    │   ├── configuration.ts
    │   ├── validation.schema.ts
    │   ├── database.config.ts
    │   ├── arduino-cloud.config.ts
    │   └── jwt.config.ts
    │
    ├── common/
    │   ├── decorators/
    │   │   ├── current-user.decorator.ts
    │   │   └── roles.decorator.ts
    │   │
    │   ├── exceptions/
    │   │   └── domain-exception.ts
    │   │
    │   ├── filters/
    │   │   └── http-exception.filter.ts
    │   │
    │   ├── guards/
    │   │   ├── jwt-auth.guard.ts
    │   │   └── roles.guard.ts
    │   │
    │   ├── interceptors/
    │   │   └── logging.interceptor.ts
    │   │
    │   ├── pipes/
    │   │   └── validation.pipe.ts
    │   │
    │   └── dto/
    │       └── pagination.dto.ts
    │
    ├── modules/
    │   ├── database/
    │   │   ├── database.module.ts
    │   │   ├── database.service.ts
    │   │   ├── prisma/   (si usas Prisma)
    │   │   │   └── schema.prisma
    │   │   └── entities/ (si usas TypeORM)
    │   │
    │   ├── auth/
    │   │   ├── auth.module.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── dto/
    │   │   │   ├── login.dto.ts
    │   │   │   └── register.dto.ts
    │   │   └── strategies/
    │   │       ├── local.strategy.ts
    │   │       └── jwt.strategy.ts
    │   │
    │   ├── users/
    │   │   ├── users.module.ts
    │   │   ├── users.controller.ts
    │   │   ├── users.service.ts
    │   │   ├── entities/
    │   │   │   └── user.entity.ts
    │   │   └── dto/
    │   │       ├── create-user.dto.ts
    │   │       └── update-user.dto.ts
    │   │
    │   ├── roles/
    │   │   ├── roles.module.ts
    │   │   ├── roles.service.ts
    │   │   └── entities/
    │   │       └── role.entity.ts
    │   │
    │   ├── websocket/
    │   │   ├── websocket.module.ts
    │   │   ├── gateways/
    │   │   │   ├── iot.gateway.ts
    │   │   │   └── notifications.gateway.ts
    │   │   └── dto/
    │   │       └── message.dto.ts
    │   │
    │   ├── scheduler/
    │   │   ├── scheduler.module.ts
    │   │   └── jobs/
    │   │       ├── sync-iot-readings.job.ts
    │   │       ├── generate-daily-report.job.ts
    │   │       └── clean-old-data.job.ts
    │   │
    │   ├── iot-cloud/
    │   │   ├── iot-cloud.module.ts
    │   │   ├── iot-cloud.service.ts
    │   │   ├── dto/
    │   │   │   └── iot-reading.dto.ts
    │   │   └── clients/
    │   │       ├── arduino-api.client.ts
    │   │       └── mqtt.client.ts (opcional)
    │   │
    │   ├── plants/
    │   │   ├── plants.module.ts
    │   │   ├── plants.controller.ts
    │   │   ├── plants.service.ts
    │   │   ├── entities/
    │   │   │   └── plant.entity.ts
    │   │   └── dto/
    │   │       ├── create-plant.dto.ts
    │   │       └── update-plant.dto.ts
    │   │
    │   ├── sensors/
    │   │   ├── sensors.module.ts
    │   │   ├── sensors.controller.ts
    │   │   ├── sensors.service.ts
    │   │   ├── entities/
    │   │   │   └── sensor.entity.ts
    │   │   └── dto/
    │   │       ├── create-sensor.dto.ts
    │   │       └── update-sensor.dto.ts
    │   │
    │   ├── readings/
    │   │   ├── readings.module.ts
    │   │   ├── readings.controller.ts
    │   │   ├── readings.service.ts
    │   │   ├── entities/
    │   │   │   └── reading.entity.ts
    │   │   └── dto/
    │   │       ├── create-reading.dto.ts
    │   │       └── query-readings.dto.ts
    │   │
    │   ├── rules-engine/
    │   │   ├── rules-engine.module.ts
    │   │   ├── rules-engine.service.ts
    │   │   ├── rules/
    │   │   │   ├── humidity.rules.ts
    │   │   │   ├── temperature.rules.ts
    │   │   │   ├── light.rules.ts
    │   │   │   └── co2.rules.ts
    │   │   └── models/
    │   │       └── plant-status.model.ts
    │   │
    │   ├── alerts/
    │   │   ├── alerts.module.ts
    │   │   ├── alerts.controller.ts
    │   │   ├── alerts.service.ts
    │   │   ├── entities/
    │   │   │   └── alert.entity.ts
    │   │   └── dto/
    │   │       └── create-alert.dto.ts
    │   │
    │   └── recommendations/
    │       ├── recommendations.module.ts
    │       ├── recommendations.controller.ts
    │       ├── recommendations.service.ts
    │       ├── entities/
    │       │   └── recommendation.entity.ts
    │       └── dto/
    │           └── create-recommendation.dto.ts
    │
    ├── ai/
    │   ├── ai.module.ts
    │   ├── ai.controller.ts
    │   ├── ai.service.ts
    │   └── dto/
    │       └── detect-anomalies.dto.ts
```
