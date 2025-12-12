import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/module/users/entities/user.entity';
import { Sensor } from './src/module/sensors/entities/sensor.entity';
import { SensorType } from './src/module/sensor-types/entities/sensor-type.entity';
import { Recommendation } from './src/module/recommendations/entities/recommendation.entity';
import { Reading } from './src/module/readings/entities/reading.entity';
import { Plant } from './src/module/plants/entities/plant.entity';
import { PlantType } from './src/module/plant-types/entities/plant-type.entity';
import { Device } from './src/module/devices/entities/device.entity';
import { Alert } from './src/module/alerts/entities/alert.entity';

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Sensor, SensorType, Recommendation, Reading, Plant, PlantType, Device, Alert],
    migrations: [ 'src/migrations/*.ts' ],
});