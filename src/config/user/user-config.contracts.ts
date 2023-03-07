import Joi, { SchemaMap } from 'joi';

export const CONFIG_KEY_USER = 'user';

/**
 * The global configuration for user settings
 */
export interface UserConfig {
    EXAMPLE: string;
}

export const userConfigSchema: SchemaMap<UserConfig> = {
    EXAMPLE: Joi.string(),
};
