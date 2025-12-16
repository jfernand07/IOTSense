import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Plant } from '../../plants/entities/plant.entity';
import { Sensor } from '../../sensors/entities/sensor.entity';
import { User } from '../../users/entities/user.entity';

export enum AlertSeverity {
    INFO = 'INFO',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
    OPEN = 'OPEN',
    ACKNOWLEDGED = 'ACKNOWLEDGED',
    RESOLVED = 'RESOLVED',
}

@Entity({ name: 'alert' })
export class Alert {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @ManyToOne(() => Plant, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'plant_id' })
    plant: Plant;

    @ManyToOne(() => Sensor, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'sensor_id' })
    sensor?: Sensor | null;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'resolved_by_user_id' })
    resolvedBy?: User | null;

    @Column({ name: 'type', type: 'varchar', length: 50 })
    type: string; // LOW_SOIL_MOISTURE, HIGH_TEMP...

    @Column({ name: 'severity', type: 'enum', enum: AlertSeverity })
    severity: AlertSeverity;

    @Column({ name: 'message', type: 'text' })
    message: string;

    @Column({ name: 'status', type: 'enum', enum: AlertStatus, default: AlertStatus.OPEN })
    status: AlertStatus;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @Column({ name: 'resolved_at', type: 'timestamptz', nullable: true })
    resolvedAt?: Date | null;
}
