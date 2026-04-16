import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { FeeCalculatorService } from './fee-calculator.service';
import { TollLog } from './toll-log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'toll_plaza_db',
      entities: [TollLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TollLog]),
  ],
  controllers: [LogsController],
  providers: [LogsService, FeeCalculatorService],
})
export class AppModule {}
