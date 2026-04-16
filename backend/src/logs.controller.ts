import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateTollLogDto } from './toll-log.entity';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTollLogDto) {
    if (!dto.licensePlate || !dto.vehicleType) {
      throw new BadRequestException('licensePlate and vehicleType are required');
    }
    const validTypes = ['Car', 'Motorcycle', 'Truck'];
    if (!validTypes.includes(dto.vehicleType)) {
      throw new BadRequestException(`vehicleType must be one of: ${validTypes.join(', ')}`);
    }
    return this.logsService.create(dto);
  }
}
