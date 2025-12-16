import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true, collection: 'media' })
export class Media {
  @Prop({ required: true, type: String })
  type: string; // image, video

  @Prop({ required: true, type: String })
  filename: string;

  @Prop({ required: true, type: String })
  path: string;

  @Prop({ type: String })
  url?: string;

  @Prop({ type: Number })
  deviceId?: number;

  @Prop({ type: Number })
  plantId?: number;

  @Prop({ type: Number })
  sensorId?: number;

  @Prop({ type: String })
  mimeType?: string;

  @Prop({ type: Number })
  size?: number; // en bytes

  @Prop({ type: Number, default: 0 })
  duration?: number; // para videos, en segundos

  @Prop({ type: String })
  thumbnailPath?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Object })
  metadata?: {
    width?: number;
    height?: number;
    resolution?: string;
    format?: string;
  };

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

// Índices
MediaSchema.index({ deviceId: 1, type: 1, createdAt: -1 });
MediaSchema.index({ plantId: 1, createdAt: -1 });
MediaSchema.index({ createdAt: -1 });

