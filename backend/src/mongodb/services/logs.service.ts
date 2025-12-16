import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(logData: Partial<Log>): Promise<Log> {
    const log = new this.logModel(logData);
    return log.save();
  }

  async createBatch(logsData: Partial<Log>[]): Promise<Log[]> {
    return this.logModel.insertMany(logsData) as any;
  }

  async findBySensor(
    sensorId: number,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Log[]> {
    return this.logModel
      .find({ sensorId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findBySensorTypeAndLocation(
    sensorType: string,
    location: string,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Log[]> {
    return this.logModel
      .find({ sensorType, location })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findByTimeRange(
    startDate: Date,
    endDate: Date,
    sensorId?: number,
    sensorType?: string,
    location?: string,
  ): Promise<Log[]> {
    const query: any = {
      timestamp: { $gte: startDate, $lte: endDate },
    };
    if (sensorId) query.sensorId = sensorId;
    if (sensorType) query.sensorType = sensorType;
    if (location) query.location = location;

    return this.logModel.find(query).sort({ timestamp: -1 }).exec();
  }

  async getLatestBySensor(sensorId: number): Promise<Log | null> {
    return this.logModel
      .findOne({ sensorId })
      .sort({ timestamp: -1 })
      .exec();
  }

  async getHistoryBySensorType(
    sensorType: string,
    days: number = 7,
  ): Promise<Log[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.logModel
      .find({
        sensorType,
        timestamp: { $gte: startDate },
      })
      .sort({ timestamp: -1 })
      .exec();
  }

  async deleteOldLogs(beforeDate: Date): Promise<number> {
    const result = await this.logModel.deleteMany({
      timestamp: { $lt: beforeDate },
    });
    return result.deletedCount || 0;
  }
}

