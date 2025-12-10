"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reading_entity_1 = require("./entities/reading.entity");
const readings_service_1 = require("./readings.service");
const readings_controller_1 = require("./readings.controller");
const sensor_entity_1 = require("../sensors/entities/sensor.entity");
let ReadingsModule = class ReadingsModule {
};
exports.ReadingsModule = ReadingsModule;
exports.ReadingsModule = ReadingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reading_entity_1.Reading, sensor_entity_1.Sensor])],
        providers: [readings_service_1.ReadingsService],
        controllers: [readings_controller_1.ReadingsController],
    })
], ReadingsModule);
//# sourceMappingURL=readings.module.js.map