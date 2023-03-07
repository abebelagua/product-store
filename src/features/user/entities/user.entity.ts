import { OmitType } from '@nestjs/mapped-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Message, Role, TrackedEntity } from '../../../common';

@Schema({ collection: 'users' })
export class User extends TrackedEntity {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    lastName: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    email: string;

    @Prop({ select: false })
    password: string;

    @Prop()
    birthday: Date;

    @Prop({
        required: true,
        type: [String],
        validate: {
            validator: (roles: Role[]) => {
                return roles.length > 0;
            },
            message: Message.USER_ROLES_INVALID,
        },
        default: [Role.Buyer],
    })
    roles: Role[];

    // Todo: wrong default value, implement email strategy and put default false
    @Prop({ default: true })
    enableEmail: boolean;
}

export class UserOutput extends OmitType(User, ['password'] as const) {}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
