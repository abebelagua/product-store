import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
