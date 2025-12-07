# 📚 API Docs (Postman) — IoTSense Backend (NestJS + TypeORM)

Base URL: `http://localhost:3002`  

## 🔗 Relaciones (visión general)
- **User (1) → (N) Plant**: un usuario puede tener muchas plantas.
- **PlantType (1) → (N) Plant**: un tipo de planta puede aplicarse a muchas plantas.
- **Device (1) → (N) Sensor**: un dispositivo puede tener varios sensores.
- **SensorType (1) → (N) Sensor**: un tipo de sensor puede estar en muchos sensores.
- **Plant (1) → (N) Alert**: una planta puede generar muchas alertas.
- **Sensor (1) → (N) Alert**: una alerta puede estar ligada a un sensor (opcional).
- **Plant (1) → (N) Recommendation**: recomendaciones para una planta.
- **Alert (1) → (N) Recommendation**: recomendación puede derivar de una alerta (opcional).
- **Sensor (1) → (N) Reading**: un sensor produce muchas lecturas.

---

## ✅ Convenciones importantes
- Todos los IDs son **int autoincrementales** (consistente en el proyecto).
- `externalId` en **device** y **sensor** es **UNIQUE**:
  - **Device.externalId**: identificador del hardware/plataforma (serial/thingName, etc.).  
  - **Sensor.externalId**: identificador de propiedad/variable en Arduino IoT Cloud (o equivalente).
- En `POST` normalmente **no se envía `id`**.
- Campos como `createdAt/updatedAt` existen en DB pero en listados se recomienda no retornarlos (DTOs resumidos).

---

## 1) users

### Atributos
- `id`
- `name`
- `email` (unique)
- `password_hash` (NO se envía en requests)
- `role`: `admin` | `user` (default: `user`)
- `is_active` (default: `true`)
- `created_at`, `updated_at`

## Endpoints
### Crear usuario
`POST /users`

Ejemplo (admin, user por default):
```json
{
  "name": "jakson",
  "email": "jakson@example.com",
  "password": "12345678",
  "role": "admin"
}

{
  "name": "andres",
  "email": "andres@example.com",
  "password": "123456"
}
```

`GET /users`

-----

## 2) plan-types

### Atributos
- `id`
- `name`
- `description`
- `optimalTempMin`
- `optimalTempMax`
- `optimalAirHumidityMin`
- `optimalAirHumidityMax`
- `optimalSoilMoistureMin`
- `optimalSoilMoistureMax`
- `optimalLightMin`
- `optimalLightMax`
- `optimalCo2Min`
- `optimalCo2Max`

## Endpoints
### Crear usuario
`POST / plant-types`

Ejemplo:
```json
{
  "name": "arboles",
  "description": "Plantas leñosas de gran tamaño con tronco definido y copa ramificada. Proveen sombra, madera, frutos y oxígeno",
  "optimalTempMin": 10,
  "optimalTempMax": 30,
  "optimalAirHumidityMin": 40,
  "optimalAirHumidityMax": 70,
  "optimalSoilMoistureMin": 20,
  "optimalSoilMoistureMax": 60,
  "optimalLightMin": 10000,
  "optimalLightMax": 50000,
  "optimalCo2Min": 400,
  "optimalCo2Max": 800
}

{
  "name": "suculenta"
}
```

`GET / plant-types`

-----

## 3) devices

### Atributos
- `id`
- `name`
- `externalId`
- `description`
- `status`
- `location`

## Endpoints
### Crear usuario
`POST / devices`

Ejemplo:
```json
{
  "name": "Device 1",
  "externalId": "ESP32-ABC-001",
  "description": "abcdefghi",
  "status": "ONLINE",
  "location":"Invernadero"
}

{
  "name": "Device 2",
  "e
```

`GET / devices`

-----

## 4) sensor-types

### Atributos
- `id`
- `code`
- `displayName`
- `description`
- `unit`

## Endpoints
### Crear usuario
`POST / sensor-types`

Ejemplo:
```json
{
  "id": 1,
  "code": "asa123",
  "displayName": "sensored",
  "unit": "°C",
  "description": "sensor que mide humedad"
}
```

`GET / sensor-types`

-----

## 5) plants

### Atributos
- `id`
- `name`
- `plantTypeId`
- `datePlanted`
- `ownerUserId`
- `isActive`
- `notes`
- `imageUrl`

## Endpoints
### Crear usuario
`POST / plants`

Ejemplo:
```json
{
  "plantTypeId": 1,
  "ownerUserId": 1,
  "name": "Tomate - Matera 1",
  "location": "Invernadero A",
  "datePlanted": "2025-12-01"
}
```

`GET / plants`

-----

## 6) sensors

### Atributos
- `id`
- `deviceId`
- `sensorTypeId`
- `plantId`
- `name`
- `externalId`
- `pin`
- `calibrationOffset`
- `isActive`

## Endpoints
### Crear usuario
`POST / sensors`

Ejemplo:
```json
{
  "deviceId": 1,
  "sensorTypeId": 1,
  "plantId": 1,
  "name": "Sensor Humedad 1",
  "externalId": "ARDUINO_PROP_123",
  "pin": "A0",
  "calibrationOffset": 0.15
}
```

`GET / sensors`

-----

## 7) alerts

### Atributos
- `id`
- `plantId`
- `sensorId`
- `type`
- `severity`
- `message`

## Endpoints
### Crear usuario
`POST / alerts`

Ejemplo:
```json
{
  "plantId": 1,
  "sensorId": 1,
  "type": "HIGH_TEMP",
  "severity": "WARNING",
  "message": "Planta demasiado humedad"
}
```

`GET / alerts`

-----

## 8) recommendations

### Atributos
- `id`
- `plantId`
- `alertId`
- `type`
- `status`
- `message`

## Endpoints
### Crear usuario
`POST / recommendations`

Ejemplo:
```json
{
  "plantId": 1,
  "sensorId": 1,
  "type": "HIGH_TEMP",
  "severity": "WARNING",
  "message": "Planta demasiado humedad"
}
```

`GET / recommendations`

-----

## 9) readings

### Atributos
- `id`
- `sensorId`
- `value`
- `timestamp`
- `qualityFlag`
- `rawPayload`

## Endpoints
### Crear usuario
`POST / readings`

Ejemplo:
```json
{
  "sensorId": 1,
  "value": 42.375,
  "timestamp": "2025-12-05T20:10:00.000Z",
  "qualityFlag": "OK",
  "rawPayload": {"adc": 512, "vcc": 3.29}
}
```

`GET / readings`

-----
