import { LogsService } from './logs.service';
import { CreateTollLogDto } from './toll-log.entity';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    findAll(): Promise<import("./toll-log.entity").TollLog[]>;
    create(dto: CreateTollLogDto): Promise<import("./toll-log.entity").TollLog>;
}
