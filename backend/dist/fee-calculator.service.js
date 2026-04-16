"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeCalculatorService = void 0;
const common_1 = require("@nestjs/common");
let FeeCalculatorService = class FeeCalculatorService {
    constructor() {
        this.feeMap = {
            Car: 5.0,
            Motorcycle: 2.0,
            Truck: 10.0,
        };
    }
    calculate(vehicleType, category = 'Regular') {
        var _a;
        if (category === 'Official/Government') {
            return 0.0;
        }
        return (_a = this.feeMap[vehicleType]) !== null && _a !== void 0 ? _a : 5.0;
    }
};
exports.FeeCalculatorService = FeeCalculatorService;
exports.FeeCalculatorService = FeeCalculatorService = __decorate([
    (0, common_1.Injectable)()
], FeeCalculatorService);
//# sourceMappingURL=fee-calculator.service.js.map