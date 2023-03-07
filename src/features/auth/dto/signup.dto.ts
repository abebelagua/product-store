import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsDate,
    Matches,
} from 'class-validator';

import { Message } from '../../../common';
import { PASSWORD_STRONG_REGEX } from '../../../utils';

export class SignUpDto {
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
    @Matches(PASSWORD_STRONG_REGEX, {
        message: Message.PASSWORD_TOO_WEAK,
    })
    password: string;

    @ApiProperty()
    birthday: Date;
}
