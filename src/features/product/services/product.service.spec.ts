import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '../entities/product.entity';

import { ProductService } from './product.service';

describe('ProductService', () => {
    let service: ProductService;
    let productModel: DeepMocked<Model<Product>>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(Product.name),
                    useValue: createMock<Model<Product>>(),
                },
                ProductService,
            ],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<ProductService>(ProductService);
        productModel = module.get<DeepMocked<Model<Product>>>('ProductModel');
    });

    it('should be defined', () => {
        expect(productModel).toBeDefined();
        expect(service).toBeDefined();
    });
});
