export type VehicleType = 'Car' | 'Motorcycle' | 'Truck';
export type VehicleCategory = 'Regular' | 'Official/Government';
export type TollStatus = 'Paid' | 'Pending' | 'Violation';
export declare class TollLog {
    id: string;
    licensePlate: string;
    vehicleType: VehicleType;
    vehicleCategory: VehicleCategory;
    timestamp: Date;
    tollFee: number;
    status: TollStatus;
}
export interface CreateTollLogDto {
    licensePlate: string;
    vehicleType: VehicleType;
    vehicleCategory?: VehicleCategory;
    status?: TollStatus;
}
