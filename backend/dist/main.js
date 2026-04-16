"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚗 Toll Plaza API running on http://localhost:${port}`);
    console.log(`   GET  /logs  → Fetch all toll records`);
    console.log(`   POST /logs  → Create a new toll entry`);
}
bootstrap();
//# sourceMappingURL=main.js.map