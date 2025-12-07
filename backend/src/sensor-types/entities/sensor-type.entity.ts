import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'sensor_type' })
export class SensorType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string; // SOIL_MOISTURE, AIR_TEMP, LIGHT, CO2...

  @Column({ name: 'display_name', type: 'varchar', length: 100 })
  displayName: string;

  @Column({ name: 'unit', type: 'varchar', length: 20 })
  unit: string; // %, °C, lux, ppm...

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;
}
