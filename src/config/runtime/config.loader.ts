import { getAppVersion } from '../../utils';
import { createConfigLoader } from '../config-loader.factory';

import { RuntimeConfig, CONFIG_KEY_RUNTIME } from './config.contracts';

export const loadRuntimeConfig = createConfigLoader<RuntimeConfig>(
    CONFIG_KEY_RUNTIME,
    [
        // general
        'APP_ENV',
        'APP_NAME',

        'SERVER_PORT',
        'API_URL',
        // mongo
        'DB_URI',
        // openapi
        'OAS_ENABLED',
        'OAS_PATH',
        // logging
        'LOG_LEVEL',
    ],
    () => ({
        APP_VERSION: getAppVersion(),
    }),
);
