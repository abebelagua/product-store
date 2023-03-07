import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { HashService } from './hash.service';

describe('HashService', () => {
    let service: HashService;
    let configService: DeepMocked<ConfigService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService],
        })
            .useMocker(createMock)
            .compile();

        service = module.get<HashService>(HashService);
        configService = module.get<DeepMocked<ConfigService>>(ConfigService);
    });

    it('should be defined', () => {
        expect(configService).toBeDefined();
        expect(service).toBeDefined();
    });
});
