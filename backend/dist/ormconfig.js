"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/module/users/entities/user.entity");
const sensor_entity_1 = require("./src/module/sensors/entities/sensor.entity");
const sensor_current_state_entity_1 = require("./src/module/sensors/entities/sensor-current-state.entity");
const sensor_threshold_entity_1 = require("./src/module/sensors/entities/sensor-threshold.entity");
const plant_entity_1 = require("./src/module/plants/entities/plant.entity");
const device_entity_1 = require("./src/module/devices/entities/device.entity");
const refresh_token_entity_1 = require("./src/module/auth/entities/refresh-token.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, sensor_entity_1.Sensor, sensor_current_state_entity_1.SensorCurrentState, sensor_threshold_entity_1.SensorThreshold, plant_entity_1.Plant, device_entity_1.Device, refresh_token_entity_1.RefreshToken],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=ormconfig.js.map