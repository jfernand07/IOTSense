import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading, ReadingDocument } from '../schemas/reading.schema';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectModel(Reading.name) private readingModel: Model<ReadingDocument>,
  ) {}

  async create(readingData: Partial<Reading>): Promise<Reading> {
    const reading = new this.readingModel(readingData);
    return reading.save();
  }

  async createBatch(readingsData: Partial<Reading>[]): Promise<Reading[]> {
    return this.readingModel.insertMany(readingsData) as any;
  }

  async findBySensor(
    sensorId: number,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Reading[]> {
    return this.readingModel
      .find({ sensorId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findByDevice(
    deviceId: number,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Reading[]> {
    return this.readingModel
      .find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findByTimeRange(
    startDate: Date,
    endDate: Date,
    sensorId?: number,
  ): Promise<Reading[]> {
    const query: any = {
      timestamp: { $gte: startDate, $lte: endDate },
    };
    if (sensorId) {
      query.sensorId = sensorId;
    }
    return this.readingModel.find(query).sort({ timestamp: -1 }).exec();
  }

  async getLatestBySensor(sensorId: number): Promise<Reading | null> {
    return this.readingModel
      .findOne({ sensorId })
      .sort({ timestamp: -1 })
      .exec();
  }

  async getMinuteReadings(
    sensorId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Reading[]> {
    // Agrupar por minuto y obtener el promedio
    return this.readingModel
      .aggregate([
        {
          $match: {
            sensorId,
            timestamp: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$timestamp' },
              month: { $month: '$timestamp' },
              day: { $dayOfMonth: '$timestamp' },
              hour: { $hour: '$timestamp' },
              minute: { $minute: '$timestamp' },
            },
            avgValue: { $avg: '$value' },
            count: { $sum: 1 },
            timestamp: { $first: '$timestamp' },
            sensorId: { $first: '$sensorId' },
            unit: { $first: '$unit' },
            sensorType: { $first: '$sensorType' },
          },
        },
        {
          $project: {
            _id: 0,
            sensorId: 1,
            value: { $round: ['$avgValue', 2] },
            timestamp: 1,
            unit: 1,
            sensorType: 1,
            count: 1,
          },
        },
        { $sort: { timestamp: 1 } },
      ])
      .exec();
  }

  async deleteOldReadings(beforeDate: Date): Promise<number> {
    const result = await this.readingModel.deleteMany({
      timestamp: { $lt: beforeDate },
    });
    return result.deletedCount || 0;
  }
}

