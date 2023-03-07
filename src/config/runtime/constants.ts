import { join as joinPath } from 'path';

export const ENV_ONE = '1';
export const ENV_TRUE = 'true';
export const ENV_YES = 'yes';
export const ENV_TRUTHY = [ENV_ONE, ENV_TRUE, ENV_YES];

export const ENV_ZERO = '0';
export const ENV_FALSE = 'false';
export const ENV_NO = 'no';
export const ENV_FALSY = [ENV_ZERO, ENV_FALSE, ENV_NO, undefined, null];

export const CONFIG_ROOT =
    process.env.CONFIG_ROOT || joinPath(process.cwd(), 'config');

export const throttlerConfig = {
    ttl: 60,
    limit: 10,
};

export const ENV_DEV = 'Development';
export const ENV_PROD = 'Production';
export const ENV_STAGING = 'Staging';
export const ENV_LOCAL = 'Local';
export const APP_ENVIRONMENTS: AppEnvironment[] = [
    ENV_DEV,
    ENV_PROD,
    ENV_STAGING,
    ENV_LOCAL,
];
export type AppEnvironment =
    | typeof ENV_DEV
    | typeof ENV_PROD
    | typeof ENV_STAGING
    | typeof ENV_LOCAL;

export type NestLogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

export const LOG_ERROR = 'ERROR';
export const LOG_WARN = 'WARN';
export const LOG_DEBUG = 'DEBUG';
export const LOG_VERBOSE = 'VERBOSE';

export type LogLevel =
    | typeof LOG_ERROR
    | typeof LOG_WARN
    | typeof LOG_DEBUG
    | typeof LOG_VERBOSE;

export const LOG_LEVELS: LogLevel[] = [
    LOG_ERROR,
    LOG_WARN,
    LOG_DEBUG,
    LOG_VERBOSE,
];

export const LOG_LEVEL_MAP: Record<LogLevel, NestLogLevel[]> = {
    [LOG_ERROR]: ['log', 'error'],
    [LOG_WARN]: ['log', 'error', 'warn'],
    [LOG_DEBUG]: ['log', 'error', 'warn', 'debug'],
    [LOG_VERBOSE]: ['log', 'error', 'warn', 'debug', 'verbose'],
};

const levelFromEnv: any = process.env.LOG_LEVEL;
export const LEVEL: LogLevel =
    levelFromEnv && LOG_LEVELS.includes(levelFromEnv)
        ? levelFromEnv
        : LOG_ERROR;
export const NEST_LOG_LEVEL = LOG_LEVEL_MAP[LEVEL];
