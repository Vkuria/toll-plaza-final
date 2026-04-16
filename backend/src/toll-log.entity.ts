import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type VehicleType = 'Car' | 'Motorcycle' | 'Truck';
export type VehicleCategory = 'Regular' | 'Official/Government';
export type TollStatus = 'Paid' | 'Pending' | 'Violation';

@Entity('toll_logs')
export class TollLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 20 })
  licensePlate!: string;

  @Column({ type: 'enum', enum: ['Car', 'Motorcycle', 'Truck'] })
  vehicleType!: VehicleType;

  @Column({
    type: 'enum',
    enum: ['Regular', 'Official/Government'],
    default: 'Regular',
  })
  vehicleCategory!: VehicleCategory;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tollFee!: number;

  @Column({
    type: 'enum',
    enum: ['Paid', 'Pending', 'Violation'],
    default: 'Paid',
  })
  status!: TollStatus;
}

export interface CreateTollLogDto {
  licensePlate: string;
  vehicleType: VehicleType;
  vehicleCategory?: VehicleCategory;
  status?: TollStatus;
}
