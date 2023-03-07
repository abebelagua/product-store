import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { TrackedEntity } from '../../../common';

@Schema({ collection: 'products' })
export class Product extends TrackedEntity {
    @Prop({
        required: true,
    })
    name: string;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
