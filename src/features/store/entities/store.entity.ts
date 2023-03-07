import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { TrackedEntity } from '../../../common';

import { Products, ProductsSchema } from './products.entity';

@Schema({ collection: 'store' })
export class Store extends TrackedEntity {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        type: [ProductsSchema],
        required: true,
    })
    products: Products[];
}

export type StoreDocument = HydratedDocument<Store>;
export const StoreSchema = SchemaFactory.createForClass(Store);
