import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    ArrayNotEmpty,
    IsString,
    IsNotEmpty,
    IsDate,
    Matches,
} from 'class-validator';

import { Message, Role } from '../../../common';
import { PASSWORD_STRONG_REGEX } from '../../../utils';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail(
        {},
        {
            message: Message.USER_EMAIL_INVALID,
        },
    )
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(PASSWORD_STRONG_REGEX, {
        message: Message.PASSWORD_TOO_WEAK,
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @ApiProperty()
    @IsString({
        each: true,
    })
    @ArrayNotEmpty({ message: Message.USER_ROLES_INVALID })
    roles: Role[];
}
