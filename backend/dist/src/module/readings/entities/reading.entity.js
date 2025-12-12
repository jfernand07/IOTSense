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
exports.Reading = exports.ReadingQualityFlag = void 0;
const typeorm_1 = require("typeorm");
const sensor_entity_1 = require("../../sensors/entities/sensor.entity");
var ReadingQualityFlag;
(function (ReadingQualityFlag) {
    ReadingQualityFlag["OK"] = "OK";
    ReadingQualityFlag["SUSPECT"] = "SUSPECT";
    ReadingQualityFlag["ERROR"] = "ERROR";
})(ReadingQualityFlag || (exports.ReadingQualityFlag = ReadingQualityFlag = {}));
let Reading = class Reading {
    id;
    sensor;
    value;
    timestamp;
    qualityFlag;
    rawPayload;
    createdAt;
};
exports.Reading = Reading;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id' }),
    __metadata("design:type", String)
], Reading.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sensor_entity_1.Sensor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sensor_id' }),
    __metadata("design:type", sensor_entity_1.Sensor)
], Reading.prototype, "sensor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', type: 'numeric', precision: 10, scale: 3 }),
    __metadata("design:type", String)
], Reading.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timestamp', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reading.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'quality_flag',
        type: 'enum',
        enum: ReadingQualityFlag,
        default: ReadingQualityFlag.OK,
    }),
    __metadata("design:type", String)
], Reading.prototype, "qualityFlag", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_payload', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reading.prototype, "rawPayload", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reading.prototype, "createdAt", void 0);
exports.Reading = Reading = __decorate([
    (0, typeorm_1.Entity)({ name: 'reading' }),
    (0, typeorm_1.Index)(['timestamp'])
], Reading);
//# sourceMappingURL=reading.entity.js.map