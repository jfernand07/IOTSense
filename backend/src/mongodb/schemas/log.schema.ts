import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true, collection: 'logs' })
export class Log {
  @Prop({ required: true, type: Number })
  sensorId: number;

  @Prop({ required: true, type: String })
  sensorType: string; // temperatura, humedad, etc.

  @Prop({ required: true, type: String })
  location: string; // interior, exterior

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({ required: true, type: String })
  unit: string;

  @Prop({ required: true, type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: Number })
  deviceId?: number;

  @Prop({ type: Number })
  plantId?: number;

  @Prop({ type: String, default: 'OK' })
  status: string;

  @Prop({ type: Object })
  metadata?: any;
}

export const LogSchema = SchemaFactory.createForClass(Log);

// Índices para mejorar el rendimiento de consultas
LogSchema.index({ sensorId: 1, timestamp: -1 });
LogSchema.index({ sensorType: 1, location: 1, timestamp: -1 });
LogSchema.index({ timestamp: -1 });

