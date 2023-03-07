import { RuntimeConfig, CONFIG_KEY_RUNTIME } from './runtime';
import { UserConfig, CONFIG_KEY_USER } from './user';
import { AuthConfig, CONFIG_KEY_AUTH } from './auth';

export interface AppConfig {
    [CONFIG_KEY_RUNTIME]: RuntimeConfig;
    [CONFIG_KEY_USER]: UserConfig;
    [CONFIG_KEY_AUTH]: AuthConfig;
}
