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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TollLog = void 0;
const typeorm_1 = require("typeorm");
let TollLog = class TollLog {
};
exports.TollLog = TollLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TollLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], TollLog.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Car', 'Motorcycle', 'Truck'] }),
    __metadata("design:type", String)
], TollLog.prototype, "vehicleType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Regular', 'Official/Government'],
        default: 'Regular',
    }),
    __metadata("design:type", String)
], TollLog.prototype, "vehicleCategory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TollLog.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TollLog.prototype, "tollFee", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Paid', 'Pending', 'Violation'],
        default: 'Paid',
    }),
    __metadata("design:type", String)
], TollLog.prototype, "status", void 0);
exports.TollLog = TollLog = __decorate([
    (0, typeorm_1.Entity)('toll_logs')
], TollLog);
//# sourceMappingURL=toll-log.entity.js.map