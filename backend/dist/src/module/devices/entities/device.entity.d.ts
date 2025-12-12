export declare enum DeviceStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    ERROR = "ERROR"
}
export declare class Device {
    id: number;
    name: string;
    externalId: string;
    description?: string | null;
    status: DeviceStatus;
    location?: string | null;
    lastSeenAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
