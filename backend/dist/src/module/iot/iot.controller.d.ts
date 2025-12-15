import type { Response } from 'express';
import { IotService } from './iot.service';
export declare class IotController {
    private readonly service;
    constructor(service: IotService);
    updateSensors(body: any): {
        status: string;
    };
    getLatestSensors(): any;
    registerCamera(body: {
        ip: string;
        endpoint?: string;
    }): {
        status: string;
    };
    getCameraStream(res: Response): void;
    getCameraControl(): {
        streaming: boolean;
    };
    setCameraControl(body: {
        streaming: boolean;
    }): {
        streaming: boolean;
    };
    setLedState(body: {
        state: boolean;
    }): {
        status: string;
        ledState: boolean;
    };
    getLedState(): {
        ledState: boolean;
    };
    getStatus(): {
        sensors: boolean;
        camera: boolean;
        cameraInfo: {
            ip: string;
            endpoint: string;
            registeredAt: string;
        } | null;
        streaming: boolean;
        time: string;
    };
}
