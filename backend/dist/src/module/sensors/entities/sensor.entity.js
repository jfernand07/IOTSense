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
const sensor_current_state_entity_1 = require("./sensor-current-state.entity");
let Sensor = class Sensor {
    id;
    type;
    unit;
    isActive;
    createdAt;
    device;
    currentState;
};
exports.Sensor = Sensor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sensor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sensor.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sensor.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Sensor.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Sensor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device, (device) => device.sensors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], Sensor.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sensor_current_state_entity_1.SensorCurrentState, (state) => state.sensor, { cascade: true }),
    __metadata("design:type", sensor_current_state_entity_1.SensorCurrentState)
], Sensor.prototype, "currentState", void 0);
exports.Sensor = Sensor = __decorate([
    (0, typeorm_1.Entity)('sensors')
], Sensor);
//# sourceMappingURL=sensor.entity.js.map