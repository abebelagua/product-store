import { createHmac, randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { compare, genSalt, hash } from 'bcrypt';

import { AuthConfig, CONFIG_KEY_AUTH } from '../../../config/auth';

@Injectable()
export class HashService {
    constructor(private configService: ConfigService) {}

    async generateHash(text: string): Promise<string> {
        const salt = await genSalt();
        return hash(text, salt);
    }

    async compareHash(text: string, hash: string): Promise<boolean> {
        return compare(text, hash);
    }

    md5(key: string): string {
        const { JWT_SECRET } =
            this.configService.get<AuthConfig>(CONFIG_KEY_AUTH);
        return createHmac('md5', JWT_SECRET).update(key).digest('hex');
    }

    getRandomKey(length: number): string {
        return randomBytes(length).toString('hex');
    }
}
