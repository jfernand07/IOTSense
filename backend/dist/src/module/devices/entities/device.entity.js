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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../../plants/entities/plant.entity");
const sensor_entity_1 = require("../../sensors/entities/sensor.entity");
let Device = class Device {
    id;
    name;
    location;
    hasCamera;
    isActive;
    createdAt;
    plant;
    sensors;
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Device.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Device.prototype, "hasCamera", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Device.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Device.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, (plant) => plant.devices, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_id' }),
    __metadata("design:type", plant_entity_1.Plant)
], Device.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sensor_entity_1.Sensor, (sensor) => sensor.device),
    __metadata("design:type", Array)
], Device.prototype, "sensors", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)('devices')
], Device);
//# sourceMappingURL=device.entity.js.map