import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TollLog, CreateTollLogDto } from './toll-log.entity';
import { FeeCalculatorService } from './fee-calculator.service';

@Injectable()
export class LogsService implements OnModuleInit {
  constructor(
    @InjectRepository(TollLog)
    private readonly logsRepo: Repository<TollLog>,
    private readonly feeCalculator: FeeCalculatorService,
  ) {}

  async onModuleInit() {
    const count = await this.logsRepo.count();
    if (count === 0) {
      await this.seedData();
    }
  }

  private async seedData() {
    const entries: CreateTollLogDto[] = [
      { licensePlate: 'DL01AB1234', vehicleType: 'Car',       vehicleCategory: 'Regular',             status: 'Paid' },
      { licensePlate: 'HR26BC5678', vehicleType: 'Truck',      vehicleCategory: 'Regular',             status: 'Paid' },
      { licensePlate: 'MH12CD9012', vehicleType: 'Motorcycle', vehicleCategory: 'Regular',             status: 'Pending' },
      { licensePlate: 'UP32DE3456', vehicleType: 'Car',        vehicleCategory: 'Official/Government', status: 'Paid' },
      { licensePlate: 'GJ05EF7890', vehicleType: 'Truck',      vehicleCategory: 'Regular',             status: 'Violation' },
      { licensePlate: 'KA01FG2345', vehicleType: 'Car',        vehicleCategory: 'Regular',             status: 'Paid' },
      { licensePlate: 'TN07GH6789', vehicleType: 'Motorcycle', vehicleCategory: 'Regular',             status: 'Paid' },
      { licensePlate: 'RJ14HI1234', vehicleType: 'Truck',      vehicleCategory: 'Official/Government', status: 'Paid' },
    ];
    for (const entry of entries) {
      await this.create(entry);
    }
  }

  async findAll(): Promise<TollLog[]> {
    return this.logsRepo.find({ order: { timestamp: 'DESC' } });
  }

  async create(dto: CreateTollLogDto): Promise<TollLog> {
    const category = dto.vehicleCategory ?? 'Regular';
    const fee = this.feeCalculator.calculate(dto.vehicleType, category);
    const log = this.logsRepo.create({
      licensePlate: dto.licensePlate.toUpperCase(),
      vehicleType: dto.vehicleType,
      vehicleCategory: category,
      tollFee: fee,
      status: dto.status ?? 'Paid',
    });
    return this.logsRepo.save(log);
  }
}
