import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Device } from '../../module/devices/entities/device.entity';
import { SensorType } from '../../module/sensor-types/entities/sensor-type.entity';
import { Plant } from '../../module/plants/entities/plant.entity';

@Entity({ name: 'sensor' })
export class Sensor {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Device, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => SensorType, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sensor_type_id' })
  sensorType: SensorType;

  @ManyToOne(() => Plant, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'plant_id' })
  plant?: Plant | null;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Index({ unique: true })
  @Column({ name: 'external_id', type: 'varchar', length: 100 })
  externalId: string; // Arduino IoT Cloud property id

  @Column({ name: 'pin', type: 'varchar', length: 10, nullable: true })
  pin?: string | null;

  // numeric(6,3) -> string en Postgres normalmente
  @Column({ name: 'calibration_offset', type: 'numeric', precision: 6, scale: 3, default: 0 })
  calibrationOffset: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
