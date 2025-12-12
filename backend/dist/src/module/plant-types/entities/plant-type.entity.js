"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantType = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../../plants/entities/plant.entity");
let PlantType = class PlantType {
    id;
    name;
    description;
    optimalTempMin;
    optimalTempMax;
    optimalAirHumidityMin;
    optimalAirHumidityMax;
    optimalSoilMoistureMin;
    optimalSoilMoistureMax;
    optimalLightMin;
    optimalLightMax;
    optimalCo2Min;
    optimalCo2Max;
    createdAt;
    updatedAt;
    plants;
};
exports.PlantType = PlantType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], PlantType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PlantType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_temp_min', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalTempMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_temp_max', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalTempMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_air_humidity_min', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalAirHumidityMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_air_humidity_max', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalAirHumidityMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_soil_moisture_min', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalSoilMoistureMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_soil_moisture_max', type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalSoilMoistureMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_light_min', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalLightMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_light_max', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalLightMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_co2_min', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalCo2Min", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'optimal_co2_max', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PlantType.prototype, "optimalCo2Max", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PlantType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PlantType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plant_entity_1.Plant, (plant) => plant.plantType),
    __metadata("design:type", Array)
], PlantType.prototype, "plants", void 0);
exports.PlantType = PlantType = __decorate([
    (0, typeorm_1.Entity)({ name: 'plant_type' })
], PlantType);
//# sourceMappingURL=plant-type.entity.js.map