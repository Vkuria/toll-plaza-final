import { VehicleType, VehicleCategory } from './toll-log.entity';
export declare class FeeCalculatorService {
    private readonly feeMap;
    calculate(vehicleType: VehicleType, category?: VehicleCategory): number;
}
