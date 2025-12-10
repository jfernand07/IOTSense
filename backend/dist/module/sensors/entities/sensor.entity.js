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
exports.Sensor = void 0;
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../../devices/entities/device.entity");
const sensor_type_entity_1 = require("../../sensor-types/entities/sensor-type.entity");
const plant_entity_1 = require("../../plants/entities/plant.entity");
let Sensor = class Sensor {
    id;
    device;
    sensorType;
    plant;
    name;
    externalId;
    pin;
    calibrationOffset;
    isActive;
    createdAt;
    updatedAt;
};
exports.Sensor = Sensor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Sensor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], Sensor.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sensor_type_entity_1.SensorType, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sensor_type_id' }),
    __metadata("design:type", sensor_type_entity_1.SensorType)
], Sensor.prototype, "sensorType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_id' }),
    __metadata("design:type", Object)
], Sensor.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Sensor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'external_id', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Sensor.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pin', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], Sensor.prototype, "pin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calibration_offset', type: 'numeric', precision: 6, scale: 3, default: 0 }),
    __metadata("design:type", String)
], Sensor.prototype, "calibrationOffset", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Sensor.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Sensor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Sensor.prototype, "updatedAt", void 0);
exports.Sensor = Sensor = __decorate([
    (0, typeorm_1.Entity)({ name: 'sensor' })
], Sensor);
//# sourceMappingURL=sensor.entity.js.map