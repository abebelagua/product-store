import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
