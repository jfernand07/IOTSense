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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alert_entity_1 = require("./entities/alert.entity");
const plant_entity_1 = require("../plants/entities/plant.entity");
const sensor_entity_1 = require("../sensors/entities/sensor.entity");
let AlertsService = class AlertsService {
    alertRepo;
    plantRepo;
    sensorRepo;
    constructor(alertRepo, plantRepo, sensorRepo) {
        this.alertRepo = alertRepo;
        this.plantRepo = plantRepo;
        this.sensorRepo = sensorRepo;
    }
    async create(dto) {
        const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
        if (!plant)
            throw new common_1.NotFoundException('Plant no existe.');
        let sensor = null;
        if (dto.sensorId) {
            sensor = await this.sensorRepo.findOne({ where: { id: dto.sensorId } });
            if (!sensor)
                throw new common_1.NotFoundException('Sensor no existe.');
        }
        const alert = this.alertRepo.create({
            plant,
            sensor,
            type: dto.type,
            severity: dto.severity,
            message: dto.message,
            status: alert_entity_1.AlertStatus.OPEN,
            resolvedAt: null,
            resolvedBy: null,
        });
        return this.alertRepo.save(alert);
    }
    async findAll() {
        return this.alertRepo
            .createQueryBuilder('a')
            .innerJoin('a.plant', 'p')
            .leftJoin('a.sensor', 's')
            .select([
            'a.type AS "type"',
            'a.severity AS "severity"',
            'a.message AS "message"',
            'a.status AS "status"',
            'p.name AS "plantName"',
            'p.location AS "plantLocation"',
            's.name AS "sensorName"',
            's.externalId AS "sensorExternalId"',
        ])
            .orderBy('a.id', 'DESC')
            .getRawMany();
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __param(1, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __param(2, (0, typeorm_1.InjectRepository)(sensor_entity_1.Sensor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map