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
const plant_type_entity_1 = require("../plant-types/entities/plant-type.entity");
let PlantsService = class PlantsService {
    plantRepo;
    userRepo;
    plantTypeRepo;
    constructor(plantRepo, userRepo, plantTypeRepo) {
        this.plantRepo = plantRepo;
        this.userRepo = userRepo;
        this.plantTypeRepo = plantTypeRepo;
    }
    async create(dto) {
        const owner = await this.userRepo.findOne({ where: { id: dto.ownerUserId } });
        if (!owner)
            throw new common_1.NotFoundException('Owner user no existe.');
        const plantType = await this.plantTypeRepo.findOne({ where: { id: dto.plantTypeId } });
        if (!plantType)
            throw new common_1.NotFoundException('Plant type no existe.');
        const plant = this.plantRepo.create({
            name: dto.name,
            location: dto.location ?? null,
            datePlanted: dto.datePlanted ?? null,
            isActive: dto.isActive ?? true,
            notes: dto.notes ?? null,
            imageUrl: dto.imageUrl ?? null,
            owner,
            plantType,
        });
        return this.plantRepo.save(plant);
    }
    async findAll() {
        const rows = await this.plantRepo
            .createQueryBuilder('p')
            .innerJoin('p.owner', 'u')
            .innerJoin('p.plantType', 'pt')
            .select([
            'p.name AS "name"',
            'p.location AS "location"',
            'p.datePlanted AS "datePlanted"',
            'u.name AS "ownerName"',
            'pt.name AS "plantTypeName"',
        ])
            .orderBy('p.id', 'DESC')
            .getRawMany();
        return rows;
    }
};
exports.PlantsService = PlantsService;
exports.PlantsService = PlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(plant_type_entity_1.PlantType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PlantsService);
//# sourceMappingURL=plants.service.js.map