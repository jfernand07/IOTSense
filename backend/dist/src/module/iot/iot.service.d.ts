export declare class IotService {
    private lastSensorData;
    private cameraInfo;
    private streamingActivo;
    private ledState;
    updateSensors(data: any): {
        status: string;
    };
    getLatestSensors(): any;
    registerCamera(ip: string, endpoint?: string): {
        status: string;
    };
    getCameraStreamUrl(): string;
    getCameraControl(): {
        streaming: boolean;
    };
    setCameraControl(streaming: boolean): {
        streaming: boolean;
    };
    setLedState(state: boolean): {
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
