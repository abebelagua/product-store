import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.UserModel(createUserDto);
        createdUser.save();
        return createdUser.toObject();
    }

    findAll() {
        return this.UserModel.find().exec();
    }

    findById(id: string) {
        return this.UserModel.findById(id).exec();
    }

    findOne(user: Partial<User>) {
        return this.UserModel.findOne(user).exec();
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.UserModel.updateOne({ id }, updateUserDto).exec();
    }

    remove(id: string) {
        return this.UserModel.deleteOne({
            id,
        }).exec();
    }

    getUserPassword(username: string) {
        return this.UserModel.findOne({
            username,
        })
            .select('+password')
            .exec();
    }
}
