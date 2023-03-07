import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { StoreService } from '../services/store.service';

import { StoreController } from './store.controller';

describe('StoreController', () => {
    let controller: StoreController;
    let service: DeepMocked<StoreService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<DeepMocked<StoreService>>(StoreService);
        controller = module.get<StoreController>(StoreController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(controller).toBeDefined();
    });
});
