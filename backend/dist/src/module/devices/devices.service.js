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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("./entities/device.entity");
const plant_entity_1 = require("../plants/entities/plant.entity");
let DevicesService = class DevicesService {
    deviceRepo;
    plantRepo;
    constructor(deviceRepo, plantRepo) {
        this.deviceRepo = deviceRepo;
        this.plantRepo = plantRepo;
    }
    async create(dto) {
        const plant = await this.plantRepo.findOne({
            where: { id: dto.plantId },
        });
        if (!plant) {
            throw new common_1.NotFoundException('La planta asociada no existe.');
        }
        const device = this.deviceRepo.create({
            name: dto.name,
            location: dto.location,
            hasCamera: dto.hasCamera ?? false,
            isActive: dto.isActive ?? true,
            plant,
        });
        return this.deviceRepo.save(device);
    }
    findAll() {
        return this.deviceRepo.find({
            relations: ['plant'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const device = await this.deviceRepo.findOne({
            where: { id },
            relations: ['plant', 'sensors'],
        });
        if (!device) {
            throw new common_1.NotFoundException('Dispositivo no encontrado.');
        }
        return device;
    }
    async update(id, dto) {
        const device = await this.deviceRepo.findOne({
            where: { id },
            relations: ['plant'],
        });
        if (!device) {
            throw new common_1.NotFoundException('Dispositivo no encontrado.');
        }
        if (dto.name !== undefined)
            device.name = dto.name;
        if (dto.location !== undefined)
            device.location = dto.location;
        if (dto.hasCamera !== undefined)
            device.hasCamera = dto.hasCamera;
        if (dto.isActive !== undefined)
            device.isActive = dto.isActive;
        if (dto.plantId !== undefined) {
            const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
            if (!plant) {
                throw new common_1.NotFoundException('La nueva planta asociada no existe.');
            }
            device.plant = plant;
        }
        return this.deviceRepo.save(device);
    }
    async remove(id) {
        const result = await this.deviceRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Dispositivo no encontrado.');
        }
        return { message: 'Dispositivo eliminado correctamente.' };
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DevicesService);
//# sourceMappingURL=devices.service.js.map