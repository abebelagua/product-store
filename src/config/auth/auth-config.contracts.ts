import Joi, { SchemaMap } from 'joi';

export const CONFIG_KEY_AUTH = 'auth';

/**
 * The global configuration for auth settings
 */
export interface AuthConfig {
    JWT_SECRET: string;
    JWT_EXPIRE_IN: string;
}

export const authConfigSchema: SchemaMap<AuthConfig> = {
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE_IN: Joi.string().default('60s'),
};
