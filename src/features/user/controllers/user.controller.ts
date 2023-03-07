import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
    JwtAuthGuard,
    Role,
    Roles,
    RolesGuard,
    UserPayload,
    UserToken,
} from '../../../common';

import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @Roles()
    findOne(@UserToken() user: UserPayload, @Param('id') id: string) {
        if (user.id !== id) {
            throw new UnauthorizedException();
        }
        return this.userService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles()
    remove(@UserToken() user: UserPayload, @Param('id') id: string) {
        if (!user.roles.includes(Role.Admin) && user.id !== id) {
            throw new UnauthorizedException();
        }
        return this.userService.remove(id);
    }
}
