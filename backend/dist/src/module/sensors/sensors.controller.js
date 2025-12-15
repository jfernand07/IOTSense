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
exports.SensorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sensors_service_1 = require("./sensors.service");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const update_sensor_dto_1 = require("./dto/update-sensor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let SensorsController = class SensorsController {
    sensorsService;
    constructor(sensorsService) {
        this.sensorsService = sensorsService;
    }
    create(dto) {
        return this.sensorsService.create(dto);
    }
    findAll() {
        return this.sensorsService.findAll();
    }
    async findOne(id) {
        const sensor = await this.sensorsService.findOne(id);
        if (!sensor)
            throw new common_1.NotFoundException('Sensor no encontrado');
        return sensor;
    }
    async update(id, dto) {
        return this.sensorsService.update(id, dto);
    }
    remove(id) {
        return this.sensorsService.remove(id);
    }
};
exports.SensorsController = SensorsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un sensor' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sensor creado correctamente.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Listar sensores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de sensores.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un sensor por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sensor encontrado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sensor no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un sensor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sensor actualizado correctamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sensor no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sensor_dto_1.UpdateSensorDto]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un sensor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sensor eliminado correctamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sensor no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "remove", null);
exports.SensorsController = SensorsController = __decorate([
    (0, swagger_1.ApiTags)('Sensores'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('sensors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [sensors_service_1.SensorsService])
], SensorsController);
//# sourceMappingURL=sensors.controller.js.map