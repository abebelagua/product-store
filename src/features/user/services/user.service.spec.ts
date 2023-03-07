import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let userModel: DeepMocked<Model<User>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(User.name),
                    useValue: createMock<Model<User>>(),
                },
                UserService,
            ],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<UserService>(UserService);
        userModel = module.get<DeepMocked<Model<User>>>('UserModel');
    });

    it('should be defined', () => {
        expect(userModel).toBeDefined();
        expect(service).toBeDefined();
    });
});
