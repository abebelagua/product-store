/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable-next-line @typescript-eslint/ban-types */
let Logger: { verbose: Function };
try {
    Logger = require('@nestjs/common').Logger;
} catch (e) {
    Logger = {
        verbose: console.debug,
    };
}

/**
 * Attempts to `require` a module by trying each of the specified paths in order
 * until one of them succeeds. Will return an empty object if none of the paths
 * points to a valid module.
 *
 * @param paths Paths to try
 */
export function safeRequire(...paths: string[]): Record<string, any> {
    let data: Record<string, any> = {};
    for (const path of paths) {
        try {
            data = require(path);
            break;
        } catch (e) {
            Logger.verbose(`Failed to require file: ${path}`, 'safeRequire');
        }
    }

    return data;
}
