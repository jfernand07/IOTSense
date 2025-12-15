import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/module/users/entities/user.entity';
import { Sensor } from './src/module/sensors/entities/sensor.entity';
import { SensorCurrentState } from './src/module/sensors/entities/sensor-current-state.entity';
import { SensorThreshold } from './src/module/sensors/entities/sensor-threshold.entity';
import { Plant } from './src/module/plants/entities/plant.entity';
import { Device } from './src/module/devices/entities/device.entity';
import { RefreshToken } from './src/module/auth/entities/refresh-token.entity';

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Sensor, SensorCurrentState, SensorThreshold, Plant, Device, RefreshToken],
    migrations: [ 'src/migrations/*.ts' ],
});
