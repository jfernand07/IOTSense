"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plant_types_service_1 = require("./plant-types.service");
const plant_types_controller_1 = require("./plant-types.controller");
const plant_type_entity_1 = require("./entities/plant-type.entity");
let PlantTypesModule = class PlantTypesModule {
};
exports.PlantTypesModule = PlantTypesModule;
exports.PlantTypesModule = PlantTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plant_type_entity_1.PlantType])],
        providers: [plant_types_service_1.PlantTypesService],
        controllers: [plant_types_controller_1.PlantTypesController],
    })
], PlantTypesModule);
//# sourceMappingURL=plant-types.module.js.map