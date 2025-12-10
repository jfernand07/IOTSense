import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    detectAnomalies(body: {
        humidity: number;
        temp: number;
        lux: number;
        co2: number;
        lastValues: any[];
        idealRanges: string;
    }): Promise<any>;
}
