import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from '../schemas/media.schema';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<MediaDocument>) {}

  async create(mediaData: Partial<Media>): Promise<Media> {
    const media = new this.mediaModel(mediaData);
    return media.save();
  }

  async findByDevice(
    deviceId: number,
    type?: string,
    limit: number = 50,
    skip: number = 0,
  ): Promise<Media[]> {
    const query: any = { deviceId, isActive: true };
    if (type) query.type = type;

    return this.mediaModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findByPlant(
    plantId: number,
    type?: string,
    limit: number = 50,
    skip: number = 0,
  ): Promise<Media[]> {
    const query: any = { plantId, isActive: true };
    if (type) query.type = type;

    return this.mediaModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findById(id: string): Promise<Media | null> {
    return this.mediaModel.findById(id).exec();
  }

  async getLatestByDevice(
    deviceId: number,
    type?: string,
  ): Promise<Media | null> {
    const query: any = { deviceId, isActive: true };
    if (type) query.type = type;

    return this.mediaModel
      .findOne(query)
      .sort({ createdAt: -1 })
      .exec();
  }

  async getVideos(
    deviceId?: number,
    plantId?: number,
    limit: number = 20,
  ): Promise<Media[]> {
    const query: any = { type: 'video', isActive: true };
    if (deviceId) query.deviceId = deviceId;
    if (plantId) query.plantId = plantId;

    return this.mediaModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getImages(
    deviceId?: number,
    plantId?: number,
    limit: number = 50,
  ): Promise<Media[]> {
    const query: any = { type: 'image', isActive: true };
    if (deviceId) query.deviceId = deviceId;
    if (plantId) query.plantId = plantId;

    return this.mediaModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async update(id: string, updateData: Partial<Media>): Promise<Media | null> {
    return this.mediaModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.mediaModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async softDelete(id: string): Promise<Media | null> {
    return this.mediaModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }
}

