"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/module/users/entities/user.entity");
const sensor_entity_1 = require("./src/module/sensors/entities/sensor.entity");
const sensor_type_entity_1 = require("./src/module/sensor-types/entities/sensor-type.entity");
const recommendation_entity_1 = require("./src/module/recommendations/entities/recommendation.entity");
const reading_entity_1 = require("./src/module/readings/entities/reading.entity");
const plant_entity_1 = require("./src/module/plants/entities/plant.entity");
const plant_type_entity_1 = require("./src/module/plant-types/entities/plant-type.entity");
const device_entity_1 = require("./src/module/devices/entities/device.entity");
const alert_entity_1 = require("./src/module/alerts/entities/alert.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, sensor_entity_1.Sensor, sensor_type_entity_1.SensorType, recommendation_entity_1.Recommendation, reading_entity_1.Reading, plant_entity_1.Plant, plant_type_entity_1.PlantType, device_entity_1.Device, alert_entity_1.Alert],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=ormconfig.js.map