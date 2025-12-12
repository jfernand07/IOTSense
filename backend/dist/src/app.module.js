"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./module/users/users.module");
const config_1 = require("@nestjs/config");
const plant_types_module_1 = require("./module/plant-types/plant-types.module");
const devices_module_1 = require("./module/devices/devices.module");
const sensor_types_module_1 = require("./module/sensor-types/sensor-types.module");
const plants_module_1 = require("./module/plants/plants.module");
const sensors_module_1 = require("./module/sensors/sensors.module");
const alerts_module_1 = require("./module/alerts/alerts.module");
const recommendations_module_1 = require("./module/recommendations/recommendations.module");
const readings_module_1 = require("./module/readings/readings.module");
const ai_module_1 = require("./ai/ai.module");
const dataBase_1 = require("./config/dataBase");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: dataBase_1.databaseConfig,
            }),
            users_module_1.UsersModule,
            plant_types_module_1.PlantTypesModule,
            devices_module_1.DevicesModule,
            sensor_types_module_1.SensorTypesModule,
            plants_module_1.PlantsModule,
            sensors_module_1.SensorsModule,
            alerts_module_1.AlertsModule,
            recommendations_module_1.RecommendationsModule,
            readings_module_1.ReadingsModule,
            ai_module_1.AiModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map