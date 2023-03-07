import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { UserService } from '../services/user.service';

import { UserController } from './user.controller';

describe('UserController', () => {
    let controller: UserController;
    let service: DeepMocked<UserService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<DeepMocked<UserService>>(UserService);
        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(controller).toBeDefined();
    });
});
