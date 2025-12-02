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


