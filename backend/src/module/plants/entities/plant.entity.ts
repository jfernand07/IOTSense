import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PlantType } from '../../plant-types/entities/plant-type.entity';
import { User } from '../../../users/entities/user.entity';

@Entity({ name: 'plant' })
export class Plant {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => PlantType, (pt) => pt.plants, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plant_type_id' })
  plantType: PlantType;

  @ManyToOne(() => User, (u) => u.plants, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'location', type: 'varchar', length: 255, nullable: true })
  location?: string | null;

  @Column({ name: 'date_planted', type: 'date', nullable: true })
  datePlanted?: string | null; // date en Postgres => string YYYY-MM-DD

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
