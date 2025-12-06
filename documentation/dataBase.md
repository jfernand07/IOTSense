# Entidades y sus atributos

-----

users: id, name, email, password_hash, role(admin o user), is_active, created_at y updated_at

Entidad creada con todas sus validaciones, dtos(create, update, response) y endpoints generales para agregar un usuario y ver todos los usuarios

POST -> http://localhost:3002/users
```
{
  "name": "jakson",
  "email": "jakson@example.com",
  "password": "123456",
  "role": "admin"
}

{
  "name": "andres",
  "email": "andres@example.com",
  "password": "123456"
}
```
GET -> http://localhost:3002/users

-----

plan-types: id, name, description, optimalTempMin, optimalTempMax, optimalAirHumidityMin, optimalAirHumidityMax, optimalSoilMoistureMin, optimalSoilMoistureMax, optimalLightMin, optimalLightMax, optimalCo2Min, optimalCo2Max

POST -> http://localhost:3002/plant-types
```
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
GET -> http://localhost:3002/plant-types

-----

devices: id, name, externalId, description, status, location

POST -> http://localhost:3002/devices
```
{
  "name": "Device 1",
  "externalId": "ESP32-ABC-001",
  "description": "abcdefghi",
  "status": "ONLINE",
  "location":"Invernadero"
}

{
  "name": "Device 2",
  "externalId": "ESP32-ABC-002"
}
```
GET -> http://localhost:3002/devices

-----

