import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TollLog, CreateTollLogDto } from './toll-log.entity';
import { FeeCalculatorService } from './fee-calculator.service';
export declare class LogsService implements OnModuleInit {
    private readonly logsRepo;
    private readonly feeCalculator;
    constructor(logsRepo: Repository<TollLog>, feeCalculator: FeeCalculatorService);
    onModuleInit(): Promise<void>;
    private seedData;
    findAll(): Promise<TollLog[]>;
    create(dto: CreateTollLogDto): Promise<TollLog>;
}
