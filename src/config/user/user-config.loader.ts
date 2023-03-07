import { createConfigLoader } from '../config-loader.factory';

import { CONFIG_KEY_USER, UserConfig } from './user-config.contracts';

export const loadUserConfig = createConfigLoader<UserConfig>(CONFIG_KEY_USER, [
    'EXAMPLE',
]);
