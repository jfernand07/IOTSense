import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

import { Sensor } from '../../sensors/entities/sensor.entity';

export enum ReadingQualityFlag {
  OK = 'OK',
  SUSPECT = 'SUSPECT',
  ERROR = 'ERROR',
}

@Entity({ name: 'reading' })
@Index(['timestamp'])
export class Reading {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string; // bigint en JS -> mejor string

  @ManyToOne(() => Sensor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;

  @Column({ name: 'value', type: 'numeric', precision: 10, scale: 3 })
  value: string; // numeric -> string

  @Column({ name: 'timestamp', type: 'timestamptz' })
  timestamp: Date;

  @Column({
    name: 'quality_flag',
    type: 'enum',
    enum: ReadingQualityFlag,
    default: ReadingQualityFlag.OK,
  })
  qualityFlag: ReadingQualityFlag;

  @Column({ name: 'raw_payload', type: 'jsonb', nullable: true })
  rawPayload?: Record<string, any> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
