import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, Role, Roles, RolesGuard } from '../../../common';

import { StoreService } from '../services/store.service';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { CreateStoreProductDto } from '../dto/create-store-product.dto';
import { UpdateStoreProductDto } from '../dto/update-store-product.dto';
import { StoreProductActions } from '../enums/store-product-actions.enum';

@ApiTags('Store')
@ApiBearerAuth('JWT')
@Controller('store')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    findAll() {
        return this.storeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeService.findById(id);
    }

    @Get('products/:id/:productId')
    @Roles(Role.Admin, Role.Buyer)
    findOneByProduct(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return this.storeService.findOneByProduct(
            {
                id,
            },
            productId,
        );
    }

    @Post('products/:id')
    createProductToStore(
        @Param('id') id: string,
        @Body() createProductDto: CreateStoreProductDto,
    ) {
        return this.storeService.addProductToStore(id, createProductDto);
    }

    @Patch('products/addAmount/:id')
    @Roles(Role.Admin)
    addAmountProductToStore(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateStoreProductDto,
    ) {
        return this.storeService.updateProductInStore(
            id,
            updateProductDto,
            StoreProductActions.Add,
        );
    }

    @Patch('products/removeAmount/:id')
    @Roles(Role.Admin, Role.Buyer)
    removeAmountProductInStore(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateStoreProductDto,
    ) {
        return this.storeService.updateProductInStore(
            id,
            updateProductDto,
            StoreProductActions.Remove,
        );
    }

    @Delete('products/:id/:productId')
    deleteProductInStore(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return this.storeService.deleteProductInStore(id, productId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storeService.update(id, updateStoreDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeService.remove(id);
    }
}
