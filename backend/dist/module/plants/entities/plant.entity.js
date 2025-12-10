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
exports.Plant = void 0;
const typeorm_1 = require("typeorm");
const plant_type_entity_1 = require("../../plant-types/entities/plant-type.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Plant = class Plant {
    id;
    plantType;
    owner;
    name;
    location;
    datePlanted;
    isActive;
    notes;
    imageUrl;
    createdAt;
    updatedAt;
};
exports.Plant = Plant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Plant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_type_entity_1.PlantType, (pt) => pt.plants, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_type_id' }),
    __metadata("design:type", plant_type_entity_1.PlantType)
], Plant.prototype, "plantType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.plants, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'owner_user_id' }),
    __metadata("design:type", user_entity_1.User)
], Plant.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Plant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_planted', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "datePlanted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Plant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Plant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Plant.prototype, "updatedAt", void 0);
exports.Plant = Plant = __decorate([
    (0, typeorm_1.Entity)({ name: 'plant' })
], Plant);
//# sourceMappingURL=plant.entity.js.map