import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from '../../devices/entities/device.entity';
import { SensorCurrentState } from './sensor-current-state.entity';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  unit: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Device, (device) => device.sensors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @OneToOne(() => SensorCurrentState, (state) => state.sensor, { cascade: true })
  currentState: SensorCurrentState;
}
