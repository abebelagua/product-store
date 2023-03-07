import { Prop, Schema } from '@nestjs/mongoose';

import { EntityBase } from './base.entity';

@Schema()
export abstract class TrackedEntity extends EntityBase {
    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;

    @Prop({ required: true, default: () => new Date() })
    updatedAt: Date;

    @Prop({ required: false })
    deletedAt?: Date;

    @Prop({ required: false })
    createdBy?: string;

    @Prop({ required: false })
    updatedBy?: string;

    @Prop({ required: false })
    deletedBy?: string;
}
