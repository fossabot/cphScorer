import { Test } from "@nestjs/testing"
import config from "../src/config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seed1617737108784 } from "@cph-scorer/database-provider";


export default async function connect(moduleToLoad: any) {
    const module = await Test.createTestingModule({
        imports: [
            moduleToLoad,
            TypeOrmModule.forRoot({
                ...config,
                dropSchema: true,
                synchronize: true,
                migrations: [Seed1617737108784],
                migrationsRun: true
            }),
        ],
    }).compile();
    const app = module.createNestApplication();
    await app.init();
    return app
}