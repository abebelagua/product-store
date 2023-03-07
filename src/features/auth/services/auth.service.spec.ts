import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { UserService } from '../../user';

import { AuthService } from './auth.service';
import { HashService } from './hash.service';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: DeepMocked<JwtService>;
    let usersService: DeepMocked<UserService>;
    let hashService: DeepMocked<HashService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<DeepMocked<JwtService>>(JwtService);
        usersService = module.get<DeepMocked<UserService>>(UserService);
        hashService = module.get<DeepMocked<HashService>>(HashService);
    });

    it('should be defined', () => {
        expect(jwtService).toBeDefined();
        expect(usersService).toBeDefined();
        expect(hashService).toBeDefined();
        expect(service).toBeDefined();
    });
});
