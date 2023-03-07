import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductService } from '../../product/services/product.service';

import { CreateStoreProductDto } from '../dto/create-store-product.dto';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreProductDto } from '../dto/update-store-product.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { Store, StoreDocument } from '../entities/store.entity';
import { StoreProductActions } from '../enums/store-product-actions.enum';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
        private readonly productService: ProductService,
    ) {}

    create(createStoreDto: CreateStoreDto) {
        const createdStore = new this.storeModel(createStoreDto);
        createdStore.save();
        return createdStore.toObject();
    }

    findAll() {
        return this.storeModel.find().exec();
    }

    findById(id: string) {
        return this.storeModel.findById(id).exec();
    }

    findOne(store: Partial<UpdateStoreDto>) {
        return this.storeModel.findOne({ ...store, id: store.id }).exec();
    }

    async findOneByProduct(store: Partial<UpdateStoreDto>, productId: string) {
        const storeFound = await this.storeModel
            .findOne({
                ...store,
                id: store.id,
                'products.id': productId,
            })
            .exec();

        if (!storeFound) {
            throw new BadRequestException(
                'Store with the provided product id was not found',
            );
        }
        return storeFound;
    }

    async addProductToStore(
        id: string,
        createProductDto: CreateStoreProductDto,
    ) {
        const store = await this.storeModel.findById(id);

        const productIndex = store.products.findIndex(
            e => e.id === createProductDto.id,
        );

        if (productIndex === -1) {
            const product = this.productService.findById(createProductDto.id);

            if (product) {
                return this.storeModel
                    .findOneAndUpdate(
                        {
                            id,
                        },
                        {
                            $push: {
                                products: createProductDto,
                            },
                        },
                        {
                            new: true,
                        },
                    )
                    .exec();
            }
            throw new BadRequestException('Product not exist');
        }
        throw new BadRequestException('Product exist in the store');
    }

    async updateProductInStore(
        id: string,
        updateProductDto: UpdateStoreProductDto,
        productAction: StoreProductActions,
    ) {
        const store = await this.storeModel.findById(id);

        const productIndex = store.products.findIndex(
            e => e.id === updateProductDto.id,
        );

        if (productIndex !== -1) {
            const a = await this.storeModel.findOneAndUpdate(
                {
                    id,
                    'products.id': updateProductDto.id,
                },
                {
                    $set: {
                        'products.$.amount':
                            productAction === StoreProductActions.Add
                                ? store.products[productIndex].amount +
                                  updateProductDto.amount
                                : store.products[productIndex].amount <
                                  updateProductDto.amount
                                ? 0
                                : store.products[productIndex].amount <
                                  updateProductDto.amount,
                    },
                },
                {
                    new: true,
                },
            );
            console.log(a);
            return a;
        }
        throw new BadRequestException('Product not exist in the store');
    }

    async deleteProductInStore(id: string, productId: string) {
        const store = await this.storeModel.findById(id);

        const productIndex = store.products.findIndex(e => e.id === productId);

        if (productIndex) {
            return this.storeModel.findOneAndUpdate(
                {
                    id,
                },
                {
                    $pullAll: {
                        products: {
                            id: productId,
                        },
                    },
                },
                {
                    new: true,
                },
            );
        }
        throw new BadRequestException('Product not exist in the store');
    }

    update(id: string, updateStoreDto: UpdateStoreDto) {
        return this.storeModel
            .findOneAndUpdate({ id }, updateStoreDto, {
                new: true,
            })
            .exec();
    }

    remove(id: string) {
        return this.storeModel
            .deleteOne({
                id,
            })
            .exec();
    }
}
