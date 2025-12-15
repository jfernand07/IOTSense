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
exports.PlantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_entity_1 = require("./entities/plant.entity");
const user_entity_1 = require("../users/entities/user.entity");
let PlantsService = class PlantsService {
    plantRepo;
    userRepo;
    constructor(plantRepo, userRepo) {
        this.plantRepo = plantRepo;
        this.userRepo = userRepo;
    }
    async create(dto) {
        const owner = await this.userRepo.findOne({
            where: { id: dto.ownerUserId },
        });
        if (!owner) {
            throw new common_1.NotFoundException('El usuario propietario no existe.');
        }
        const plant = this.plantRepo.create({
            name: dto.name,
            species: dto.species,
            description: dto.description,
            owner,
        });
        return this.plantRepo.save(plant);
    }
    async findAll() {
        return this.plantRepo.find({
            relations: ['owner'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const plant = await this.plantRepo.findOne({
            where: { id },
            relations: ['owner', 'devices'],
        });
        if (!plant) {
            throw new common_1.NotFoundException('Planta no encontrada');
        }
        return plant;
    }
    async update(id, dto) {
        const plant = await this.plantRepo.findOne({ where: { id } });
        if (!plant) {
            throw new common_1.NotFoundException('Planta no encontrada');
        }
        if (dto.name !== undefined)
            plant.name = dto.name;
        if (dto.species !== undefined)
            plant.species = dto.species;
        if (dto.description !== undefined)
            plant.description = dto.description;
        if (dto.ownerUserId !== undefined) {
            const owner = await this.userRepo.findOne({
                where: { id: dto.ownerUserId },
            });
            if (!owner)
                throw new common_1.NotFoundException('Nuevo usuario propietario no existe');
            plant.owner = owner;
        }
        return this.plantRepo.save(plant);
    }
    async remove(id) {
        const result = await this.plantRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Planta no encontrada');
        }
        return { message: 'Planta eliminada correctamente' };
    }
};
exports.PlantsService = PlantsService;
exports.PlantsService = PlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PlantsService);
//# sourceMappingURL=plants.service.js.map