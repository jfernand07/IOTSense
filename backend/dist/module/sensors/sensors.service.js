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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_entity_1 = require("./entities/sensor.entity");
const device_entity_1 = require("../devices/entities/device.entity");
const sensor_type_entity_1 = require("../sensor-types/entities/sensor-type.entity");
const plant_entity_1 = require("../plants/entities/plant.entity");
let SensorsService = class SensorsService {
    sensorRepo;
    deviceRepo;
    sensorTypeRepo;
    plantRepo;
    constructor(sensorRepo, deviceRepo, sensorTypeRepo, plantRepo) {
        this.sensorRepo = sensorRepo;
        this.deviceRepo = deviceRepo;
        this.sensorTypeRepo = sensorTypeRepo;
        this.plantRepo = plantRepo;
    }
    findByExternalId(externalId) {
        return this.sensorRepo.findOne({ where: { externalId } });
    }
    async create(dto) {
        const existing = await this.findByExternalId(dto.externalId);
        if (existing)
            throw new common_1.BadRequestException('Ya existe un sensor con ese externalId.');
        const device = await this.deviceRepo.findOne({ where: { id: dto.deviceId } });
        if (!device)
            throw new common_1.NotFoundException('Device no existe.');
        const sensorType = await this.sensorTypeRepo.findOne({ where: { id: dto.sensorTypeId } });
        if (!sensorType)
            throw new common_1.NotFoundException('SensorType no existe.');
        let plant = null;
        if (dto.plantId) {
            plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
            if (!plant)
                throw new common_1.NotFoundException('Plant no existe.');
        }
        const sensor = this.sensorRepo.create({
            name: dto.name,
            externalId: dto.externalId,
            pin: dto.pin ?? null,
            calibrationOffset: String(dto.calibrationOffset ?? 0),
            isActive: dto.isActive ?? true,
            device,
            sensorType,
            plant,
        });
        return this.sensorRepo.save(sensor);
    }
    async findAll() {
        return this.sensorRepo
            .createQueryBuilder('s')
            .innerJoin('s.device', 'd')
            .innerJoin('s.sensorType', 'st')
            .leftJoin('s.plant', 'p')
            .select([
            'd.name AS "deviceName"',
            'd.externalId AS "deviceExternalId"',
            'd.description AS "deviceDescription"',
            'd.status AS "deviceStatus"',
            'd.location AS "deviceLocation"',
            'st.displayName AS "sensorTypeDisplayName"',
            'st.description AS "sensorTypeDescription"',
            'p.name AS "plantName"',
            'p.location AS "plantLocation"',
            's.name AS "sensorName"',
            's.externalId AS "sensorExternalId"',
        ])
            .orderBy('s.id', 'DESC')
            .getRawMany();
    }
};
exports.SensorsService = SensorsService;
exports.SensorsService = SensorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_entity_1.Sensor)),
    __param(1, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(2, (0, typeorm_1.InjectRepository)(sensor_type_entity_1.SensorType)),
    __param(3, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SensorsService);
//# sourceMappingURL=sensors.service.js.map