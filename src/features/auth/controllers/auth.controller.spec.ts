import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { AuthService } from '../services/auth.service';

import { AuthController } from './auth.controller';

describe('AuthController', () => {
    let controller: AuthController;
    let service: DeepMocked<AuthService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<DeepMocked<AuthService>>(AuthService);
        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(controller).toBeDefined();
    });
});
