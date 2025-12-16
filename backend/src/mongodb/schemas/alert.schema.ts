import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlertDocument = Alert & Document;

@Schema({ timestamps: true, collection: 'alerts' })
export class Alert {
  @Prop({ required: true, type: Number })
  plantId: number;

  @Prop({ type: Number })
  sensorId?: number;

  @Prop({ type: Number })
  deviceId?: number;

  @Prop({ required: true, type: String })
  type: string; // HIGH_TEMP, LOW_TEMP, LOW_SOIL_MOISTURE, HIGH_HUMIDITY, etc.

  @Prop({ required: true, type: String })
  severity: string; // INFO, WARNING, CRITICAL

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: String, default: 'OPEN' })
  status: string; // OPEN, RESOLVED, DISMISSED

  @Prop({ type: Date })
  resolvedAt?: Date;

  @Prop({ type: Number })
  resolvedByUserId?: number;

  @Prop({ type: Object })
  sensorData?: {
    value: number;
    unit: string;
    threshold?: {
      min?: number;
      max?: number;
    };
  };

  @Prop({ type: Object })
  metadata?: any;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);

// Índices
AlertSchema.index({ plantId: 1, status: 1, createdAt: -1 });
AlertSchema.index({ sensorId: 1, status: 1 });
AlertSchema.index({ severity: 1, status: 1 });
AlertSchema.index({ createdAt: -1 });

