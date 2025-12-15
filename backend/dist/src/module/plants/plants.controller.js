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
exports.PlantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plants_service_1 = require("./plants.service");
const create_plant_dto_1 = require("./dto/create-plant.dto");
const update_plant_dto_1 = require("./dto/update-plant.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PlantsController = class PlantsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.PlantsController = PlantsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una planta' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Planta creada exitosamente.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plant_dto_1.CreatePlantDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las plantas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de plantas.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una planta por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Planta encontrada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Planta no encontrada.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una planta' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Planta actualizada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Planta no encontrada.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plant_dto_1.UpdatePlantDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una planta' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Planta eliminada correctamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Planta no encontrada.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "remove", null);
exports.PlantsController = PlantsController = __decorate([
    (0, swagger_1.ApiTags)('Plantas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('plants'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [plants_service_1.PlantsService])
], PlantsController);
//# sourceMappingURL=plants.controller.js.map