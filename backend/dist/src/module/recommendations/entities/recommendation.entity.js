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
exports.Recommendation = exports.RecommendationStatus = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../../plants/entities/plant.entity");
const alert_entity_1 = require("../../alerts/entities/alert.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var RecommendationStatus;
(function (RecommendationStatus) {
    RecommendationStatus["PENDING"] = "PENDING";
    RecommendationStatus["APPLIED"] = "APPLIED";
    RecommendationStatus["DISMISSED"] = "DISMISSED";
})(RecommendationStatus || (exports.RecommendationStatus = RecommendationStatus = {}));
let Recommendation = class Recommendation {
    id;
    plant;
    alert;
    executedBy;
    type;
    message;
    status;
    createdAt;
    executedAt;
};
exports.Recommendation = Recommendation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Recommendation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_id' }),
    __metadata("design:type", plant_entity_1.Plant)
], Recommendation.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => alert_entity_1.Alert, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'alert_id' }),
    __metadata("design:type", Object)
], Recommendation.prototype, "alert", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'executed_by_user_id' }),
    __metadata("design:type", Object)
], Recommendation.prototype, "executedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Recommendation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'message', type: 'text' }),
    __metadata("design:type", String)
], Recommendation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: RecommendationStatus,
        default: RecommendationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Recommendation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Recommendation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'executed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Recommendation.prototype, "executedAt", void 0);
exports.Recommendation = Recommendation = __decorate([
    (0, typeorm_1.Entity)({ name: 'recommendation' })
], Recommendation);
//# sourceMappingURL=recommendation.entity.js.map