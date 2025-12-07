-- 1) USERS
INSERT INTO users (name, email, password_hash, role, is_active)
VALUES
  ('Admin', 'admin@example.com', '$2b$10$gGJZ0mVvQv5u9oTQW0l4kOXxRj6JrVwYB4g0gOqSx8wZQp8qgWm7W', 'admin', true),
  ('Andres', 'andres@example.com', '$2b$10$gGJZ0mVvQv5u9oTQW0l4kOXxRj6JrVwYB4g0gOqSx8wZQp8qgWm7W', 'user', true);

-- 2) PLANT TYPE
INSERT INTO plant_type (
  name, description,
  optimal_temp_min, optimal_temp_max,
  optimal_air_humidity_min, optimal_air_humidity_max,
  optimal_soil_moisture_min, optimal_soil_moisture_max,
  optimal_light_min, optimal_light_max,
  optimal_co2_min, optimal_co2_max
)
VALUES
  (
    'Tomate',
    'Planta de clima templado; requiere humedad moderada y buena iluminación.',
    18.00, 30.00,
    40.00, 70.00,
    20.00, 60.00,
    10000.00, 50000.00,
    400.00, 900.00
  ),
  (
    'Suculenta',
    'Planta resistente; requiere poco riego y buena iluminación.',
    12.00, 28.00,
    20.00, 60.00,
    5.00, 25.00,
    8000.00, 60000.00,
    350.00, 800.00
  );

-- 3) DEVICE
INSERT INTO device (name, external_id, description, status, location, last_seen_at)
VALUES
  ('ESP32 Invernadero A', 'ESP32-ABC-001', 'Controlador principal del invernadero A', 'ONLINE', 'Invernadero A', now()),
  ('ESP32 Invernadero B', 'ESP32-ABC-002', 'Controlador secundario del invernadero B', 'OFFLINE', 'Invernadero B', NULL);

-- 4) SENSOR TYPE
INSERT INTO sensor_type (code, display_name, unit, description)
VALUES
  ('SOIL_MOISTURE', 'Humedad del suelo', '%', 'Sensor de humedad del sustrato'),
  ('AIR_TEMP', 'Temperatura del aire', '°C', 'Sensor de temperatura ambiental'),
  ('LIGHT', 'Luz', 'lux', 'Sensor de luminosidad'),
  ('CO2', 'CO2', 'ppm', 'Sensor de concentración de CO2');

-- 5) PLANT
-- Asumimos IDs creados:
-- users: Admin=1, Andres=2
-- plant_type: Tomate=1, Suculenta=2
INSERT INTO plant (plant_type_id, owner_user_id, name, location, date_planted, is_active, notes, image_url)
VALUES
  (1, 2, 'Tomate - Matera 1', 'Invernadero A', '2025-12-01', true, 'Revisar plagas cada 3 días', NULL),
  (2, 2, 'Suculenta - Mesa 1', 'Casa - Ventana', '2025-11-20', true, 'Riego muy ocasional', NULL);

-- 6) SENSOR
-- device: 1 y 2
-- sensor_type: SOIL_MOISTURE=1, AIR_TEMP=2, LIGHT=3, CO2=4
-- plant: Tomate=1, Suculenta=2
INSERT INTO sensor (
  device_id, sensor_type_id, plant_id,
  name, external_id, pin,
  calibration_offset, is_active
)
VALUES
  (1, 1, 1, 'Sensor Humedad Suelo Tomate', 'ARDUINO_PROP_SOIL_001', 'A0', 0.150, true),
  (1, 2, 1, 'Sensor Temp Aire Invernadero A', 'ARDUINO_PROP_AIR_001', 'D5', 0.000, true),
  (1, 3, 1, 'Sensor Luz Tomate', 'ARDUINO_PROP_LIGHT_001', 'A1', 0.000, true),
  (1, 4, 1, 'Sensor CO2 Tomate', 'ARDUINO_PROP_CO2_001', 'I2C', 0.000, true),
  (2, 1, 2, 'Sensor Humedad Suelo Suculenta', 'ARDUINO_PROP_SOIL_002', 'A0', 0.050, true);

-- 7) ALERT
-- alert.status default OPEN (si aplica), severity: INFO/WARNING/CRITICAL
-- type: libre (varchar)
-- plant_id: 1 (Tomate), sensor_id: 1 (humedad suelo tomate)
INSERT INTO alert (plant_id, sensor_id, resolved_by_user_id, type, severity, message, status, resolved_at)
VALUES
  (1, 1, NULL, 'LOW_SOIL_MOISTURE', 'WARNING', 'Humedad del suelo por debajo del mínimo', 'OPEN', NULL),
  (1, 2, NULL, 'HIGH_TEMP', 'CRITICAL', 'Temperatura del aire por encima del máximo recomendado', 'OPEN', NULL),
  (2, 5, NULL, 'LOW_SOIL_MOISTURE', 'INFO', 'Humedad del suelo ligeramente baja', 'OPEN', NULL);

-- 8) RECOMMENDATION
-- status default PENDING
-- alert_id opcional
INSERT INTO recommendation (plant_id, alert_id, executed_by_user_id, type, message, status, executed_at)
VALUES
  (1, 1, NULL, 'WATERING', 'Riega 300ml ahora y revisa humedad en 30 minutos', 'PENDING', NULL),
  (1, 2, NULL, 'VENTILATION', 'Activa ventilación o abre compuertas para reducir temperatura', 'PENDING', NULL),
  (2, NULL, NULL, 'WATERING', 'Riega 50ml y vuelve a medir en 2 horas', 'PENDING', NULL);

-- 9) READING
-- quality_flag default OK
-- timestamp es obligatorio
-- raw_payload jsonb opcional
-- sensor_id: usar ids existentes (1..5)
INSERT INTO reading (sensor_id, value, timestamp, quality_flag, raw_payload)
VALUES
  (1, 18.250, now() - interval '10 minutes', 'OK', '{"adc": 510, "vcc": 3.29}'),
  (1, 17.900, now() - interval '5 minutes', 'OK', '{"adc": 505, "vcc": 3.28}'),
  (2, 32.500, now() - interval '8 minutes', 'OK', '{"sensor": "dht22"}'),
  (3, 12000.000, now() - interval '7 minutes', 'OK', '{"lux_raw": 12000}'),
  (4, 950.000, now() - interval '6 minutes', 'SUSPECT', '{"ppm_raw": 950, "note": "calibration pending"}'),
  (5, 12.400, now() - interval '4 minutes', 'OK', '{"adc": 480, "vcc": 3.30}');
