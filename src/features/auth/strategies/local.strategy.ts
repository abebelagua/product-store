import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserPayload } from '../../../common';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            birthday: user.birthday,
            roles: user.roles,
        } as UserPayload;
    }
}
