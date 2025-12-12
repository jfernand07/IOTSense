"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensor_type_entity_1 = require("./entities/sensor-type.entity");
const sensor_types_service_1 = require("./sensor-types.service");
const sensor_types_controller_1 = require("./sensor-types.controller");
let SensorTypesModule = class SensorTypesModule {
};
exports.SensorTypesModule = SensorTypesModule;
exports.SensorTypesModule = SensorTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sensor_type_entity_1.SensorType])],
        providers: [sensor_types_service_1.SensorTypesService],
        controllers: [sensor_types_controller_1.SensorTypesController],
    })
], SensorTypesModule);
//# sourceMappingURL=sensor-types.module.js.map