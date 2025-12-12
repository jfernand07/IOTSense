"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (config) => ({
    type: 'postgres',
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: config.get('DB_SYNC') === 'true',
    logging: true,
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=dataBase.js.map