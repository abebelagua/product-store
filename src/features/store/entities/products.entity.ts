import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Products {
    @Prop({
        required: true,
    })
    id: string;

    @Prop({
        required: true,
    })
    amount: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
