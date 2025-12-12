"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recommendation_entity_1 = require("./entities/recommendation.entity");
const recommendations_service_1 = require("./recommendations.service");
const recommendations_controller_1 = require("./recommendations.controller");
const plant_entity_1 = require("../plants/entities/plant.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
const user_entity_1 = require("../users/entities/user.entity");
let RecommendationsModule = class RecommendationsModule {
};
exports.RecommendationsModule = RecommendationsModule;
exports.RecommendationsModule = RecommendationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([recommendation_entity_1.Recommendation, plant_entity_1.Plant, alert_entity_1.Alert, user_entity_1.User])],
        providers: [recommendations_service_1.RecommendationsService],
        controllers: [recommendations_controller_1.RecommendationsController],
    })
], RecommendationsModule);
//# sourceMappingURL=recommendations.module.js.map