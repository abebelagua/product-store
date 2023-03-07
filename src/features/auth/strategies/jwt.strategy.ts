import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthConfig, CONFIG_KEY_AUTH } from '../../../config/auth';
import { UserPayload } from '../../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        const { JWT_SECRET } = config.get<AuthConfig>(CONFIG_KEY_AUTH);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: UserPayload) {
        return payload;
    }
}
