import { ConfigService } from '@nestjs/config';
export declare class AiService {
    private configService;
    private openai;
    private readonly logger;
    constructor(configService: ConfigService);
    detectAnomalies(data: {
        humidity: number;
        temp: number;
        lux: number;
        co2: number;
        lastValues: any[];
        idealRanges: string;
    }): Promise<any>;
}
