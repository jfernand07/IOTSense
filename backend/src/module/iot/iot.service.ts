import { Injectable, NotFoundException, BadRequestException, ServiceUnavailableException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IotService {
  // =========================
  // Estado en memoria
  // =========================
  private lastSensorData: any = null;
  private cameraInfo: { ip: string; endpoint: string; registeredAt: string } | null = null;
  private streamingActivo = false; // Control digital de streaming
  private ledState = false; // false = OFF, true = ON

  // =========================
  // Sensores
  // =========================
  updateSensors(data: any) {
    this.lastSensorData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    console.log('Datos sensores:', this.lastSensorData);
    return { status: 'ok' };
  }

  getLatestSensors() {
    if (!this.lastSensorData) {
      throw new NotFoundException({ error: 'Sin datos' });
    }
    return this.lastSensorData;
  }

  // =========================
  // Camara
  // =========================
  registerCamera(ip: string, endpoint?: string) {
    if (!ip) {
      throw new BadRequestException({ error: 'IP requerida' });
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
      throw new ServiceUnavailableException({ error: 'Camara no registrada' });
    }

    if (!this.streamingActivo) {
      throw new ForbiddenException({ error: 'Streaming desactivado por backend' });
    }

    // Retornamos la URL completa para el redirect
    return `http://${this.cameraInfo.ip}${this.cameraInfo.endpoint}`;
  }

  getCameraControl() {
    return { streaming: this.streamingActivo };
  }

  setCameraControl(streaming: boolean) {
    if (typeof streaming !== 'boolean') {
      throw new BadRequestException({ error: 'Valor streaming debe ser booleano' });
    }
    this.streamingActivo = streaming;
    console.log('Streaming actualizado a:', this.streamingActivo);
    return { streaming: this.streamingActivo };
  }

  // =========================
  // LED
  // =========================
  setLedState(state: boolean) {
    if (typeof state !== 'boolean') {
      throw new BadRequestException({ error: 'state debe ser boolean' });
    }
    this.ledState = state;
    console.log('LED:', this.ledState ? 'ON' : 'OFF');
    return { status: 'ok', ledState: this.ledState };
  }

  getLedState() {
    return { ledState: this.ledState };
  }

  // =========================
  // Estado General
  // =========================
  getStatus() {
    return {
      sensors: !!this.lastSensorData,
      camera: !!this.cameraInfo,
      cameraInfo: this.cameraInfo,
      streaming: this.streamingActivo,
      time: new Date().toISOString(),
    };
  }
}
