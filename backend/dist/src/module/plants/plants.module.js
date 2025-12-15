"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plant_entity_1 = require("./entities/plant.entity");
const plants_controller_1 = require("./plants.controller");
const plants_service_1 = require("./plants.service");
const user_entity_1 = require("../users/entities/user.entity");
let PlantsModule = class PlantsModule {
};
exports.PlantsModule = PlantsModule;
exports.PlantsModule = PlantsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plant_entity_1.Plant, user_entity_1.User])],
        controllers: [plants_controller_1.PlantsController],
        providers: [plants_service_1.PlantsService],
    })
], PlantsModule);
//# sourceMappingURL=plants.module.js.map