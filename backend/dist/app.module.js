"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const logs_controller_1 = require("./logs.controller");
const logs_service_1 = require("./logs.service");
const fee_calculator_service_1 = require("./fee-calculator.service");
const toll_log_entity_1 = require("./toll-log.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'toll_plaza_db',
                entities: [toll_log_entity_1.TollLog],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([toll_log_entity_1.TollLog]),
        ],
        controllers: [logs_controller_1.LogsController],
        providers: [logs_service_1.LogsService, fee_calculator_service_1.FeeCalculatorService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map