import { readFileSync } from 'fs';
import { join as joinPath } from 'path';

import { Logger } from '@nestjs/common';
import { ConfigFactory, registerAs } from '@nestjs/config';
import { parse as parseEnv, DotenvParseOutput } from 'dotenv';
import { merge, pick } from 'lodash';
import { pascalCase, sentenceCase } from 'change-case';

import { dropUndefined } from '../utils';

import { CONFIG_ROOT } from './runtime/constants';

export function createConfigLoader<TConfig>(
    key: string,
    fields: Array<keyof TConfig>,
    additionalConfig: (env: any) => Partial<TConfig> = () => ({}),
): ConfigFactory {
    type ConfigEnv = TConfig & DotenvParseOutput;

    const logger = new Logger(`${pascalCase(key)}ConfigLoader`);

    function fromFile() {
        const configFilePath = joinPath(CONFIG_ROOT, `${key}.env`);

        try {
            const configFileContents = readFileSync(configFilePath, 'utf8');
            const env = parseEnv<ConfigEnv>(configFileContents);
            const config = fromEnv(env || {});
            return config;
        } catch (err) {
            logger.warn(
                `Failed to load ${sentenceCase(
                    key,
                )} feature config from file '${configFilePath}': ${
                    err.message
                }`,
            );
            return {};
        }
    }

    function fromEnv(env: any = process.env) {
        const config = pick(env, fields);
        return dropUndefined(config);
    }

    return registerAs(key, () => {
        const configFromFile = fromFile();
        const configFromEnv = fromEnv();
        const configFromAdditional = additionalConfig(configFromEnv);

        const config: TConfig = merge(
            configFromFile,
            configFromEnv,
            configFromAdditional,
        );
        return config;
    });
}
