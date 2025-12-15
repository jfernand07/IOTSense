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
let SensorsService = class SensorsService {
    sensorRepo;
    deviceRepo;
    constructor(sensorRepo, deviceRepo) {
        this.sensorRepo = sensorRepo;
        this.deviceRepo = deviceRepo;
    }
    async create(dto) {
        const device = await this.deviceRepo.findOne({
            where: { id: dto.deviceId },
        });
        if (!device)
            throw new common_1.NotFoundException('Dispositivo no encontrado');
        const sensor = this.sensorRepo.create({
            type: dto.type,
            unit: dto.unit,
            isActive: dto.isActive ?? true,
            device,
        });
        return this.sensorRepo.save(sensor);
    }
    async findAll() {
        return this.sensorRepo.find({ relations: ['device'] });
    }
    async findOne(id) {
        return this.sensorRepo.findOne({
            where: { id },
            relations: ['device'],
        });
    }
    async update(id, dto) {
        const sensor = await this.sensorRepo.findOneBy({ id });
        if (!sensor)
            throw new common_1.NotFoundException('Sensor no encontrado');
        if (dto.deviceId) {
            const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
            if (!device)
                throw new common_1.NotFoundException('Dispositivo no encontrado');
            sensor.device = device;
        }
        if (dto.type !== undefined)
            sensor.type = dto.type;
        if (dto.unit !== undefined)
            sensor.unit = dto.unit;
        if (dto.isActive !== undefined)
            sensor.isActive = dto.isActive;
        return this.sensorRepo.save(sensor);
    }
    async remove(id) {
        const result = await this.sensorRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Sensor no encontrado');
        return { message: 'Sensor eliminado correctamente' };
    }
};
exports.SensorsService = SensorsService;
exports.SensorsService = SensorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_entity_1.Sensor)),
    __param(1, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SensorsService);
//# sourceMappingURL=sensors.service.js.map