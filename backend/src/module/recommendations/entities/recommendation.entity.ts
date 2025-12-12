import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Plant } from '../../plants/entities/plant.entity';
import { Alert } from '../../alerts/entities/alert.entity';
import { User } from '../../users/entities/user.entity';

export enum RecommendationStatus {
  PENDING = 'PENDING',
  APPLIED = 'APPLIED',
  DISMISSED = 'DISMISSED',
}

@Entity({ name: 'recommendation' })
export class Recommendation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Plant, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'plant_id' })
  plant: Plant;

  @ManyToOne(() => Alert, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'alert_id' })
  alert?: Alert | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'executed_by_user_id' })
  executedBy?: User | null;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  type: string; // WATERING, FERTILIZING...

  @Column({ name: 'message', type: 'text' })
  message: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: RecommendationStatus,
    default: RecommendationStatus.PENDING,
  })
  status: RecommendationStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'executed_at', type: 'timestamptz', nullable: true })
  executedAt?: Date | null;
}
