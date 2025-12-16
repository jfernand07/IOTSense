import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sensor_thresholds')
export class SensorThreshold {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensor_type: string;

  @Column('float')
  min_value: number;

  @Column('float')
  max_value: number;

  @Column()
  severity: string;
}
