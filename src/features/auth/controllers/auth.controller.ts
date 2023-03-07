import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { UserToken, UserPayload, LocalAuthGuard } from '../../../common';

import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto);
    }

    @ApiBody({
        type: LoginDto,
    })
    @ApiBearerAuth('JWT')
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@UserToken() user: UserPayload) {
        return this.authService.login(user);
    }
}
