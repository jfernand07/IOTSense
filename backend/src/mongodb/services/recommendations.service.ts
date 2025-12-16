import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation, RecommendationDocument } from '../schemas/recommendation.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Recommendation.name)
    private recommendationModel: Model<RecommendationDocument>,
  ) {}

  async create(
    recommendationData: Partial<Recommendation>,
  ): Promise<Recommendation> {
    const recommendation = new this.recommendationModel(recommendationData);
    return recommendation.save();
  }

  async findByPlant(
    plantId: number,
    status?: string,
    limit: number = 50,
    skip: number = 0,
  ): Promise<Recommendation[]> {
    const query: any = { plantId };
    if (status) query.status = status;

    return this.recommendationModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findByAlert(alertId: number): Promise<Recommendation[]> {
    return this.recommendationModel
      .find({ alertId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Recommendation | null> {
    return this.recommendationModel.findById(id).exec();
  }

  async updateStatus(
    id: string,
    status: string,
    executedByUserId?: number,
  ): Promise<Recommendation | null> {
    const update: any = { status };
    if (status === 'EXECUTED') {
      update.executedAt = new Date();
      if (executedByUserId) {
        update.executedByUserId = executedByUserId;
      }
    }

    return this.recommendationModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
  }

  async getHistory(
    plantId?: number,
    limit: number = 100,
    skip: number = 0,
  ): Promise<Recommendation[]> {
    const query: any = {};
    if (plantId) query.plantId = plantId;

    return this.recommendationModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async getPendingRecommendations(
    plantId?: number,
  ): Promise<Recommendation[]> {
    const query: any = { status: 'PENDING' };
    if (plantId) query.plantId = plantId;

    return this.recommendationModel
      .find(query)
      .sort({ severity: -1, createdAt: -1 })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.recommendationModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

