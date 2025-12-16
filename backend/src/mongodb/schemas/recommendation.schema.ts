import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecommendationDocument = Recommendation & Document;

@Schema({ timestamps: true, collection: 'recommendations' })
export class Recommendation {
  @Prop({ required: true, type: Number })
  plantId: number;

  @Prop({ type: Number })
  alertId?: number;

  @Prop({ type: Number })
  sensorId?: number;

  @Prop({ required: true, type: String })
  type: string; // WATERING, VENTILATION, TEMPERATURE_ADJUSTMENT, etc.

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: String, default: 'PENDING' })
  status: string; // PENDING, EXECUTED, DISMISSED

  @Prop({ type: Date })
  executedAt?: Date;

  @Prop({ type: Number })
  executedByUserId?: number;

  @Prop({ type: Number, default: 1 })
  severity: number; // 1-5

  @Prop({ type: Object })
  aiAnalysis?: {
    anomaly: boolean;
    description: string;
    action: string;
    confidence?: number;
  };

  @Prop({ type: Object })
  context?: {
    humidity?: number;
    temperature?: number;
    lux?: number;
    co2?: number;
    idealRanges?: string;
  };
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);

// Índices
RecommendationSchema.index({ plantId: 1, status: 1, createdAt: -1 });
RecommendationSchema.index({ alertId: 1 });
RecommendationSchema.index({ createdAt: -1 });

