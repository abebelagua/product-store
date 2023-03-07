import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product, ProductDocument } from '../entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    ) {}

    create(createProductDto: CreateProductDto) {
        const createdProduct = new this.ProductModel(createProductDto);
        createdProduct.save();
        return createdProduct.toObject();
    }

    findAll() {
        return this.ProductModel.find().exec();
    }

    findById(id: string) {
        return this.ProductModel.findById(id).exec();
    }

    findOne(Product: Partial<Product>) {
        return this.ProductModel.findOne({ id: Product._id }).exec();
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        return this.ProductModel.updateOne({ id }, updateProductDto).exec();
    }

    remove(id: string) {
        return this.ProductModel.deleteOne({
            id,
        }).exec();
    }
}
