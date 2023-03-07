import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductService } from '../../product';
import { Store } from '../entities/store.entity';

import { StoreService } from './store.service';

describe('StoreService', () => {
    let service: StoreService;
    let productService: DeepMocked<ProductService>;
    let storeModel: DeepMocked<Model<Store>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(Store.name),
                    useValue: createMock<Model<Store>>(),
                },
                StoreService,
            ],
        })
            .useMocker(createMock)
            .compile();

        productService = module.get<DeepMocked<ProductService>>(ProductService);
        service = module.get<StoreService>(StoreService);
        storeModel = module.get<DeepMocked<Model<Store>>>('StoreModel');
    });

    it('should be defined', () => {
        expect(storeModel).toBeDefined();
        expect(productService).toBeDefined();
        expect(service).toBeDefined();
    });
});
