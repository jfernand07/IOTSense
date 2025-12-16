import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity('sensor_current_state')
export class SensorCurrentState {
  @PrimaryColumn()
  sensor_id: number;

  @Column('float')
  last_value: number;

  @Column({ type: 'timestamptz' })
  last_read_at: Date;

  @Column()
  status: string;

  @OneToOne(() => Sensor, (sensor) => sensor.currentState, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;
}
