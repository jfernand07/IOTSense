import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReadingDocument = Reading & Document;

@Schema({ timestamps: true, collection: 'readings' })
export class Reading {
  @Prop({ required: true, type: Number })
  sensorId: number;

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({ required: true, type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: String, default: 'OK' })
  qualityFlag: string;

  @Prop({ type: Object })
  rawPayload?: any;

  @Prop({ type: String })
  sensorType?: string;

  @Prop({ type: String })
  unit?: string;

  @Prop({ type: Number })
  deviceId?: number;

  @Prop({ type: Number })
  plantId?: number;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);

// Índices para mejorar el rendimiento de consultas
ReadingSchema.index({ sensorId: 1, timestamp: -1 });
ReadingSchema.index({ timestamp: -1 });
ReadingSchema.index({ deviceId: 1, timestamp: -1 });

