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
exports.SensorCurrentState = void 0;
const typeorm_1 = require("typeorm");
const sensor_entity_1 = require("./sensor.entity");
let SensorCurrentState = class SensorCurrentState {
    sensor_id;
    last_value;
    last_read_at;
    status;
    sensor;
};
exports.SensorCurrentState = SensorCurrentState;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], SensorCurrentState.prototype, "sensor_id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SensorCurrentState.prototype, "last_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], SensorCurrentState.prototype, "last_read_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SensorCurrentState.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sensor_entity_1.Sensor, (sensor) => sensor.currentState, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sensor_id' }),
    __metadata("design:type", sensor_entity_1.Sensor)
], SensorCurrentState.prototype, "sensor", void 0);
exports.SensorCurrentState = SensorCurrentState = __decorate([
    (0, typeorm_1.Entity)('sensor_current_state')
], SensorCurrentState);
//# sourceMappingURL=sensor-current-state.entity.js.map