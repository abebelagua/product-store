import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from '../product';

import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { Store, StoreSchema } from './entities/store.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
        ProductModule,
    ],
    controllers: [StoreController],
    providers: [StoreService],
    exports: [StoreService],
})
export class StoreModule {}
