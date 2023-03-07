import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { ProductService } from '../services/product.service';

import { ProductController } from './product.controller';

describe('ProductController', () => {
    let controller: ProductController;
    let service: DeepMocked<ProductService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<DeepMocked<ProductService>>(ProductService);
        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(controller).toBeDefined();
    });
});
