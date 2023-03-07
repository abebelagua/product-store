import Joi, { SchemaMap } from 'joi';

import {
    AppEnvironment,
    APP_ENVIRONMENTS,
    ENV_LOCAL,
    LogLevel,
    LOG_DEBUG,
    LOG_ERROR,
    LOG_LEVELS,
    LOG_VERBOSE,
    LOG_WARN,
} from './constants';

/**
 * The property path to load runtime config on the global config object.
 */
export const CONFIG_KEY_RUNTIME = 'runtime';

export const DB_CONNECTION_MAIN = 'main';
export const DEFAULT_PORT = 4000;

const levelsList = LOG_LEVELS.join(', ');
const msg = `Invalid log level, please specify one of: ${levelsList}. Default is ERROR.`;

/**
 * General config options
 */
export interface RuntimeConfig {
    // general
    APP_ENV: AppEnvironment;
    APP_NAME: string;
    APP_VERSION: string;
    SERVER_PORT: number | string;
    API_URL: string;
    // mongo
    DB_URI: string;
    // openapi
    OAS_ENABLED: boolean;
    OAS_PATH: string;
    // logging
    LOG_LEVEL: LogLevel;
}

export const runtimeConfigSchema: SchemaMap<RuntimeConfig> = {
    // general
    APP_ENV: Joi.string()
        .valid(...APP_ENVIRONMENTS)
        .default(ENV_LOCAL),
    APP_NAME: Joi.string().default('Product Store'),
    APP_VERSION: Joi.string().pattern(/^v?\d+(\.\d+){2}(-\w+)?$/),
    SERVER_PORT: Joi.number().default(DEFAULT_PORT),
    API_URL: Joi.string()
        .pattern(/^https?:\/\/\w+(\.\w+){2}$/)
        .default(`http://localhost:${DEFAULT_PORT}`),
    // mongo
    DB_URI: Joi.string().required(),
    // openapi
    OAS_ENABLED: Joi.boolean().default(true),
    OAS_PATH: Joi.string().default('/docs'),
    // logging
    LOG_LEVEL: Joi.string()
        .valid(LOG_ERROR, LOG_WARN, LOG_DEBUG, LOG_VERBOSE)
        .default(LOG_ERROR)
        .messages({ msg }),
};
