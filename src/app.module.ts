import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { CONFIG_KEY_RUNTIME, RuntimeConfig } from './config/runtime';
import { HealthController } from './health.controller';
import { features } from './features';
import { configModule } from './config';

@Module({
    imports: [
        configModule,
        TerminusModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const { DB_URI } =
                    config.get<RuntimeConfig>(CONFIG_KEY_RUNTIME);
                return {
                    uri: DB_URI,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                };
            },
        }),
        ...features,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule {}
