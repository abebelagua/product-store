import {
    ClassSerializerInterceptor,
    Logger,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { pick } from 'lodash';

import { AppModule } from './app.module';
import { MongoExceptionsFilter } from './common/exceptions';
import {
    CONFIG_KEY_RUNTIME,
    NEST_LOG_LEVEL,
    RuntimeConfig,
} from './config/runtime';
import { configureSwaggerUI, makeBanner, SWAGGER_OPTIONS_FIELS } from './utils';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        logger: NEST_LOG_LEVEL,
    });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new MongoExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const configService: ConfigService = app.get(ConfigService);

    const isVerboseLoggingEnabled = NEST_LOG_LEVEL.includes('verbose');
    if (isVerboseLoggingEnabled) {
        Logger.warn(
            'Verbose logging enabled, will log potentially sensitive information. DO NOT USE IN PRODUCTION!',
            'Bootstrap',
        );
    }

    const config = configService.get<RuntimeConfig>(CONFIG_KEY_RUNTIME);
    const swaggerOptions = pick(config, SWAGGER_OPTIONS_FIELS);
    const oasMessage = configureSwaggerUI(app, swaggerOptions);

    await app.listen(config.SERVER_PORT);

    const banner = makeBanner([
        `${config.APP_NAME} v${config.APP_VERSION}`,
        ``,
        `API: ${config.API_URL}`,
        `OAS: ${oasMessage}`,
    ]);
    banner.forEach(line => Logger.log(line, 'Bootstrap'));
}
bootstrap();
