import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import {
    CONFIG_KEY_RUNTIME,
    runtimeConfigSchema,
    loadRuntimeConfig,
} from './runtime';
import { CONFIG_KEY_USER, loadUserConfig, userConfigSchema } from './user';
import { CONFIG_KEY_AUTH, loadAuthConfig, authConfigSchema } from './auth';

import { AppConfig } from './app-config.contract';

export const configModule = ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    ignoreEnvFile: false,
    load: [loadRuntimeConfig, loadUserConfig, loadAuthConfig],
    validationSchema: Joi.object<AppConfig>({
        [CONFIG_KEY_RUNTIME]: runtimeConfigSchema,
        [CONFIG_KEY_USER]: userConfigSchema,
        [CONFIG_KEY_AUTH]: authConfigSchema,
        // add other config schemas here
    }),
});
