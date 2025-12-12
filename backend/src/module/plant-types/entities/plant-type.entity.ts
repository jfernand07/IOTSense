import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { Plant } from '../../plants/entities/plant.entity';

@Entity({ name: 'plant_type' })
export class PlantType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'optimal_temp_min', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalTempMin?: string | null;

  @Column({ name: 'optimal_temp_max', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalTempMax?: string | null;

  @Column({ name: 'optimal_air_humidity_min', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalAirHumidityMin?: string | null;

  @Column({ name: 'optimal_air_humidity_max', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalAirHumidityMax?: string | null;

  @Column({ name: 'optimal_soil_moisture_min', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalSoilMoistureMin?: string | null;

  @Column({ name: 'optimal_soil_moisture_max', type: 'numeric', precision: 5, scale: 2, nullable: true })
  optimalSoilMoistureMax?: string | null;

  @Column({ name: 'optimal_light_min', type: 'numeric', precision: 10, scale: 2, nullable: true })
  optimalLightMin?: string | null;

  @Column({ name: 'optimal_light_max', type: 'numeric', precision: 10, scale: 2, nullable: true })
  optimalLightMax?: string | null;

  @Column({ name: 'optimal_co2_min', type: 'numeric', precision: 10, scale: 2, nullable: true })
  optimalCo2Min?: string | null;

  @Column({ name: 'optimal_co2_max', type: 'numeric', precision: 10, scale: 2, nullable: true })
  optimalCo2Max?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Plant, (plant) => plant.plantType)
  plants: Plant[];
}
