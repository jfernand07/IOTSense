"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotService = void 0;
const common_1 = require("@nestjs/common");
let IotService = class IotService {
    lastSensorData = null;
    cameraInfo = null;
    streamingActivo = false;
    ledState = false;
    updateSensors(data) {
        this.lastSensorData = {
            ...data,
            timestamp: new Date().toISOString(),
        };
        console.log('Datos sensores:', this.lastSensorData);
        return { status: 'ok' };
    }
    getLatestSensors() {
        if (!this.lastSensorData) {
            throw new common_1.NotFoundException({ error: 'Sin datos' });
        }
        return this.lastSensorData;
    }
    registerCamera(ip, endpoint) {
        if (!ip) {
            throw new common_1.BadRequestException({ error: 'IP requerida' });
        }
        this.cameraInfo = {
            ip,
            endpoint: endpoint || '/stream',
            registeredAt: new Date().toISOString(),
        };
        console.log('ESP32-CAM registrada:', this.cameraInfo);
        return { status: 'ok' };
    }
    getCameraStreamUrl() {
        if (!this.cameraInfo) {
            throw new common_1.ServiceUnavailableException({ error: 'Camara no registrada' });
        }
        if (!this.streamingActivo) {
            throw new common_1.ForbiddenException({ error: 'Streaming desactivado por backend' });
        }
        return `http://${this.cameraInfo.ip}${this.cameraInfo.endpoint}`;
    }
    getCameraControl() {
        return { streaming: this.streamingActivo };
    }
    setCameraControl(streaming) {
        if (typeof streaming !== 'boolean') {
            throw new common_1.BadRequestException({ error: 'Valor streaming debe ser booleano' });
        }
        this.streamingActivo = streaming;
        console.log('Streaming actualizado a:', this.streamingActivo);
        return { streaming: this.streamingActivo };
    }
    setLedState(state) {
        if (typeof state !== 'boolean') {
            throw new common_1.BadRequestException({ error: 'state debe ser boolean' });
        }
        this.ledState = state;
        console.log('LED:', this.ledState ? 'ON' : 'OFF');
        return { status: 'ok', ledState: this.ledState };
    }
    getLedState() {
        return { ledState: this.ledState };
    }
    getStatus() {
        return {
            sensors: !!this.lastSensorData,
            camera: !!this.cameraInfo,
            cameraInfo: this.cameraInfo,
            streaming: this.streamingActivo,
            time: new Date().toISOString(),
        };
    }
};
exports.IotService = IotService;
exports.IotService = IotService = __decorate([
    (0, common_1.Injectable)()
], IotService);
//# sourceMappingURL=iot.service.js.map