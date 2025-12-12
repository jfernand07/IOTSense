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
exports.RecommendationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recommendation_entity_1 = require("./entities/recommendation.entity");
const plant_entity_1 = require("../plants/entities/plant.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
let RecommendationsService = class RecommendationsService {
    repo;
    plantRepo;
    alertRepo;
    constructor(repo, plantRepo, alertRepo) {
        this.repo = repo;
        this.plantRepo = plantRepo;
        this.alertRepo = alertRepo;
    }
    async create(dto) {
        const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
        if (!plant)
            throw new common_1.NotFoundException('Plant no existe.');
        let alert = null;
        if (dto.alertId) {
            alert = await this.alertRepo.findOne({ where: { id: dto.alertId } });
            if (!alert)
                throw new common_1.NotFoundException('Alert no existe.');
        }
        const reco = this.repo.create({
            plant,
            alert,
            type: dto.type,
            message: dto.message,
            status: dto.status ?? recommendation_entity_1.RecommendationStatus.PENDING,
            executedAt: null,
            executedBy: null,
        });
        return this.repo.save(reco);
    }
    async findAll() {
        return this.repo
            .createQueryBuilder('r')
            .innerJoin('r.plant', 'p')
            .leftJoin('r.alert', 'a')
            .select([
            'r.type AS "type"',
            'r.message AS "message"',
            'r.status AS "status"',
            'p.name AS "plantName"',
            'p.location AS "plantLocation"',
            'a.type AS "alertType"',
            'a.severity AS "alertSeverity"',
        ])
            .orderBy('r.id', 'DESC')
            .getRawMany();
    }
};
exports.RecommendationsService = RecommendationsService;
exports.RecommendationsService = RecommendationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recommendation_entity_1.Recommendation)),
    __param(1, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __param(2, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RecommendationsService);
//# sourceMappingURL=recommendations.service.js.map