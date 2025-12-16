import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from '../schemas/alert.schema';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertModel: Model<AlertDocument>,
  ) {}

  async create(alertData: Partial<Alert>): Promise<Alert> {
    const alert = new this.alertModel(alertData);
    return alert.save();
  }

  async findByPlant(
    plantId: number,
    status?: string,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Alert[]> {
    const query: any = { plantId };
    if (status) query.status = status;

    return this.alertModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findBySensor(
    sensorId: number,
    status?: string,
  ): Promise<Alert[]> {
    const query: any = { sensorId };
    if (status) query.status = status;

    return this.alertModel
      .find(query)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Alert | null> {
    return this.alertModel.findById(id).exec();
  }

  async getOpenAlerts(plantId?: number): Promise<Alert[]> {
    const query: any = { status: 'OPEN' };
    if (plantId) query.plantId = plantId;

    return this.alertModel
      .find(query)
      .sort({ severity: -1, createdAt: -1 })
      .exec();
  }

  async getAlertsBySeverity(
    severity: string,
    limit: number = 50,
  ): Promise<Alert[]> {
    return this.alertModel
      .find({ severity, status: 'OPEN' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async resolveAlert(
    id: string,
    resolvedByUserId?: number,
  ): Promise<Alert | null> {
    const update: any = {
      status: 'RESOLVED',
      resolvedAt: new Date(),
    };
    if (resolvedByUserId) {
      update.resolvedByUserId = resolvedByUserId;
    }

    return this.alertModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
  }

  async getHistory(
    plantId?: number,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Alert[]> {
    const query: any = {};
    if (plantId) query.plantId = plantId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lte = endDate;
    }

    return this.alertModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.alertModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

