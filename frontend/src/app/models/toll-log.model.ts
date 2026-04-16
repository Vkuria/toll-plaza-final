export type VehicleType = 'Car' | 'Motorcycle' | 'Truck';
export type VehicleCategory = 'Regular' | 'Official/Government';
export type TollStatus = 'Paid' | 'Pending' | 'Violation';

export interface TollLog {
  id: string;
  licensePlate: string;
  vehicleType: VehicleType;
  vehicleCategory: VehicleCategory;
  timestamp: string;
  tollFee: number;
  status: TollStatus;
}

export interface CreateTollLogDto {
  licensePlate: string;
  vehicleType: VehicleType;
  vehicleCategory?: VehicleCategory;
  status?: TollStatus;
}
