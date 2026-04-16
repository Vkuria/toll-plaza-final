"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const toll_log_entity_1 = require("./toll-log.entity");
const fee_calculator_service_1 = require("./fee-calculator.service");
let LogsService = class LogsService {
    constructor(logsRepo, feeCalculator) {
        this.logsRepo = logsRepo;
        this.feeCalculator = feeCalculator;
    }
    async onModuleInit() {
        const count = await this.logsRepo.count();
        if (count === 0) {
            await this.seedData();
        }
    }
    async seedData() {
        const entries = [
            { licensePlate: 'DL01AB1234', vehicleType: 'Car', vehicleCategory: 'Regular', status: 'Paid' },
            { licensePlate: 'HR26BC5678', vehicleType: 'Truck', vehicleCategory: 'Regular', status: 'Paid' },
            { licensePlate: 'MH12CD9012', vehicleType: 'Motorcycle', vehicleCategory: 'Regular', status: 'Pending' },
            { licensePlate: 'UP32DE3456', vehicleType: 'Car', vehicleCategory: 'Official/Government', status: 'Paid' },
            { licensePlate: 'GJ05EF7890', vehicleType: 'Truck', vehicleCategory: 'Regular', status: 'Violation' },
            { licensePlate: 'KA01FG2345', vehicleType: 'Car', vehicleCategory: 'Regular', status: 'Paid' },
            { licensePlate: 'TN07GH6789', vehicleType: 'Motorcycle', vehicleCategory: 'Regular', status: 'Paid' },
            { licensePlate: 'RJ14HI1234', vehicleType: 'Truck', vehicleCategory: 'Official/Government', status: 'Paid' },
        ];
        for (const entry of entries) {
            await this.create(entry);
        }
    }
    async findAll() {
        return this.logsRepo.find({ order: { timestamp: 'DESC' } });
    }
    async create(dto) {
        var _a, _b;
        const category = (_a = dto.vehicleCategory) !== null && _a !== void 0 ? _a : 'Regular';
        const fee = this.feeCalculator.calculate(dto.vehicleType, category);
        const log = this.logsRepo.create({
            licensePlate: dto.licensePlate.toUpperCase(),
            vehicleType: dto.vehicleType,
            vehicleCategory: category,
            tollFee: fee,
            status: (_b = dto.status) !== null && _b !== void 0 ? _b : 'Paid',
        });
        return this.logsRepo.save(log);
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(toll_log_entity_1.TollLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        fee_calculator_service_1.FeeCalculatorService])
], LogsService);
//# sourceMappingURL=logs.service.js.map