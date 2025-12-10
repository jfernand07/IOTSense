import { Plant } from '../../plants/entities/plant.entity';
export declare class PlantType {
    id: number;
    name: string;
    description?: string | null;
    optimalTempMin?: string | null;
    optimalTempMax?: string | null;
    optimalAirHumidityMin?: string | null;
    optimalAirHumidityMax?: string | null;
    optimalSoilMoistureMin?: string | null;
    optimalSoilMoistureMax?: string | null;
    optimalLightMin?: string | null;
    optimalLightMax?: string | null;
    optimalCo2Min?: string | null;
    optimalCo2Max?: string | null;
    createdAt: Date;
    updatedAt: Date;
    plants: Plant[];
}
