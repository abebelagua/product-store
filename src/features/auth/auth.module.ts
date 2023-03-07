import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CONFIG_KEY_AUTH, AuthConfig } from '../../config/auth';
import { UserModule } from '../user';

import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const { JWT_SECRET, JWT_EXPIRE_IN } =
                    config.get<AuthConfig>(CONFIG_KEY_AUTH);
                return {
                    secret: JWT_SECRET,
                    signOptions: {
                        expiresIn: JWT_EXPIRE_IN,
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, HashService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
