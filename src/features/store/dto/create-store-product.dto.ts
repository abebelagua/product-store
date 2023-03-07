import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class CreateStoreProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
