import { createConfigLoader } from '../config-loader.factory';

import { CONFIG_KEY_AUTH, AuthConfig } from './auth-config.contracts';

export const loadAuthConfig = createConfigLoader<AuthConfig>(CONFIG_KEY_AUTH, [
    'JWT_SECRET',
    'JWT_EXPIRE_IN',
]);
