import { Injectable } from '@nestjs/common';
import { VehicleType, VehicleCategory } from './toll-log.entity';

@Injectable()
export class FeeCalculatorService {
  private readonly feeMap: Record<VehicleType, number> = {
    Car: 5.0,
    Motorcycle: 2.0,
    Truck: 10.0,
  };

  calculate(vehicleType: VehicleType, category: VehicleCategory = 'Regular'): number {
    if (category === 'Official/Government') {
      return 0.0;
    }
    return this.feeMap[vehicleType] ?? 5.0;
  }
}
