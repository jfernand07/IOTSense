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
exports.IotController = void 0;
const common_1 = require("@nestjs/common");
const iot_service_1 = require("./iot.service");
let IotController = class IotController {
    service;
    constructor(service) {
        this.service = service;
    }
    updateSensors(body) {
        return this.service.updateSensors(body);
    }
    getLatestSensors() {
        return this.service.getLatestSensors();
    }
    registerCamera(body) {
        return this.service.registerCamera(body.ip, body.endpoint);
    }
    getCameraStream(res) {
        const url = this.service.getCameraStreamUrl();
        return res.redirect(url);
    }
    getCameraControl() {
        return this.service.getCameraControl();
    }
    setCameraControl(body) {
        return this.service.setCameraControl(body.streaming);
    }
    setLedState(body) {
        return this.service.setLedState(body.state);
    }
    getLedState() {
        return this.service.getLedState();
    }
    getStatus() {
        return this.service.getStatus();
    }
};
exports.IotController = IotController;
__decorate([
    (0, common_1.Post)('sensors'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "updateSensors", null);
__decorate([
    (0, common_1.Get)('sensors/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getLatestSensors", null);
__decorate([
    (0, common_1.Post)('camera/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "registerCamera", null);
__decorate([
    (0, common_1.Get)('camera/stream'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getCameraStream", null);
__decorate([
    (0, common_1.Get)('camera/control'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getCameraControl", null);
__decorate([
    (0, common_1.Post)('camera/control'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "setCameraControl", null);
__decorate([
    (0, common_1.Post)('led'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "setLedState", null);
__decorate([
    (0, common_1.Get)('led'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getLedState", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getStatus", null);
exports.IotController = IotController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [iot_service_1.IotService])
], IotController);
//# sourceMappingURL=iot.controller.js.map